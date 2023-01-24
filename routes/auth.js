const express = require("express");
const { validate } = require("../controller/auth");
const auth = require("../controller/auth");
const router = express.Router();

router.post("/login", auth.login);
router.get("/current", validate, auth.currentUser);
router.put("/register", validate, auth.register);

module.exports = router;