const models = require("../models");

const getOne = async (req, res) => {
    try {
        let { id } = req.params

        await models.projectstatuses.findOne({
            where: {
                id: id
            }
        })
            .then((projectstatus) => {
                res.status(200).json({
                    ...projectstatus
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
        await models.projectstatuses.findAll()
            .then((projectstatuses) => {
                res.status(200).json({
                    ...projectstatuses
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
            models.projectstatuses.create({
                value,
                label
            })
                .then((projectstatuses) => {
                    res.status(200).json({
                        ...projectstatuses
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
        const projectstatuses = req.body;
        models.projectstatuses.bulkCreate(projectstatuses)
            .then((projectstatuses) => {
                res.status(200).json({
                    ...projectstatuses
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