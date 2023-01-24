const express = require("express");
const { validate, validateAdmin } = require("../controller/auth");
const priorities = require("../controller/priorities");
const router = express.Router();

router.get("/getall", validate, priorities.getAll);
router.put("/add", validateAdmin, priorities.add);
router.put("/addbulk", validateAdmin, priorities.addbulk);

module.exports = router;