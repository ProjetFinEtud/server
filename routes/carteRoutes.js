const express = require('express');
const router = express.Router();
const carteController = require('../controllers/carteController');

router.post('/positionusers', carteController.allPosition);

module.exports = router;
