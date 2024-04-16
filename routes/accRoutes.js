const express = require('express');
const router = express.Router();
const accController = require('../controllers/accController');

router.put('/updateAcc/:id', accController.updateAcc);
router.get('/allAcc', accController.getAllAcc);

module.exports = router;