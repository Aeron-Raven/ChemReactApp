const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { sendPasswordResetEmail, sendResetSuccessEmail } = require('../utils/emailHandler');
const crypto = require('crypto');
const mongoose = require('mongoose');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '2d' })
}
const createAdminToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '6h' })
}
const signupUser = async (req, res) => {
    const { name, email, userfield, password } = req.body

    try {
        const user = await User.signup(name, email, userfield, password)

        // Auth token
        const token = createToken(user._id)

        res.status(200).json({ name, email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const loginUser = async (req, res) => {
    const { email, password } = req.body

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
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ error: 'This email is not associated with any account' })
        }
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = Date.now() + 60 * 60 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiry;

        await user.save();

        await sendPasswordResetEmail(user.email, `${process.env.BASE_URL}:${process.env.PORT}/requests/reset-password/${resetToken}`);

        res.status(200).json({ message: 'Password Reset Successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.resetpass(token, password)

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired reset token' })
        }

        await sendResetSuccessEmail(user.email);

        res.status(200).json({ message: 'Password Reset Successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
// Admin
const adminLogin = async (req, res) => {
    const { name, password } = req.body

    try {
        if ((name !== process.env.ADMIN) || (password !== process.env.ADMIN_PASS)) {
            return res.status(400).json({ error: 'Invalid name / Password' })
        }

        const userfield = 'admin'

        // Auth token
        const token = createAdminToken(process.env.ADMIN_TOKEN);

        res.status(200).json({ name, userfield, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
// Get users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 })
    res.status(200).json(users)
}
// Delete Users
const deleteUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User doesn\'t exist' })
    }

    const user = await User.findOneAndDelete({ _id: id })

    if (!user) {
        return res.status(400).json({ error: 'User doesn\'t exist' })
    }

    res.status(200).json(user)
}
// UPDATE
const patchUser = async (req, res) => {
    const { id } = req.params
    const { name, email, userfield } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User doesn\'t exist' })
    }

    const user = await User.updateuser(id, name, email, userfield)

    if (!user) {
        return res.status(400).json({ error: 'User doesn\'t exist' })
    }

    res.status(200).json(user)
}
const addUserScore = async (req, res) => {
    const { id } = req.params
    const { modules } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User doesn\'t exist' })
    }

    const user = await User.addscore(id, modules)

    if (!user) {
        return res.status(400).json({ error: 'User doesn\'t exist' })
    }

    res.status(200).json(user)
}
module.exports = {
    loginUser,
    signupUser,
    getUsers,
    adminLogin,
    forgotPassword,
    resetPassword,
    deleteUser,
    patchUser,
    addUserScore
}