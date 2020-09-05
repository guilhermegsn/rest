const express = require('express');
const router = express.Router();

const carrinho = require('../controllers/carrinho-controller');

router.post('/:idcliente', carrinho.getCarrinho);

router.post('/', carrinho.setCarrinho);

module.exports = router;