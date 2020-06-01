var express = require('express');
var router = express.Router();
var multer = require('multer');
const path = require('path');
var usersControllers = require("../controllers/usersControllers");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img/avatars')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })



/* GET home page. */
router.get('/register', usersControllers.accessRegister);
router.post("/register", upload.any(), usersControllers.saveProfile);
router.get('/profile', usersControllers.accessProfile)
router.get('/login', usersControllers.login)
router.post('/login', usersControllers.processLogin)


module.exports = router;