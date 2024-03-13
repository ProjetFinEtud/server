const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddlewareAdmin = require('../middleware/authAdminMiddleware.js');
const {  upload } = require("../function/function.js");

router.get('/allPostes', userController.getAllPostesUser);
router.get('/allRequestStuContact', userController.geStudentContact);
router.get('/allRequestExsContact', userController.geExsContact);
router.get('/allPrePostes', userController.getAllPrePostes);
router.get('/allDomaines', userController.allDomaines);
router.get('/',authMiddlewareAdmin, userController.getAllUsers);
router.post('/createposte', userController.createPosteExStudent);
router.post('/createadmin', authMiddlewareAdmin, userController.createAdmin);
router.post('/sendask', userController.sendAsk);
router.put('/activate',authMiddlewareAdmin, userController.activeUser);
router.put('/updateposte/:id',authMiddlewareAdmin, userController.updatePosteExStudent);
router.get('/userDesactived',authMiddlewareAdmin, userController.usersDesactived);
router.put('/activateRequestContact/:id', userController.activeRequestContact);
router.delete('/deleteRequestContact/:id', userController.deleteRequestContact);

router.delete('/userDeleteHisAccount', userController.userDeletehisAccount);
router.put('/refusedRequestContact/:id', userController.refusedRequestContact);
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

// Autres routes pour les opérations CRUD sur les utilisateurs

module.exports = router;
