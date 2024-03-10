const express = require('express');
const router = express.Router();
const masterControllers = require('../controllers/masterController');

router.get('/allmaster', masterControllers.allMaster);
router.put('/updatemaster', masterControllers.updateMaster);
router.post('/addmaster', masterControllers.addMaster);

module.exports = router;