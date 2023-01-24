const models = require("../models");

const getOne = async (req, res) => {
    try {
        let { id } = req.params

        await models.priorities.findOne({
            where: {
                id: id
            }
        })
        .then((priority) => {
            res.status(200).json({
                ...priority
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
        await models.priorities.findAll()
        .then((priorities) => {
            res.status(200).json({
                ...priorities
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
            models.priorities.create({
                value,
                label
            })
                .then((priorities) => {
                    res.status(200).json({
                        ...priorities
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
        const priorities = req.body;
        models.priorities.bulkCreate(priorities)
            .then((priorities) => {
                res.status(200).json({
                    ...priorities
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