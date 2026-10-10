const librosService = require('../services/librosService');

async function obtenerLibros(req, res) {
    try {
        const libros = await librosService.obtenerLibros();
        res.json(libros);
    } catch (error) {
        console.error('Error al consultar libros:', error.message);

        res.status(500).json({
            mensaje: 'No se pudieron consultar los libros'
        });
    }
}

module.exports = { obtenerLibros };