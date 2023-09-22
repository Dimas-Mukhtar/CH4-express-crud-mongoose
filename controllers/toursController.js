const fs = require("fs")

const tours = JSON.parse(
    fs.readFileSync(
        `${__dirname}/../dev-data/data/tours-simple.json`
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
        `${__dirname}/../dev-data/data/tours-simple.json`,
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
    tours[tourIndex] = {
        ...tours[tourIndex],
        ...req.body,
    }
    fs.writeFile(
        `${__dirname}/../dev-data/data/tours-simple.json`,
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
    tours.splice(tourIndex, 1)
    fs.writeFile(
        `${__dirname}/../dev-data/data/tours-simple.json`,
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

module.exports = {
    getAllTours,
    getToursById,
    createTours,
    editeToursById,
    deleteToursById,
}
