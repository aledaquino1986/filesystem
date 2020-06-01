var express = require('express');
var router = express.Router();
var profileControllers = require("../controllers/profileControllers")

/* GET home page. */
router.get('/', profileControllers.accessProfile)

module.exports = router;
