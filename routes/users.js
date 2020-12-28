var express = require("express");
var router = express.Router();
const usersController = require("../controllers/userControllers");
const extractFile = require('../middleware/file');
/*  /users */

router.get("/", usersController.get_users);
router.post("/add", extractFile, usersController.add_user);
router.delete("/delete/:id", usersController.delete_user);
router.put("/edit/:id", extractFile, usersController.edit_user)

module.exports = router;