require("dotenv").config()
const mongoose = require("mongoose")

const port = process.env.port || 3000
const app = require("./app")
const connectDB = require("./config/connectDB")
connectDB()

mongoose.connection.once("open", () => {
    console.log("mongodb connected")
    app.listen(port, () => {
        console.log(
            `app is running on port ${port}`
        )
    })
})
