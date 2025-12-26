import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB, disconnectDB, isDBConnected } from "./config/db.js";
import dbReady from "./middlewares/dbReady.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT;

/* ---------------- MIDDLEWARE ---------------- */
// Enable CORS for your frontend URL only (replace with your actual frontend URL)
const allowedOrigins = [
  'http://localhost:5173', // Frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        // Allow requests from specified origins or if there is no origin (e.g., Postman or server-side requests)
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'], // Allow methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow custom headers like Content-Type, Authorization
  })
);

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

/* ---------------- ROUTES ---------------- */
app.get("/", (req, res) => {
  res.send("🚀 Server is live and DB is connected!");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

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
