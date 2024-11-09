const express = require('express')

// Controller
const {loginUser, signupUser} = require('../controllers/userController')

const router = express.Router()

// Login Route
router.post('/login', loginUser)
// Registration Route
router.post('/signup', signupUser)

module.exports = router