var express = require("express");
var router = express.Router();
const usersController = require("../controllers/userControllers");
const extractFile = require('../middleware/file');
/*  /users */



router.put("/edit/:id", extractFile, usersController.edit_user)
router.delete("/delete/:id", usersController.delete_user);
router.post("/add", usersController.add_user);
router.get("/", usersController.get_users);




module.exports = router;