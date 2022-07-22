require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

// middleware 
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// route
app.use('/api/workouts', workoutRoutes)

// connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests once connected to DB
        app.listen(process.env.PORT, () => {
            console.log('connected to DB and listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })

