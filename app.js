import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env"
});

//using middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);

//cors - cross origin resource sharing
app.use(
  cors({
  origin :[process.env.FRONTEND_URL],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials : true // for sending all the headers like cookies etc 
}));

app.get("/", (req, res) => {
  res.send("nice");
});

// using errorMiddleWare
app.use(errorMiddleWare);

