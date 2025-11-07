import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/auth.js";
import taskRouter from "./routers/task.js";
import profileRouter from "./routers/profile.js";

import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const port = 8000;
app.use(
  cors({
    origin: "tick-it-task-app.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", authRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/profile", profileRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("succesfully connected");
  } catch (e) {
    console.log("failed to connect", e);
  }
};

app.listen(port, () => {
  connectDB();
  console.log(`server is listening to:${port}`);
});
