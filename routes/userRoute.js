import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken"

const router = express.Router();

// Helper buat generate JWT
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"});
};

// ✅ REGISTER (CREATE)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
      message: "✅ User registered successfully",
      newUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ALL USERS
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET USER BY ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE USER BY ID
router.put("/:id", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "✅ User updated successfully",
      updatedUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE USER BY ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "🗑️ User deleted successfully",
      deletedUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
