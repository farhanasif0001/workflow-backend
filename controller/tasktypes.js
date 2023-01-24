const models = require("../models");

const getOne = async (req, res) => {
    try {
        let { id } = req.params

        await models.tasktypes.findOne({
            where: {
                id: id
            }
        })
            .then((tasktype) => {
                res.status(200).json({
                    ...tasktype
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
        await models.tasktypes.findAll()
            .then((tasktypes) => {
                res.status(200).json({
                    ...tasktypes
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
    try {
        const task = req.body;
        
        await models.tasktypes.create(task)
            .then((task) => {
                res.status(200).json({
                    ...task
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

const addbulk = async (req, res) => {
    try {
        const tasktypes = req.body;
        models.tasktypes.bulkCreate(tasktypes)
            .then((tasktypes) => {
                res.status(200).json({
                    ...tasktypes
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