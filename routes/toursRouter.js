const express = require("express")
const router = express.Router()
const {
    getAllTours,
    getToursById,
    createTours,
    editeToursById,
    deleteToursById,
} = require("../controllers/toursController")

const checkId = require("../middleware/checkId")
const checkBody = require("../middleware/checkBody")
router.param("id", checkId)

router
    .route("/")
    .get(getAllTours)
    .post(checkBody, createTours)

router
    .route("/:id")
    .get(getToursById)
    .patch(editeToursById)
    .delete(deleteToursById)

module.exports = router
