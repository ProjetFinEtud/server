const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.put('/activate', userController.activeUser);
router.get('/usersActived', userController.usersActived);
router.put('/updatepass', userController.Updatepass);
router.delete('/delete', userController.deleteUser);

module.exports = router;
