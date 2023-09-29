const Tour = require("../models/tourModel")

const getAllTours = async (req, res) => {
    try {
        const tour = await Tour.find()
        res.render("tours", {
            tour: tour,
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message,
        })
    }
}

const getPage = async (req, res) => {
    try {
        const tour = await Tour.find()
        res.render("create")
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message,
        })
    }
}

const createPage = async (req, res) => {
    try {
        const newTour = await Tour.create({
            name: req.body.nama,
            rating: req.body.rating,
            price: req.body.harga,
        })
        res.redirect("/dashboard")
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    getPage,
    createPage,
    getAllTours,
}
