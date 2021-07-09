const express = require('express'),
router = express.Router(),
welcome = require("../controllers/welcome.controller")

router.get('/',welcome.welcome)

module.exports = router