const auth = require("./auth");
const hiringnames = require("./hiringnames");
const priorities = require("./priorities");
const projects = require("./projects");
const projectstatuses = require("./projectstatuses");
const roles = require("./roles");
const tasks = require("./tasks");
const taskstatuses = require("./taskstatuses");
const tasktypes = require("./tasktypes");
const users = require("./users");

module.exports = {
    auth,
    hiringnames,
    priorities,
    projects,
    projectstatuses,
    tasks,
    taskstatuses,
    roles,
    tasktypes,
    users
}