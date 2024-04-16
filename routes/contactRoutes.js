const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');


router.get('/allRequestStuContact', contactController.geStudentContact);
router.get('/allRequestExsContact', contactController.geExsContact);
router.put('/activateRequestContact/:id', contactController.activeRequestContact);
router.delete('/deleteRequestContact/:id', contactController.deleteRequestContact);
router.put('/refusedRequestContact/:id', contactController.refusedRequestContact);
router.post('/sendask', contactController.sendAsk);

module.exports = router;