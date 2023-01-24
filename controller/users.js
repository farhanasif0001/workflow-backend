const models = require("../models");

const getOne = async (req, res) => {
    try {
        let { id } = req.params

        await models.users.findOne({
            where: {
                id: id
            }
        })
        .then((user) => {
            res.status(200).json({
                ...user
            })
        })
        .catch((error) => {
            throw error
        })
    }
    catch (error) {
        res.status(500).json({
            error
        })
    }
}

const getAll = async (req, res) => {
    try {
        await models.users.findAll()
        .then((users) => {
            res.status(200).json({
                ...users
            })
        })
        .catch((error) => {
            throw error
        })
    }
    catch (error) {
        res.status(500).json({
            error
        })
    }
}

// const add = async (req, res) => {
//     const { firstname, lastname, email, roleId } = req.body;
//     try {
//         if (firstname && lastname && email && roleId) {
//             await models.users.create({
//                 firstname,
//                 lastname,
//                 email,
//                 roleId
//             })
//                 .then((user) => {
//                     res.status(200).json({
//                         ...user
//                     })
//                 })
//                 .catch((error) => {
//                     throw error
//                 })
//         }
//         else {
//             throw "you have missing fields"
//         }
//     }
//     catch (error) {
//         res.status(500).json({
//             error
//         })
//     }
// }

module.exports = {
    getOne,
    getAll
}