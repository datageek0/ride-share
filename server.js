const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Middleware to parse JSON
app.use(express.json());

// In-memory data store (replace with MongoDB later)
let rides = [];

// GET all rides
app.get('/api/rides', (req, res) => {
    res.json(rides);
});

// POST a new ride
app.post('/api/rides', (req, res) => {
    const newRide = req.body;
    rides.push(newRide);
    res.status(201).json(newRide);
});

// DELETE a ride
app.delete('/api/rides/:id', (req, res) => {
    const rideId = req.params.id;
    rides = rides.filter(ride => ride.id !== rideId);
    res.status(204).send();
});

// Serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
