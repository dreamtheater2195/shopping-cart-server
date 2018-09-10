const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            messsage: '{VALUE} is not a valid email'
        }
    },
    permissionLevel: {
        type: Number
    },
    password: { type: String, required: true }
});

UserSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password.toString(), salt, null, (err, hash) => {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});

module.exports = mongoose.model('User', UserSchema);