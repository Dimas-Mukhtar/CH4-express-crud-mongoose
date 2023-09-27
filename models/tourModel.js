const mongoose = require("mongoose")
const Schema = mongoose.Schema

const tourSchema = new Schema({
    name: {
        type: String,
        required: [true, "nama tour harus ada"],
        unique: true,
    },
    rating: {
        type: Number,
        default: 4,
    },
    price: {
        type: Number,
        required: [true, "harganya harus ada"],
    },
})

module.exports = mongoose.model(
    "Tour",
    tourSchema
)
