const express = require('express');
const categoriasController = require('../controllers/categoriasController');

const router = express.Router();

router.get('/', categoriasController.obtenerCategorias);

module.exports = router;