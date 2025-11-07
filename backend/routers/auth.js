import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      message: "user register succesfully!",
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });
    const payload = {
      id: user._id,
      username: user.username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "none",
      })
      .json({
        message: "login successful!",
        user: { id: user._id, username: user.username },
        token,
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Loggout Succesfully !" });
});

export default router;
