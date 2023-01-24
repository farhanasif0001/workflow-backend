const models = require("../models");

const getOne = async (req, res) => {
    try {
        let { id } = req.params
        await models.tasks.findOne({
            where: {
                id: id
            },
            attributes: ["id","name","description","startdate","enddate","createdAt", "updatedAt"],
            include: [{
                model: models.tasktypes,
                as: "type"
            }, {
                model: models.priorities,
                as: "priority",
            }, {
                model: models.users.scope('withoutPassword'),
                as: "assignedto",
                attributes: { exclude: ['roleId'] },
                include: {
                    model: models.roles,
                    as: "role"
                }
            }, {
                model: models.users.scope('withoutPassword'),
                as: "assignedby",
                attributes: { exclude: ['roleId'] },
                include: {
                    model: models.roles,
                    as: "role"
                }
            }, {
                    model: models.projects,
                    as: "project",
                    attributes: ["id", "name", "createdAt", "updatedAt"],
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
                }, {
                model: models.taskstatuses,
                as: "status"
            }]
        })
            .then((task) => {
                res.status(200).json({
                    ...task.toJSON()
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
        if(userId) where['assignedtoId'] = userId
        await models.tasks.findAll({
            where,
            attributes: ["id","name","description","startdate","enddate","createdAt", "updatedAt"],
            include: [{
                model: models.tasktypes,
                as: "type"
            }, {
                model: models.priorities,
                as: "priority",
            }, {
                model: models.users.scope('withoutPassword'),
                as: "assignedto",
                attributes: { exclude: ['roleId'] },
                include: {
                    model: models.roles,
                    as: "role"
                }
            }, {
                model: models.users.scope('withoutPassword'),
                as: "assignedby",
                attributes: { exclude: ['roleId'] },
                include: {
                    model: models.roles,
                    as: "role"
                }
            }, {
                    model: models.projects,
                    as: "project",
                    attributes: ["id", "name", "createdAt", "updatedAt"],
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
                }, {
                model: models.taskstatuses,
                as: "status"
            }]
        })
            .then((tasks) => {
                res.status(200).json({
                    ...tasks
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
        let task = req.body;

        task = {
            name: task.name,
            description: task.description,
            typeId: task.type.id,
            priorityId: task.priority.id,
            startdate: task.startdate,
            enddate: task.enddate,
            assignedtoId: task.assignedto.id,
            assignedbyId: task.assignedby.id,
            projectId: task.project.id,
            statusId: task.status.id
        }
        
        await models.tasks.create(task)
            .then(async (response) => {
                req.params.id = response.dataValues.id;
                await getOne(req, res);
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

const addbulk = async (req, res) => {
    try {
        const tasks = req.body;
        models.tasks.bulkCreate(tasks)
            .then((tasks) => {
                res.status(200).json({
                    ...tasks
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

const update = async (req, res) => {
    try {
        let tasks = req.body;
        tasks = {
            id: tasks.id,
            name: tasks.name,
            description: tasks.description,
            typeId: tasks.type.id,
            priorityId: tasks.priority.id,
            startdate: tasks.startdate,
            enddate: tasks.enddate,
            assignedtoId: tasks.assignedto.id,
            assignedbyId: tasks.assignedby.id,
            projectId: tasks.project.id,
            statusId: tasks.status.id
        }

        console.log(tasks)

        await models.tasks.update(
            tasks,
            {
                where: {
                    id: tasks.id
                }
            }
        )
            .then(async (response) => {
                req.params.id = tasks.id;
                console.log(req.params)
                await getOne(req, res);
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
    update,
    add,
    addbulk
}