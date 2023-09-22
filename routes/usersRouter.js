const express = require("express")
const router = express.Router()
const {
    getAllUsers,
    getUsersById,
    createUsers,
    editeUsersById,
    deleteUsersById,
} = require("../controllers/usersController")

router
    .route("/")
    .get(getAllUsers)
    .post(createUsers)

router
    .route("/:id")
    .get(getUsersById)
    .patch(editeUsersById)
    .delete(deleteUsersById)

module.exports = router
