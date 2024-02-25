const express = require('express')
const router = express.Router();
const {medicalnfo} = require("../controller/Authentication/medicalinfo");
const {login, signup} = require("../controller/Authentication/auth");
const {additem , stocktable} = require("../controller/Home/inventoryhealth");
const {exptable} = require("../controller/Home/exptable");
const {addBill, getBill} = require("../controller/Home/purchase");



router.post("/login", login);
router.post("/signup", signup);
router.post("/medicalinfo",medicalnfo);
router.post("/additem",additem)
router.get("/stocktable/:id",stocktable);
router.get("/exptable/:id",exptable);
router.post("/addbill", addBill);
router.get("/getbill/:id", getBill);






module.exports = router;