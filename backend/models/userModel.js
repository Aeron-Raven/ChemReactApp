require('dotenv').config();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userfield: {
        type: String,
        required: true
    },
    isverified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date
})
// Static Signup method
userSchema.statics.signup = async function (name, email, userfield, password) {

    // validation
    if (!name || !email || !password) {
        throw Error('All Fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password, { minNumbers: 1, minSymbols: 0 })) {
        throw Error('Password is not strong enough')
    }

    // Email Exists
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email Already Exists')
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    const user = await this.create({ name, email, userfield, password: hash, verificationToken, verificationTokenExpiresAt})

    return user
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All Fields must be filled')
    }
    // Email Exists
    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect Email')
    }
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect Password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)