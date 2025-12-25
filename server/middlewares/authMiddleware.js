import jwt from "jsonwebtoken";

// ---------------------
// Protect Middleware
// Checks for JWT token and sets req.userId
// ---------------------
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // 1️⃣ Check if Authorization header exists
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "⚠️ Unauthorized: No token provided",
      });
    }

    // 2️⃣ Remove 'Bearer ' prefix if present
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Attach userId to request object
    req.userId = decoded.userId;

    // 5️⃣ Proceed to next middleware or route
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(401).json({
      status: "error",
      message: "❌ Unauthorized: Invalid or expired token",
      error: err.message,
    });
  }
};

export default protect;
