const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const Controller = require("../controllers/controller");
const { authN } = require("../helpers/bcrypt");

//PUBLIC
router.post("/register", Controller.register);
router.post("/login", Controller.login);

//Require Authentication
router.use(authN);
router.post("/usergroup", Controller.addGroupToUser);
router.get("/usergroup", Controller.showGroupOfUser);

//Require Authentication & Authorization
router.put("/usergroup/:id", Controller.deleteGroupOfUser);

module.exports = router;
