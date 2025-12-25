import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB, disconnectDB, isDBConnected } from "./config/db.js";
import dbReady from "./middlewares/dbReady.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());

/* ---------------- HEALTH CHECK ---------------- */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    db: isDBConnected ? "💾 connected" : "❌ disconnected",
    uptime: process.uptime(),
  });
});

/* ---------------- DB-READY BLOCK ---------------- */
app.use(dbReady);

/* ---------------- ROOT ROUTE ---------------- */
app.get("/", (req, res) => {
  res.send("🚀 Server is live and DB is connected!");
});

/* ---------------- USER ROUTES ---------------- */
app.use("/api/users", userRouter);

/* ---------------- DB RETRY LOGIC ---------------- */
let retryDelay = 5000;
let isConnecting = false;

const connectWithRetry = async () => {
  if (isConnecting) return;

  isConnecting = true;
  try {
    console.log("🔄 Attempting DB connection...");
    await connectDB();
    console.log("💾 Database connected successfully");
    retryDelay = 5000; // Reset delay after success
  } catch (err) {
    console.error(`❌ DB connection failed. Retrying in ${retryDelay / 1000}s...`);
    setTimeout(() => {
      retryDelay = Math.min(retryDelay * 2, 30000); // exponential backoff
      isConnecting = false;
      connectWithRetry();
    }, retryDelay);
  }
};

/* ---------------- START SERVER ---------------- */
const server = app.listen(PORT, () => {
  console.log(`🖥️  Server running on http://localhost:${PORT}`);
  connectWithRetry();
});

/* ---------------- GRACEFUL SHUTDOWN ---------------- */
const shutdown = async (signal) => {
  console.log(`\n⚡ Received ${signal}. Shutting down gracefully...`);

  server.close(async () => {
    try {
      await disconnectDB();
      console.log("✅ DB disconnected. Shutdown complete!");
      process.exit(0);
    } catch (err) {
      console.error("❌ Error during shutdown:", err);
      process.exit(1);
    }
  });

  // Force shutdown if stuck
  setTimeout(() => {
    console.error("❌ Force shutdown");
    process.exit(1);
  }, 10000);
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
