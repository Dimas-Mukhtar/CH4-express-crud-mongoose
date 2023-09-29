// const fs = require("fs")

// const tours = JSON.parse(
//     fs.readFileSync(
//         `${__dirname}/../dev-data/data/tours-simple.json`
//     )
// )

const Tour = require("../models/tourModel")

// const createToursDB = async (req, res) => {
//     try {
//         const tour = await Tour.create(req.body)
//         res.status(200).json({
//             status: "succes",
//             data: {
//                 tour,
//             },
//         })
//     } catch (error) {
//         res.status(400).json({
//             status: "failed",
//         })
//     }
// }

// const getAllTours = (req, res) => {
//     res.status(200).json({
//         status: "succes",
//         requestTime: req.requestTime,
//         data: {
//             tours,
//         },
//     })
// }

// const getToursById = (req, res) => {
//     const id = req.params.id * 1

//     const tour = tours.find((el) => el.id === id)
//     res.status(200).json({
//         status: "succes",
//         data: {
//             tour,
//         },
//     })
// }

// const createTours = (req, res) => {
//     // generate id
//     const newId = tours[tours.length - 1].id + 1
//     const newData = Object.assign(
//         { id: newId },
//         req.body
//     ) // method yang membuat object baru dengan menggabungkan 2 object yang sudah ada
//     tours.push(newData)
//     fs.writeFile(
//         `${__dirname}/../dev-data/data/tours-simple.json`,
//         JSON.stringify(tours),
//         (err) => {
//             // karena json sudah dibuah ke object maka harus dijadikan jeson dulu menggunakan json.stringify
//             // 201 = created
//             res.status(201).json({
//                 status: "succes",
//                 data: {
//                     tour: newData,
//                 },
//             })
//         }
//     )
// }

// const editeToursById = (req, res) => {
//     const id = req.params.id * 1

//     const tourIndex = tours.findIndex(
//         (el) => el.id === id
//     )
//     tours[tourIndex] = {
//         ...tours[tourIndex],
//         ...req.body,
//     }
//     fs.writeFile(
//         `${__dirname}/../dev-data/data/tours-simple.json`,
//         JSON.stringify(tours),
//         (err) => {
//             res.status(200).json({
//                 status: "success",
//                 message: `data with id ${id} updated`,
//                 data: {
//                     tours: tourIndex,
//                 },
//             })
//         }
//     )
// }

// const deleteToursById = (req, res) => {
//     const id = req.params.id * 1
//     const tourIndex = tours.findIndex(
//         (el) => el.id === id
//     )
//     tours.splice(tourIndex, 1)
//     fs.writeFile(
//         `${__dirname}/../dev-data/data/tours-simple.json`,
//         JSON.stringify(tours),
//         (err) => {
//             res.status(200).json({
//                 status: "success",
//                 message: "Berhasil menghapus",
//                 data: null,
//             })
//         }
//     )
// }

// ======================================================================================================

const getAllTours = async (req, res) => {
    try {
        const tour = await Tour.find()
        res.status(200).json({
            status: "succes",
            data: {
                tour,
            },
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message,
        })
    }
}

const getToursById = async (req, res) => {
    try {
        const id = req.params.id

        const tour = await Tour.findOne({
            _id: id,
        })
        res.status(200).json({
            status: "succes",
            data: {
                tour,
            },
        })
    } catch (error) {}
}

const createTours = async (req, res) => {
    try {
        const newTour = new Tour(req.body)
        const saveTour = await newTour.save()
        res.status(200).json(newTour)
    } catch (error) {
        res.status(400).json(error)
    }
}

const editeToursById = async (req, res) => {
    try {
        const { id: idTour } = req.params
        const tour = await Tour.findOneAndUpdate(
            { _id: idTour },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )
        if (!tour) {
            return res.status(404).json({
                message: `id with ${idTour} not found`,
            })
        }
        res.status(200).json({
            status: "success",
            data: tour,
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message,
        })
    }
}

const deleteToursById = async (req, res) => {
    try {
        const { id: idTour } = req.params
        const tour = await Tour.findOneAndDelete({
            _id: idTour,
        })
        if (!tour) {
            return res.status(404).json({
                message: `id with ${idTour} not found`,
            })
        }
        res.status(200).json({
            status: "success, deleted",
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    getAllTours,
    getToursById,
    createTours,
    editeToursById,
    deleteToursById,
}
