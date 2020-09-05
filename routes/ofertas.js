const express = require('express');
const router = express.Router();
const ofertas = require('../controllers/ofertas-controller');

router.get('/', ofertas.getOfertas);

module.exports = router;

