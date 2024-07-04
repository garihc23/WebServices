const express = require('express');
const app = express(); // Initialize app before using it
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
mongoose.connect('mongodb://localhost:27017/webservices', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Import the routes
const userRoutes = require('./routes'); // Assuming routes.js is in the same directory

// Use the routes
app.use('/api', userRoutes); // Mount the routes under '/api'

// Socket.IO Connection Handling
io.on('connection', (socket) => {
    console.log('A user connected');

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

    socket.on('disconnect', () => {
        console.log('User disconnected');
        delete liveUsers[socket.id];
        io.to('live-users').emit('updateLiveUsers', Object.values(liveUsers));
    });
});


server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
