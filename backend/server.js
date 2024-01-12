require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Gameplay related route imports
const mapRoutes = require('./routes/map-routes');
const processRoutes = require('./routes/process-routes/process-routes');

// Schedular imports
require('./utils/scheduler-fuctions/map-schedulars');
require('./utils/scheduler-fuctions/upgrade-schedular');
const startAgenda = require('./utils/scheduler-fuctions/mine-production-to-storage-updater');

// Create express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Main Routes
app.use('/api/process', processRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests once we have connected to DB
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & listening on port', process.env.PORT);
        });

        // Start agenda after successful DB connection
        startAgenda().catch(err => {
            console.error('Error starting Agenda:', err);
        });
    })
    .catch((error) => {
        console.log(error);
    });
