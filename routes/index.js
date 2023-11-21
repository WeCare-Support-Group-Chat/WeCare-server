const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
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

module.exports = router;
