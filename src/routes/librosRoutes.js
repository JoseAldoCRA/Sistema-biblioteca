const express = require('express');
const librosController = require('../controllers/librosController');

const router = express.Router();

router.get('/', librosController.obtenerLibros);

module.exports = router;