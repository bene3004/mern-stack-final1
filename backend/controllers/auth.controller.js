import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the fields" });
  }

  // generate hashed password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
      username,
      email,
      password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error("Error in Create user:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "email and password required!" });
  }

try {
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, message: "invalid login info" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ success: false, message: "invalid login info" });
  }

  // generate jwt token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ success: true, token, user: { id: user._id, username: user.username, email: user.email } });
} catch (error) {
    console.error("login error:", error.message);
    res.status(500).json({ success: false, message: "server error" });
}
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "invalid user id" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.log("error in updating users:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "invalid user id " });
  }

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    console.log("error in deleting user:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("error in fetching users:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};