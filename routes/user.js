const express = require('express')
const router = express.Router();
const {medicalnfo} = require("../controller/Authentication/medicalinfo");
const {login, signup} = require("../controller/Authentication/auth");
const {additem , stocktable} = require("../controller/Home/inventoryhealth");
const {exptable} = require("../controller/Home/exptable");



router.post("/login", login);
router.post("/signup", signup);
router.post("/medicalinfo",medicalnfo);
router.post("/additem",additem)
router.get("/stocktable/:id",stocktable);
router.get("/exptable/:id",exptable);





module.exports = router;