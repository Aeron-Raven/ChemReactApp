const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// Controller
const { loginUser, signupUser, getUsers, forgotPassword, deleteUser, patchUser, addUserScore } = require('../controllers/userController')

const router = express.Router()

// Login Route
router.post('/login', loginUser)

// Forgot Password Route
router.post('/forgotpassword', forgotPassword)

router.use(requireAuth)
// Registration Route
router.post('/signup', signupUser)
// Add Score
router.patch('/addscore/:token', addUserScore)
// Admin
router.get('/getusers', getUsers)
router.delete('/removeuser/:id', deleteUser)
router.patch('/updateuser/:id', patchUser)

module.exports = router