const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")

router.route("/").get(adminController.getAllTours)

router
    .route("/create")
    .get(adminController.createPage)

router
    .route("/add")
    .post(adminController.createTour)

router
    .route("/edit/:id")
    .get(adminController.editePage)
    .post(adminController.editeTour)

router
    .route("/delete/:id")
    .post(adminController.deleteTour)
module.exports = router
