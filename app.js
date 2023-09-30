require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const session = require("express-session")
const flash = require("connect-flash")
const bodyParser = require("body-parser")
const toursRouter = require("./routes/toursRouter")
const usersRouter = require("./routes/usersRouter")
const adminRouter = require("./routes/adminRouter")
const swaggerUi = require("swagger-ui-express")
const fs = require("fs")
const yaml = require("js-yaml")
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

// app.set("view engine", "ejs")
// app.set("views", "views")
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

// swagger api
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

// flash and express session for notification
app.use(
    session({
        secret: "geeksforgeeks",
        saveUninitialized: true,
        resave: true,
    })
)
app.use(flash())

app.use("/api/v1/tours", toursRouter)
app.use("/api/v1/users", usersRouter)
app.use("/dashboard", adminRouter)

module.exports = app
