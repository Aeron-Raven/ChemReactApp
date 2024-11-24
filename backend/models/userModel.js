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
    createdby: {
        type: String,
        required: true
    },
    modules: [
        {
            moduleID: { type: String, required: true },
            isFinished: { type: Boolean, default: false },
            score: { type: Number, required: true },
            userAnswers: [
                {
                    questionText: { type: String, required: true },
                    userAnswer: { type: String, required: true },
                    correctAnswer: { type: String }
                }
            ]
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
}, { timestamps: true })
// Static Signup method
userSchema.statics.signup = async function (name, email, userfield, password, createdby) {

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

    const user = await this.create({ name, email, userfield, password: hash, createdby })

    return user
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All Fields must be filled')
    }
    // Email Exists
    const user = await this.findOne({ email })
    if (!user) {   
        throw Error('Incorrect Email or Password')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {   
        throw Error('Incorrect Email or Password')
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
userSchema.statics.addscore = async function (id, modules) {
    try {
        // Check if modules is an array
        if (!Array.isArray(modules)) {
            throw Error('modules must be an array');
        }

        // Find the user by ID
        const user = await this.findOne({ _id: id });
        if (!user) {
            throw Error('User not found');
        }

        // Process each module in the modules array
        modules.forEach((moduleData) => {
            // Check if the module already exists
            const existingModule = user.modules.find(
                (module) => module.moduleID === moduleData.moduleID
            );

            if (existingModule) {
                // Update existing module data
                existingModule.isFinished = moduleData.isFinished;
                existingModule.score = moduleData.score;

                // Update userAnswers if any are provided
                if (moduleData.userAnswers && Array.isArray(moduleData.userAnswers)) {
                    existingModule.userAnswers = moduleData.userAnswers; // Overwrite or append
                }
            } else {
                // Add new module data
                user.modules.push(moduleData);
            }
        });

        // Save the updated user document
        user.markModified("modules"); // Ensure the modules field is marked as modified
        await user.save();
        return user;
    } catch (error) {
        throw Error('An Error Occurred. ' + error.message);
    }
};




module.exports = mongoose.model('User', userSchema)