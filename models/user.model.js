import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
        maxlength: 50,
    },
    role: {
        type: String,
        default: "user",
        required: true
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    //! if the password field is not modified, return.
    if (this.isModified('password')) {

        // if the field is not modifying is not password then don't execute this function
        //! otherwise, hash the password
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } else {
        next()
    }
});

// schemaName.methods.methodName = function () {};

// ! password compare
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export const userCollection = mongoose.model('User', userSchema);