require('dotenv').config()
const express = require('express')
const mineRoutes = require('./routes/mines-routes')

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


 