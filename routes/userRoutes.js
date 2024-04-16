const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authMiddlewareAdmin = require('../middleware/authAdminMiddleware.js');
const {  upload } = require("../function/function.js");

router.post('/addAcc', userController.creatAcc);

router.post('/createadmin', authMiddlewareAdmin, userController.createAdmin);

router.put('/activate',authMiddlewareAdmin, userController.activeUser);

router.get('/userDesactived',authMiddlewareAdmin, userController.usersDesactived);

router.delete('/userDeleteHisAccount', userController.userDeletehisAccount);

router.put('/changelocalisation', userController.changeLocalisation);

router.put('/activateUsers',authMiddlewareAdmin, userController.activeUsers);

router.get('/usersActived', userController.usersActived);

router.get('/usersExstudentActived', userController.usersExstudentActived);

router.get('/infoStudent', userController.userInfoStudent);

router.get('/infoAdmin', userController.userInfoAdmin);

router.get('/info', userController.userInfoExstudent);

router.put('/updatepass', userController.Updatepass);

router.put('/updatexspass', userController.updateExspassword);

router.delete('/delete', userController.deleteUser);

router.put('/updateinfo',upload.single("exs_photo"), userController.updateExsinfo);

module.exports = router;
