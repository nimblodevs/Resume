import mongoose from "mongoose";

let isDBConnected = false;

const connectDB = async () => {
  let mongodbURI = process.env.MONGODB_URI;
  const projectName = "resume-builder";

  if (!mongodbURI) {
    throw new Error("❌ MONGODB_URI environment variable not set");
  }

  if (mongodbURI.endsWith("/")) {
    mongodbURI = mongodbURI.slice(0, -1);
  }

  if (isDBConnected) return;

  await mongoose.connect(`${mongodbURI}/${projectName}`);
  isDBConnected = true;

  //console.log("💾 Database connected successfully");

  mongoose.connection.on("disconnected", () => {
    isDBConnected = false;
    console.log("⚠️ Database disconnected");
  });
};

const disconnectDB = async () => {
  if (isDBConnected) {
    await mongoose.connection.close();
    console.log("🛑 Database connection closed");
  }
};

export { connectDB, disconnectDB, isDBConnected };
