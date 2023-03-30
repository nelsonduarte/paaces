const express = require('express');
const { getOrcidProfile } = require('../controllers/orcidController');

const router = express.Router();

router.get('/:orcidId', getOrcidProfile);

module.exports = router;

