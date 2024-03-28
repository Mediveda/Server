const express = require('express')
const router = express.Router();
const {medicalnfo} = require("../controller/Authentication/medicalinfo");
const {login, signup} = require("../controller/Authentication/auth");
const {additem , stocktable} = require("../controller/Home/Inventoryhealth");
const {exptable,expmed} = require("../controller/Home/exptable");
const {addBill, getBill} = require("../controller/Home/purchase");
const { Search } = require('../controller/Home/PointOfSale');
const {personalInfoUpdate} = require('../controller/Home/update');



router.post("/login", login);
router.post("/signup", signup);
router.post("/medicalinfo",medicalnfo);
router.post("/additem",additem)
router.get("/stocktable/:id",stocktable);
router.get("/exptable/:id",exptable);
router.post("/addbill", addBill);
router.get("/getbill/:id", getBill);
router.delete("/deleteexpmed/:id",expmed)
router.get("/search/:id/:query",Search)
router.put("/:id",personalInfoUpdate);



module.exports = router;