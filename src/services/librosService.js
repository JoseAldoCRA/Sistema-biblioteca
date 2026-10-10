const librosRepository = require('../repositories/librosRepository');

async function obtenerLibros() {
    return librosRepository.obtenerLibros();
}

module.exports = { obtenerLibros };