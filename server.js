require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");

app.use(bodyParser.json({ limit: "25mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "25mb" }));
app.use(cors());
app.use("/auth", routes.auth);
app.use("/hiringnames", routes.hiringnames);
app.use("/taskpriorities", routes.priorities);
app.use("/projects", routes.projects);
app.use("/projectstatuses", routes.projectstatuses);
app.use("/roles", routes.roles);
app.use("/tasks", routes.tasks);
app.use("/taskstatuses", routes.taskstatuses);
app.use("/tasktypes", routes.tasktypes);
app.use("/users", routes.users);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log("Server is Listening on port: " + port));