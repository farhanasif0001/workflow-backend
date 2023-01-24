const express = require("express");
const { validate, validateAdmin } = require("../controller/auth");
const tasks = require("../controller/tasks");
const router = express.Router();

router.get("/getall/:userId", validate, tasks.getAll);
router.get("/getall", validateAdmin, tasks.getAll);
router.get("/get/:id", validateAdmin, tasks.getOne);
router.post("/update", validateAdmin, tasks.update);
router.put("/add", validateAdmin, tasks.add);
router.put("/addbulk", validateAdmin, tasks.addbulk);

module.exports = router;