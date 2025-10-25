import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";

dotenv.config(); // Load .env

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/users", userRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
