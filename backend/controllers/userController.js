const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '2d' })
}
const signupUser = async (req, res) => {
    const { name, email, userfield, password } = req.body

    try {
        const user = await User.signup(name, email, userfield, password)

        // Auth token
        const token = createToken(user._id)
        
        res.status(200).json({ name, email, token })
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
}
const loginUser = async (req, res) => {
    const {email, password } = req.body

    try {
        const user = await User.login(email, password)

        const name = user.name
        const userfield = user.userfield

        // Auth token
        const token = createToken(user._id)

        res.status(200).json({ name, email, userfield, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
module.exports = { loginUser, signupUser }