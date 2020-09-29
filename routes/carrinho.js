const express = require('express');
const router = express.Router();
const login = require('../middleaware/login');

const carrinho = require('../controllers/carrinho-controller');

router.post('/:idcliente', carrinho.getCarrinho);

router.post('/', carrinho.setCarrinho);

router.post('/decproduto', login, carrinho.decProduto);

module.exports = router;