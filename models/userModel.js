const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "name are required"],
    },
    email: {
        type: String,
        required: [true, "email are required"],
    },
    role: {
        type: String,
        required: [true, "role are required"],
    },
    password: {
        type: String,
        required: [true, "password are required"],
    },
})

module.exports = mongoose.model(
    "User",
    UserSchema
)
