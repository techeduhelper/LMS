import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

// MIDDLEWARES
const app = express();
const expressServer = http.createServer(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

import adminRoutes from "./routes/adminRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

// Passport Middleware
app.use(passport.initialize());

// Passport Config.
import passportConfig from "./config/passport.js";
passportConfig(passport);

// For showing the status of req
app.use(morgan("dev"));

let response = {};

// ROUTES
app.use("/api/admin", adminRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/student", studentRoutes);
app.use("/api", applicationRoutes);

app.use("/", (req, res) => {
  res.status(200).json(`Hello from LMS`);
});

// Catching 404 Error
app.use((req, res, next) => {
  const error = new Error("Hello from LMS");
  error.status = 404;
  next(error);
});

// Error handler function
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const EXPRESS_PORT = process.env.PORT || 5000;

// Connect to MongoDB
try {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  response.database = "Healthy";
  console.log("Database Connected successfully".bgGreen.yellow);
} catch (err) {
  response.database = "Unhealthy";
  console.error("Error in connecting to DataBase:", err.message);
}

// Start Express server on its port
expressServer.listen(EXPRESS_PORT, () => {
  response.server = "Express server is Healthy";
  console.log(`Express Server Started on PORT ${EXPRESS_PORT}`.bgMagenta.bold);
});

// Create a separate HTTP server for Socket.IO
const socketIOServer = http.createServer();
const io = new Server(socketIOServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

// socket connection
io.on("connection", (socket) => {
  socket.on("join room", ({ room1, room2 }) => {
    socket.join(room1);
    socket.join(room2);
  });

  socket.on("private message", (message) => {
    try {
      io.to(message.room).emit("new Message", {
        message: message.message,
        sender: message.sender,
      });
    } catch (error) {
      console.error("Error sending private message:", error);
    }
  });
  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
});
