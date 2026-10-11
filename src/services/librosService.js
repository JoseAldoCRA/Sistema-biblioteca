const librosRepository = require('../repositories/librosRepository');

async function obtenerLibros(busqueda = '', categoria = '') {
    if (typeof busqueda !== 'string' || typeof categoria !== 'string') {
        const error = new Error('Los filtros no son válidos');
        error.status = 400;
        throw error;
    }

    let idCategoria = null;

    if (categoria !== '') {
        idCategoria = Number(categoria);

        if (!Number.isInteger(idCategoria) ||
            idCategoria <= 0 ||
            idCategoria > 2147483647) {
            const error = new Error('La categoría no es válida');
            error.status = 400;
            throw error;
        }
    }

    return librosRepository.obtenerLibros(busqueda.trim(), idCategoria);
}

module.exports = { obtenerLibros };