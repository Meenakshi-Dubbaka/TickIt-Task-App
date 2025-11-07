import express from "express";
import { verifyUser } from "../middleware/authentication.js";
import User from "../models/user.js";

const router = express.Router();

router.get("/", verifyUser, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

router.put("/", verifyUser, async (req, res) => {
  const { name, email } = req.body;
  const updated = await User.findByIdAndUpdate(
    req.user.id,
    { name, email },
    { new: true }
  ).select("-password");
  res.json({ message: "Profile updated succesfully !" }, updated);
});

export default router;
