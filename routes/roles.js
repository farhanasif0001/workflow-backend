const express = require("express");
const { validate } = require("../controller/auth");
const roles = require("../controller/roles");
const router = express.Router();

router.put("/add", validate, roles.add);
router.put("/addbulk", validate, roles.addbulk);

module.exports = router;