require('dotenv').config()
const express = require('express')

// Planet related route imports
const mineRoutes = require('./routes/mines-routes')
const storeRoutes = require('./routes/stores-routes')
const planetRoutes = require('./routes/planets-routes')

// Gameplay related route imports
const mapRoutes = require('./routes/map-routes')

// Schedular imports
require('./utils/scheduler-fuctions/map-schedulars'); // Initialization to be able to use scheduler/periodic functions


const { default: mongoose } = require('mongoose')


// Create express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/mines', mineRoutes)
app.use('/api/stores', storeRoutes)
app.use('/api/map', mapRoutes)
app.use('/api/planet', planetRoutes)


// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
    // Listen for requests once we have connect to DB
        app.listen(process.env.PORT, () => {
            console .log('connected to db & listening on port', process.env.PORT)
})

})
.catch((error)=> {
    console.log(error)
})


 