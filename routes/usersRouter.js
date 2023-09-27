const express = require("express")
const router = express.Router()
const {
    getAllUsers,
    getUsersById,
    createUser,
    editeUsersById,
    deleteUsersById,
} = require("../controllers/usersController")

router
    .route("/")
    .get(getAllUsers)
    .post(createUser)

router
    .route("/:id")
    .get(getUsersById)
    .patch(editeUsersById)
    .delete(deleteUsersById)

module.exports = router
