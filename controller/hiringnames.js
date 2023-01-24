const models = require("../models");

const getOne = async (req, res) => {
    try {
        let { id } = req.params

        await models.hiringnames.findOne({
            where: {
                id: id
            }
        })
        .then((hiringname) => {
            res.status(200).json({
                ...hiringname
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
        await models.hiringnames.findAll()
        .then((hiringnames) => {
            res.status(200).json({
                ...hiringnames
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
        let { value, label } = req.body;
        if (value && label) {
            models.hiringnames.create({
                value,
                label
            })
                .then((hiringnames) => {
                    res.status(200).json({
                        ...hiringnames
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
        const hiringnames = req.body;
        models.hiringnames.bulkCreate(hiringnames)
            .then((hiringnames) => {
                res.status(200).json({
                    ...hiringnames
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