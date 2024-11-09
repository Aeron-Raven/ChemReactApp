require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const webRoutes = require('./routes/testModules');
const userRoutes = require('./routes/user');

// app
const app = express()

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
// Routes
app.use('/api/testModules', webRoutes)
app.use('/api/user', userRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // port request listen
        app.listen(process.env.PORT, () => {
            console.log('connected to db &', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err);
    })
// Connection
