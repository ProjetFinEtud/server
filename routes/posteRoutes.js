const express = require('express');
const router = express.Router();
const posteController = require('../controllers/posteController');
const authMiddlewareAdmin = require('../middleware/authAdminMiddleware.js');
const authMiddleware = require('./middleware/authMiddleware.js');


router.get('/allPostes', authMiddleware, posteController.getAllPostesUser);

router.get('/allPrePostes', posteController.getAllPrePostes);

router.post('/createPreposte',authMiddlewareAdmin, posteController.createPreposte);

router.put('/updateposte/:id',authMiddlewareAdmin, posteController.updatePosteExStudent);

router.post('/createposte',authMiddlewareAdmin, posteController.createPosteExStudent);

router.put('/updatePreposte/:id',authMiddlewareAdmin, posteController.updatePreposte);

module.exports = router;