const express = require('express')
const router = express.Router();
const {medicalnfo} = require("../controller/Authentication/medicalinfo");
const {login, signup} = require("../controller/Authentication/auth");
const {additem , stocktable} = require("../controller/Home/inventoryhealth");



router.post("/login", login);
router.post("/signup", signup);
router.post("/medicalinfo",medicalnfo);
router.post("/additem",additem)
router.get("/stocktable/:id",stocktable);





module.exports = router;