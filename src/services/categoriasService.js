const categoriasRepository = require('../repositories/categoriasRepository');

async function obtenerCategorias() {
    return categoriasRepository.obtenerCategorias();
}

module.exports = { obtenerCategorias };