const models = require("../models");
const https = require("https");

const getOne = async (req, res) => {
    try {
        let { id } = req.params

        await models.roles.findOne({
            where: {
                id: id
            }
        })
        .then((role) => {
            res.status(200).json({
                ...role
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
        await models.roles.findAll()
        .then((roles) => {
            res.status(200).json({
                ...roles
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

const add = async (req, res) => {
    console.log(req.body);
    try {
        let { value, label } = req.body;
        if (value && label) {
            models.roles.create({
                value,
                label
            })
                .then((roles) => {
                    res.status(200).json({
                        ...roles
                    })
                })
                .catch((error) => {
                    throw error
                })
        }
        else {
            throw "both value and lable fields are required"
        }
    }
    catch (error) {
        res.status(500).json({
            error
        })
    }
}

const addbulk = async (req, res) => {
    try {
        const roles = req.body;
        models.roles.bulkCreate(roles)
            .then((roles) => {
                res.status(200).json({
                    ...roles
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

module.exports = {
    getOne,
    getAll,
    add,
    addbulk
}