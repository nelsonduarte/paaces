const express = require('express');
const router = express.Router();
const cienciaVitaeController = require('../controllers/cienciaVitaeController');

router.get('/cv', cienciaVitaeController.getUserInfo);

module.exports = router;
