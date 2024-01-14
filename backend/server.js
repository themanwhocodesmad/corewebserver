require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Gameplay related route imports
const mapRoutes = require('./routes/map-routes');
const processRoutes = require('./routes/process-routes/process-routes');
const planetRoutes = require('./routes/planets-routes');

// Scheduler imports
require('./utils/scheduler-fuctions/upgrade-schedular');

const startProductionRateAgenda = require('./utils/scheduler-fuctions/mine-production-to-storage-updater');
const startConstructionQueueScheduler  = require('./utils/scheduler-fuctions/construction-queue-schedular');
const startUpgradeQueueSchedular = require('./schedulers/building-queue-schedular')

// Create express app
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Main Routes
app.use('/api/process', processRoutes);
app.use('/api/planet', planetRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {  // Make this function async
        // Listen for requests once we have connected to DB
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & listening on port', process.env.PORT);
        });

        // Start the production rate agenda
        try {
            await startProductionRateAgenda();
            console.log('Production rate agenda started.');
        } catch (error) {
            console.error('Error starting production rate agenda:', error);
        }

        // Start the production rate agenda
        try {
            await startUpgradeQueueSchedular();
            console.log('Upgrade Queue agenda started.');
        } catch (error) {
            console.error('Error starting Upgrade Queue agenda:', error);
        }

        // Initialize the construction queue scheduler
        try {
            await startConstructionQueueScheduler();
            console.log('Troop construction queue agenda started.');
        } catch (err) {
            console.error('Error in construction queue scheduler:', err);
        }
    })
    .catch((error) => {
        console.log(error);
    });
