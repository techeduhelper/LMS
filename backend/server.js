import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import colors from 'colors'

dotenv.config();

// MIDDLEWARES
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

import adminRoutes from './routes/adminRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

// Passport Middleware
app.use(passport.initialize());

// Passport Config.
import passportConfig from './config/passport.js';
passportConfig(passport);

// For showing status of req
app.use(morgan('dev'));

// socket connection
io.on('connection', (socket) => {
    socket.on('join room', ({ room1, room2 }) => {
        socket.join(room1);
        socket.join(room2);
    });
    socket.on("private message", (message) => {
        io.to(message.room).emit('new Message', {
            message: message.message,
            sender: message.sender
        });
    });
    socket.on('disconnect', () => {
        console.log('Socket disconnected');
    });
});

let _response = {};

// ROUTES
app.use('/api/admin', adminRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/student', studentRoutes);

// Catching 404 Error
app.use((req, res, next) => {
    const error = new Error('Hello from LMS');
    error.status = 404;
    next(error);
});

// Error handler function
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

const PORT = process.env.PORT || 5000;

try {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    _response.database = "Healthy";
    console.log(`Server Started on PORT ${PORT}`.bgMagenta.bold);
    console.log("Database Connected successfully".bgGreen.yellow);

} catch (err) {
    _response.database = "Unhealthy";
    console.error("Error in connecting to DataBase:", err.message);
}

app.use('/', (req, res) => {
    res.status(200).json(`Hello from LMS`);
});

server.listen(PORT, () => {
    _response.server = "Healthy";
});
