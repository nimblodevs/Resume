import { isDBConnected } from "../config/db.js";

const dbReady = (req, res, next) => {
  if (isDBConnected) {
    // ✅ DB is connected, allow request to continue
    return next();
  }

  // ❌ DB not connected yet
  res.status(503).json({
    status: "error",
    message: "⚠️ Service unavailable - database not connected",
    hint: "⏳ Please try again in a few seconds...",
  });
};

export default dbReady;
