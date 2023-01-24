const express = require("express");
const { validate, validateAdmin } = require("../controller/auth");
const projects = require("../controller/projects");
const router = express.Router();

router.get("/getall/:userId", validate, projects.getAll);
router.get("/getall", validateAdmin, projects.getAll);
router.get("/get/:id", validate, projects.getOne);
router.put("/add", validateAdmin, projects.add);
router.put("/addbulk", validateAdmin, projects.addbulk);

module.exports = router;