const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
// <<<<<<< HEAD
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
// =======
const authentication = require("../middlewares/authentication");

//GISELLE
router.post("/register", Controller.registerToPostgresAndCE);
router.post("/loginToPostgres", Controller.loginToPostgres);
router.patch("/user", authentication, Controller.updateFirstTimeColumnPostgres);
router.post("/loginToCE", authentication, Controller.loginToCE);
//validation
//Error handler (part sendiri)
//API

//AKBAR
//add group di postgres & CE
//show group ke UI kita
//delete group di postgres & CE
//Error handler (part sendiri)
// >>>>>>> 4cbbb5e1d7b7abadc971e565c4e425b72d7aece5

module.exports = router;
