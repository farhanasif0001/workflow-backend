const express = require("express");
const { validate } = require("../controller/auth");
const projectstatuses = require("../controller/projectstatuses");
const router = express.Router();

router.put("/add", validate, projectstatuses.add);
router.put("/addbulk", validate, projectstatuses.addbulk);

module.exports = router;