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
    modules: [{
        moduleID: String,
        isFinished: Boolean,
        score: Number
    }],
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
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

    const user = await this.create({ name, email, userfield, password: hash, })

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
userSchema.statics.resetpass = async function (token, password) {

    // Email Exists
    const user = await this.findOne({
        resetPasswordToken: token,
        resetPasswordExpiresAt: { $gt: Date.now() }
    })
    if (!user) {
        throw Error('Invalid or expired reset token');
    }

    if (!validator.isStrongPassword(password, { minNumbers: 1, minSymbols: 0 })) {
        throw Error('Password is not strong enough');
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    user.password = hash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    return user
}
userSchema.statics.updateuser = async function (id, name, email, userfield) {

    // validation
    if (!name || !email) {
        throw Error('All Fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    // Email Exists
    const user = await this.findOneAndUpdate({ _id: id }, { name, email, userfield }, { new: true })

    if (!user) {
        throw Error('User not found')
    }

    return user
}
userSchema.statics.addscore = async function (id, moduleData) {
    try {
        // Find the user by ID
        const user = await this.findOne({ _id: id });
        if (!user) {
            throw Error('User not found');
        }

        // Check if the module already exists
        const existingModule = user.modules.find(
            (module) => module.moduleID === moduleData.moduleID
        );

        if (existingModule) {
            // Update existing module data
            existingModuzle.isFinished = moduleData.isFinished;
            existingModule.score = moduleData.score;
            user.markModified("modules");
        } else {
            // Add new module data
            user.modules.push(moduleData);
        }

        // Save the updated user document
        await user.save();
        return user;
    } catch (error) {
        throw Error('An Error Occurred. ' + error.message);
    }
};


module.exports = mongoose.model('User', userSchema)