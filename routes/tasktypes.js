const express = require("express");
const { validate } = require("../controller/auth");
const tasktypes = require("../controller/tasktypes");
const router = express.Router();

router.get("/getall", validate, tasktypes.getAll);
router.put("/add", validate, tasktypes.add);
router.put("/addbulk", validate, tasktypes.addbulk);

module.exports = router;