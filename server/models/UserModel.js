import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt

// ---------------------
// Define the User Schema
// ---------------------
const UserSchema = new mongoose.Schema(
  {
    // User's full name (required)
    name: { type: String, required: true },

    // User's email (required, unique, stored in lowercase)
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email"] // basic email validation
    },

    // User's password (required)
    password: { type: String, required: true },
  },
  { 
    // Automatically add `createdAt` and `updatedAt` timestamps
    timestamps: true 
  }
);

// ------------------------------------
// Pre-save hook to hash password
// ------------------------------------
// Automatically hashes the password before saving to the database.
// Ensures plain-text passwords are never stored.
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password changed
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// ------------------------------------
// Compare password method
// ------------------------------------
// Compares a plain text password with the hashed password stored in the DB.
// Returns true if passwords match, false otherwise.
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// ------------------------------------
// Create or reuse User model
// ------------------------------------
// Prevents "OverwriteModelError" during hot-reloading (e.g., with Nodemon or Next.js)
const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Export the User model
export default User;
