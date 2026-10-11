const librosService = require('../services/librosService');

async function obtenerLibros(req, res) {
    try {
        const libros = await librosService.obtenerLibros(
            req.query.busqueda,
            req.query.categoria
        );

        res.json(libros);
    } catch (error) {
        console.error('Error al consultar libros:', error.message);

        const estado = error.status || 500;

        res.status(estado).json({
            mensaje: estado === 400
                ? error.message
                : 'No se pudieron consultar los libros'
        });
    }
}

module.exports = { obtenerLibros };