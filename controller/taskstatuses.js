const models = require("../models");

const getOne = async (req, res) => {
    try {
        let { id } = req.params

        await models.taskstatuses.findOne({
            where: {
                id: id
            }
        })
            .then((taskstatus) => {
                res.status(200).json({
                    ...taskstatus
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
        await models.taskstatuses.findAll()
            .then((taskstatuses) => {
                res.status(200).json({
                    ...taskstatuses
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
        
        await models.taskstatuses.create(task)
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
        const taskstatuses = req.body;
        models.taskstatuses.bulkCreate(taskstatuses)
            .then((taskstatuses) => {
                res.status(200).json({
                    ...taskstatuses
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