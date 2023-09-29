const express = require("express")
const router = express.Router()
const {
    getAllTours,
    getToursById,
    createTours,
    editeToursById,
    deleteToursById,
} = require("../controllers/toursController")

// const checkId = require("../middleware/checkId")
// const checkBody = require("../middleware/checkBody")
// router.param("id", checkId)

// router.route("/createModel").post(createTours)

router
    .route("/")
    .get(getAllTours)
    .post(createTours)

router
    .route("/:id")
    .get(getToursById)
    .patch(editeToursById)
    .delete(deleteToursById)

module.exports = router
