require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const webRoutes = require('./routes/testModules');
const userRoutes = require('./routes/user');
const rateLimit = require('express-rate-limit')

const { adminLogin, resetPassword } = require('./controllers/userController')
// app
const app = express();
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'

})
const adminLimiter = rateLimit({
    max: 5,
    windowMs: 60 * 60 * 250,
    message: 'Too much admin login attempts, please try again in 15 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
    handler: function (req, res) {
        return res.status(429).json({
            error: 'Too much admin login attempts, please try again in 15 minutes.'
        })
    }
})

// Middleware
app.use(limiter);
app.use(express.json());

app.set('trust proxy', 1)
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api', limiter)
app.use('/api/user', userRoutes)
app.use('/requests/admin/login', adminLimiter, adminLogin)
app.use('/api/testModules', webRoutes)

app.use('/requests/reset-password/:token', resetPassword)

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