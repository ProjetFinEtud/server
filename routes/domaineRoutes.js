const express = require('express');
const router = express.Router();
const domaineControllers = require('../controllers/domaineControllers');
const {  upload } = require("../function/function.js");

router.get('/alldomaines', domaineControllers.allDomaines);
router.get('/updateDomaine', domaineControllers.updateDomaine);
router.put('/updatedomaines',upload.single("image"), domaineControllers.updatedomaines);
router.post('/adddomaines',upload.single("image"), domaineControllers.adddomaines);


module.exports = router;