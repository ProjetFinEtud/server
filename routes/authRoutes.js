const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.loginUser);
router.post('/createstudent', authController.createUserStudent);
router.post('/createxstudent', authController.createUserExStudent);
router.get('/verifAuth', authController.verifAuth);
router.put('/updatepass', authController.Updatepass);
router.put('/resetpassword', authController.ResetPassword);

module.exports = router;
