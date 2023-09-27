require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const toursRouter = require("./routes/toursRouter")
const usersRouter = require("./routes/usersRouter")
const swaggerUi = require("swagger-ui-express")
const fs = require("fs")
const yaml = require("js-yaml")
const app = express()

// middleware dari express
// memodifikasi incoming body ke api kita
app.use(express.json())
app.use(morgan("dev"))
app.use(express.static(`${__dirname}/public`))
const swaggerDocument = yaml.load(
    fs.readFileSync(
        "./swagger/swagger.yaml",
        "utf-8"
    )
)

app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
)

// middleware logging
app.use((req, res, next) => {
    req.requestTime = new Date().toString()
    next()
})

app.use("/api/v1/tours", toursRouter)
app.use("/api/v1/users", usersRouter)

module.exports = app
