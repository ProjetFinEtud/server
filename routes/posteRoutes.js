const express = require('express');
const router = express.Router();
const posteController = require('../controllers/posteController');


router.get('/allPostes', posteController.getAllPostesUser);

router.get('/allPrePostes', posteController.getAllPrePostes);

router.post('/createPreposte', posteController.createPreposte);

router.put('/updateposte/:id', posteController.updatePosteExStudent);

router.post('/createposte', posteController.createPosteExStudent);

router.put('/updatePreposte/:id', posteController.updatePreposte);

module.exports = router;