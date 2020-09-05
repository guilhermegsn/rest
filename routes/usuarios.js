const express = require('express');
const router = express.Router();


const usuariosController = require('../controllers/usuario_controller');

router.post('/cadastro', usuariosController.cadUsuario);

router.post('/login', usuariosController.login)

module.exports = router;