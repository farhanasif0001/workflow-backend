const express = require("express");
const { validate } = require("../controller/auth");
const hiringnames = require("../controller/hiringnames");
const router = express.Router();

router.put("/add", validate, hiringnames.add);
router.put("/addbulk", validate, hiringnames.addbulk);

module.exports = router;