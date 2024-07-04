const express = require('express');
const app = express(); // Initialize app
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const server = http.createServer(app); 
const { Server } = require("socket.io");
const io = new Server(server); 
const liveUsers = {};

const port = 3000; 

// Connect to MongoDB (replace with your actual credentials)
mongoose.connect('mongodb://localhost:27017/yourdatabase', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
const userRoutes = require('./routes'); 
app.use('/api', userRoutes); 

// Socket.IO Connection Handling
io.on('connection', (socket) => {
    console.log('A user connected');

    // Join Room Event
    socket.on('joinRoom', (userData) => {
        socket.join('live-users');
        liveUsers[socket.id] = {
            emailId: userData.emailId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            socketId: socket.id
        };
        io.to('live-users').emit('updateLiveUsers', Object.values(liveUsers));
    });

    // Reconnect User Event
    socket.on('reconnectUser', (userData) => {
        socket.join('live-users');
        liveUsers[socket.id] = {
            emailId: userData.emailId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            socketId: socket.id
        };
        io.to('live-users').emit('updateLiveUsers', Object.values(liveUsers));
    });

    // Disconnect Event
    socket.on('disconnect', () => {
        console.log('User disconnected');
        delete liveUsers[socket.id];
        io.to('live-users').emit('updateLiveUsers', Object.values(liveUsers));
    });
   
    socket.on('disconnectUser', () => {
       console.log('User intentionally disconnected');
       delete liveUsers[socket.id];
       io.to('live-users').emit('updateLiveUsers', Object.values(liveUsers));
   });
});

// Start the server
server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
