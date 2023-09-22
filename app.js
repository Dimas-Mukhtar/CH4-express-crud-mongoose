const fs = require("fs")
const express = require("express")
const morgan = require("morgan")
const toursRouter = require("./routes/toursRouter")
const usersRouter = require("./routes/usersRouter")

const app = express()

// middleware dari express
// memodifikasi incoming body ke api kita
app.use(express.json())
app.use(morgan("dev"))

// middleware logging
app.use((req, res, next) => {
    req.requestTime = new Date().toString()
    next()
})

app.use("/api/v1/tours", toursRouter)
app.use("/api/v1/users", usersRouter)

module.exports = app
