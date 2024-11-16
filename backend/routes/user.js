const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// Controller
const { loginUser, signupUser, getUsers, forgotPassword, deleteUser, patchUser, addUserScore } = require('../controllers/userController')

const router = express.Router()

// Login Route
router.post('/login', loginUser)
// Registration Route
router.post('/signup', signupUser)

// Forgot Password Route
router.post('/forgotpassword', forgotPassword)

// router.use(requireAuth)
// Add Score
router.patch('/addscore/:id', addUserScore)
// Admin
router.get('/getusers', getUsers)
router.delete('/removeuser/:id', deleteUser)
router.patch('/updateuser/:id', patchUser)

module.exports = router