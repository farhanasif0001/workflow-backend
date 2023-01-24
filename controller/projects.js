const { Op } = require("sequelize");
const models = require("../models");

const getOne = async (req, res) => {
    try {
        let { id } = req.params
        await models.projects.findOne({
            where: {
                id: id
            },
            attributes: ["name"],
            include: [{
                model: models.hiringnames,
                as: "hired"
            }, {
                model: models.users.scope('withoutPassword'),
                as: "developer"
            }, {
                model: models.users.scope('withoutPassword'),
                as: "manager"
            }, {
                model: models.users.scope('withoutPassword'),
                as: "caller"
            }, {
                model: models.projectstatuses,
                as: "projectstatus"
            }]
        })
            .then((project) => {
                res.status(200).json({
                    ...project.toJSON()
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
        let userId = req.params.userId;
        let where = {}
        if (userId) {
            where[Op.or] = [
                { developerId: userId },
                { callerId: userId },
                { managerId: userId }
            ]
        }
        await models.projects.findAll({
            where,
            attributes: ["id","name","createdAt","updatedAt"],
            include: [{
                model: models.hiringnames,
                as: "hired"
            }, {
                model: models.users.scope('withoutPassword'),
                as: "developer"
            }, {
                model: models.users.scope('withoutPassword'),
                as: "manager"
            }, {
                model: models.users.scope('withoutPassword'),
                as: "caller"
            }, {
                model: models.projectstatuses,
                as: "status"
            }]
        })
            .then((projects) => {
                res.status(200).json({
                    ...projects
                })
            })
            .catch((error) => {
                throw error
            })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}

const add = async (req, res) => {
    try {
        const project = req.body;
        await models.projects.create(project)
            .then((projects) => {
                res.status(200).json({
                    ...projects
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
        const projects = req.body;
        models.projects.bulkCreate(projects)
            .then((projects) => {
                res.status(200).json({
                    ...projects
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