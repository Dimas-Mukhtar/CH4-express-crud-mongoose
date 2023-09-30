const Tour = require("../models/tourModel")

const getAllTours = async (req, res) => {
    try {
        const tour = await Tour.find()
        res.render("tours/tours.ejs", {
            tour: tour,
            message: req.flash("message", ""),
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message,
        })
    }
}

const createPage = async (req, res) => {
    try {
        const tour = await Tour.find()
        res.render("tours/create.ejs")
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message,
        })
    }
}

const createTour = async (req, res) => {
    try {
        const newTour = await Tour.create({
            name: req.body.nama,
            rating: req.body.rating,
            price: req.body.harga,
        })
        req.flash("message", "Ditambah")
        res.redirect("/dashboard")
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message,
        })
    }
}

const editePage = async (req, res) => {
    try {
        const id = req.params.id
        const tour = await Tour.findById(id)
        res.render("tours/edit.ejs", {
            tour: tour,
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message,
        })
    }
}

const editeTour = async (req, res) => {
    try {
        const id = req.params.id
        const tour = await Tour.findByIdAndUpdate(
            id,
            {
                name: req.body.nama,
                rating: req.body.rating,
                price: req.body.harga,
            },
            {
                new: true,
            }
        )
        req.flash("message", "Diupdate")
        res.redirect("/dashboard")
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message,
        })
    }
}

const deleteTour = async (req, res) => {
    try {
        const id = req.params.id
        const tour = await Tour.findByIdAndRemove(
            id
        )
        req.flash("message", "Didelete")
        res.redirect("/dashboard")
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message,
        })
    }
}

module.exports = {
    getAllTours,
    createPage,
    createTour,
    editePage,
    editeTour,
    deleteTour,
}
