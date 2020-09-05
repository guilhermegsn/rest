const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const login = require('../middleaware/login');

const ProdutosController = require('../controllers/produtos-controller');

router.get('/', ProdutosController.getProutos);

router.post('/', login, ProdutosController.postProdutos);

router.get('/:id_produto', ProdutosController.getUmProduto);

router.patch('/', ProdutosController.updateProduto);

router.delete('/', ProdutosController.deleteProduto);

module.exports = router;

