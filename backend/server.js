import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.router.js";
import messageRouter from "./routes/message.router.js";
import userRouter from "./routes/user.router.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";



dotenv.config();
const PORT = process.env.PORT || 5000;
// const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);
// app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', (req, res) => {res.send('hello world')})

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`server listening on port ${PORT}`);
});
