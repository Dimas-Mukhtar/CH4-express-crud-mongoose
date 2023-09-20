const fs = require("fs")
const express = require("express")
const morgan = require("morgan")
const { execArgv } = require("process")
const port = process.env.port || 3000

const app = express()

// middleware dari express
// memodifikasi incoming body ke api kita
app.use(express.json())
app.use(morgan("dev"))

// our own middleware
app.use((req, res, next) => {
    console.log(
        "hallo fsw 2 di middleware kita sendiri"
    )
    next()
})

// middleware logging
app.use((req, res, next) => {
    req.requestTime = new Date().toString()
    next()
})

const tours = JSON.parse(
    fs.readFileSync(
        `${__dirname}/dev-data/data/tours-simple.json`
    )
)

const getAllTours = (req, res) => {
    res.status(200).json({
        status: "succes",
        requestTime: req.requestTime,
        data: {
            tours,
        },
    })
}

const getToursById = (req, res) => {
    const id = req.params.id * 1

    const tour = tours.find((el) => el.id === id)
    if (!tour) {
        return res.status(404).json({
            status: "NOT FOUND",
            message: `data with id ${id} not found`,
        })
    }
    res.status(200).json({
        status: "succes",
        data: {
            tour,
        },
    })
}

const createTours = (req, res) => {
    // generate id
    const newId = tours[tours.length - 1].id + 1
    const newData = Object.assign(
        { id: newId },
        req.body
    ) // method yang membuat object baru dengan menggabungkan 2 object yang sudah ada
    tours.push(newData)
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            // karena json sudah dibuah ke object maka harus dijadikan jeson dulu menggunakan json.stringify
            // 201 = created
            res.status(201).json({
                status: "succes",
                data: {
                    tour: newData,
                },
            })
        }
    )
}

const editeToursById = (req, res) => {
    const id = req.params.id * 1

    const tourIndex = tours.findIndex(
        (el) => el.id === id
    )
    if (tourIndex === -1) {
        return res.status(404).json({
            status: "NOT FOUND",
            message: `data with id ${id} not found`,
        })
    }

    tours[tourIndex] = {
        ...tours[tourIndex],
        ...req.body,
    }
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(200).json({
                status: "success",
                message: `data with id ${id} updated`,
                data: {
                    tours: tourIndex,
                },
            })
        }
    )
}

const deleteToursById = (req, res) => {
    const id = req.params.id * 1
    const tourIndex = tours.findIndex(
        (el) => el.id === id
    )
    if (tourIndex === -1) {
        return res.status(404).json({
            status: "NOT FOUND",
            message: "Data not found",
        })
    }

    tours.splice(tourIndex, 1)
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(200).json({
                status: "success",
                message: "Berhasil menghapus",
                data: null,
            })
        }
    )
}

const users = JSON.parse(
    fs.readFileSync(
        `${__dirname}/dev-data/data/users.json`
    )
)

const getAllUsers = (req, res) => {
    res.status(200).json({
        status: "succes",
        requestTime: req.requestTime,
        data: {
            users,
        },
    })
}

const getUsersById = (req, res) => {
    const id = req.params.id

    const user = users.find((el) => el._id === id)
    if (!user) {
        return res.status(404).json({
            status: "NOT FOUND",
            message: `data with id ${id} not found`,
        })
    }
    res.status(200).json({
        status: "succes",
        data: {
            user,
        },
    })
}

const createUsers = (req, res) => {
    // generate id
    const newId = users[users.length - 1]._id + 1
    const newData = Object.assign(
        { _id: newId },
        req.body
    ) // method yang membuat object baru dengan menggabungkan 2 object yang sudah ada
    users.push(newData)
    fs.writeFile(
        `${__dirname}/dev-data/data/users.json`,
        JSON.stringify(users),
        (err) => {
            // karena json sudah dibuah ke object maka harus dijadikan jeson dulu menggunakan json.stringify
            // 201 = created
            res.status(201).json({
                status: "succes",
                data: {
                    user: newData,
                },
            })
        }
    )
}

const editeUsersById = (req, res) => {
    const id = req.params.id

    const userIndex = users.findIndex(
        (el) => el._id === id
    )
    if (userIndex === -1) {
        return res.status(404).json({
            status: "NOT FOUND",
            message: `data with id ${id} not found`,
        })
    }

    users[userIndex] = {
        ...users[userIndex],
        ...req.body,
    }
    fs.writeFile(
        `${__dirname}/dev-data/data/users.json`,
        JSON.stringify(users),
        (err) => {
            res.status(200).json({
                status: "success",
                message: `data with id ${id} updated`,
                data: {
                    user: userIndex,
                },
            })
        }
    )
}

const deleteUsersById = (req, res) => {
    const id = req.params.id
    const userIndex = users.findIndex(
        (el) => el._id === id
    )
    if (userIndex === -1) {
        return res.status(404).json({
            status: "NOT FOUND",
            message: "Data not found",
        })
    }

    users.splice(userIndex, 1)
    fs.writeFile(
        `${__dirname}/dev-data/data/users.json`,
        JSON.stringify(users),
        (err) => {
            res.status(200).json({
                status: "success",
                message: "Berhasil menghapus",
                data: null,
            })
        }
    )
}
// routing

const toursRouter = express.Router()
const usersRouter = express.Router()

toursRouter
    .route("/")
    .get(getAllTours)
    .post(createTours)

toursRouter
    .route("/:id")
    .get(getToursById)
    .patch(editeToursById)
    .delete(deleteToursById)

usersRouter
    .route("/")
    .get(getAllUsers)
    .post(createUsers)

usersRouter
    .route("/:id")
    .get(getUsersById)
    .patch(editeUsersById)
    .delete(deleteUsersById)

app.use("/api/v1/tours", toursRouter)
app.use("/api/v1/users", usersRouter)

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})
