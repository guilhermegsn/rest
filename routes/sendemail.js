const express = require('express');
const router = express.Router();
const sendemail = require('../controllers/sendemail-controller');

router.post('/', sendemail.SendEmail);

module.exports = router;

