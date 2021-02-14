const express = require('express');
const router = express.Router();
const login = require('../middleaware/login');

const carrinhoController = require('../controllers/carrinho-controller');

router.post('/getcarrinho', login, carrinhoController.getCarrinho);

router.post('/decproduto', login, carrinhoController.decProduto);

router.post('/addproduto', carrinhoController.setCarrinho);

router.post('/incproduto', login, carrinhoController.incProduto);

router.delete('/deleteproduto', login, carrinhoController.deleteProduto);

module.exports = router;