// // const fs = require("fs")

// // const users = JSON.parse(
// //     fs.readFileSync(
// //         `${__dirname}/../dev-data/data/users.json`
// //     )
// // )

// // const getAllUsers = (req, res) => {
// //     res.status(200).json({
// //         status: "succes",
// //         requestTime: req.requestTime,
// //         data: {
// //             users,
// //         },
// //     })
// // }

// // const getUsersById = (req, res) => {
// //     const id = req.params.id

// //     const user = users.find((el) => el._id === id)
// //     if (!user) {
// //         return res.status(404).json({
// //             status: "NOT FOUND",
// //             message: `data with id ${id} not found`,
// //         })
// //     }
// //     res.status(200).json({
// //         status: "succes",
// //         data: {
// //             user,
// //         },
// //     })
// // }

// // const createUsers = (req, res) => {
// //     // generate id
// //     const newId = users[users.length - 1]._id + 1
// //     const newData = Object.assign(
// //         { _id: newId },
// //         req.body
// //     ) // method yang membuat object baru dengan menggabungkan 2 object yang sudah ada
// //     users.push(newData)
// //     fs.writeFile(
// //         `${__dirname}/../dev-data/data/users.json`,
// //         JSON.stringify(users),
// //         (err) => {
// //             // karena json sudah dibuah ke object maka harus dijadikan jeson dulu menggunakan json.stringify
// //             // 201 = created
// //             res.status(201).json({
// //                 status: "succes",
// //                 data: {
// //                     user: newData,
// //                 },
// //             })
// //         }
// //     )
// // }

// // const editeUsersById = (req, res) => {
// //     const id = req.params.id

// //     const userIndex = users.findIndex(
// //         (el) => el._id === id
// //     )
// //     if (userIndex === -1) {
// //         return res.status(404).json({
// //             status: "NOT FOUND",
// //             message: `data with id ${id} not found`,
// //         })
// //     }

// //     users[userIndex] = {
// //         ...users[userIndex],
// //         ...req.body,
// //     }
// //     fs.writeFile(
// //         `${__dirname}/../dev-data/data/users.json`,
// //         JSON.stringify(users),
// //         (err) => {
// //             res.status(200).json({
// //                 status: "success",
// //                 message: `data with id ${id} updated`,
// //                 data: {
// //                     user: userIndex,
// //                 },
// //             })
// //         }
// //     )
// // }

// // const deleteUsersById = (req, res) => {
// //     const id = req.params.id
// //     const userIndex = users.findIndex(
// //         (el) => el._id === id
// //     )
// //     if (userIndex === -1) {
// //         return res.status(404).json({
// //             status: "NOT FOUND",
// //             message: "Data not found",
// //         })
// //     }

// //     users.splice(userIndex, 1)
// //     fs.writeFile(
// //         `${__dirname}/../dev-data/data/users.json`,
// //         JSON.stringify(users),
// //         (err) => {
// //             res.status(200).json({
// //                 status: "success",
// //                 message: "Berhasil menghapus",
// //                 data: null,
// //             })
// //         }
// //     )
// // }

// // ==============================================================================================================

const User = require("../models/userModel")

const getAllUsers = async (req, res) => {
    try {
        const user = await User.find()
        if (!user) {
            return res.status(404).json({
                message: "no one user",
            })
        }
        res.status(200).json({
            status: "success",
            data: user,
        })
    } catch (error) {
        res.status(500).json({
            status: "failed, there is something wrong",
        })
    }
}

const getUsersById = async (req, res) => {
    try {
        const { id: idUser } = req.params
        const user = await User.findOne({
            _id: idUser,
        })
        if (!user) {
            return res.status(404).json({
                message: `no one with id ${idUser}`,
            })
        }
        res.status(200).json({
            status: "success",
            data: user,
        })
    } catch (error) {
        res.status(500).json({
            status: "failed, there is something wrong",
        })
    }
}

const createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        const saveUser = await user.save()
        res.status(200).json({
            status: "success",
            data: user,
        })
    } catch (error) {
        res.status(500).json({
            status: "failed, there is something wrong",
            message: error.message,
        })
    }
}

const editeUsersById = async (req, res) => {
    try {
        const { id: idUser } = req.params
        const user = await User.findOneAndUpdate(
            { _id: idUser },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )
        if (!user) {
            return res.status(404).json({
                message: `id with ${idUser} not found`,
            })
        }
        res.status(200).json({
            status: "success",
            data: user,
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

const deleteUsersById = async (req, res) => {
    try {
        const { id: idUser } = req.params
        const user = await User.findOneAndDelete({
            _id: idUser,
        })
        if (!user) {
            return res.status(404).json({
                message: `id with ${idUser} not found`,
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
    getAllUsers,
    getUsersById,
    createUser,
    editeUsersById,
    deleteUsersById,
}
