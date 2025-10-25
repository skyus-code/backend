import User from "../models/User.js";

// Register user baru
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "✅ User created!", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Ambil semua user
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
