const express = require('express');
const router = express.Router();
const login = require('../middleaware/login');

const usuariosController = require('../controllers/usuario_controller');

router.post('/cadastro', usuariosController.cadUsuario);

router.post('/login', usuariosController.login)

router.post('/', login, usuariosController.getUsuario);


module.exports = router;