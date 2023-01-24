const express = require("express");
const { validate } = require("../controller/auth");
const taskstatuses = require("../controller/taskstatuses");
const router = express.Router();

router.get("/getall", validate, taskstatuses.getAll);
router.put("/add", validate, taskstatuses.add);
router.put("/addbulk", validate, taskstatuses.addbulk);

module.exports = router;