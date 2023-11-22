const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");

router.post("/register", Controller.registerToPostgresAndCE);
router.post("/loginToPostgres", Controller.loginToPostgres);
//Require Authentication
router.patch("/user", authentication, Controller.updateFirstTimeColumnPostgres);
router.post("/usergroup", authentication, Controller.addGroupToUser);
router.get("/usergroup", authentication, Controller.showGroupOfUser);
router.put("/usergroup/:id", authentication, Controller.deleteGroupOfUser);

module.exports = router;
