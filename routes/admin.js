const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")

router.route("/").get(adminController.getAllTours)

router
    .route("/create")
    .get(adminController.getPage)

router
    .route("/action")
    .post(adminController.createPage)
module.exports = router
