const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const Controller = require("../controllers/controller");

//PUBLIC
router.post("/login", Controller.login);
router.post("/register", Controller.register);

//Require Authentication
router.use(authentication);
router.post("/usergroup", Controller.addGroupToUser);
router.get("/usergroup", Controller.showGroupOfUser);

//Require Authentication & Authorization
router.delete("/usergroup/:id", authorization, Controller.deleteGroupOfUser);

module.exports = router;
