const express = require("express");
const { validate } = require("../controller/auth");
const users = require("../controller/users");
const router = express.Router();

router.get("/getall", validate, users.getAll);
router.get("/get/:id", validate, users.getOne);

module.exports = router;