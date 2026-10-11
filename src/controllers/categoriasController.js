const categoriasService = require('../services/categoriasService');

async function obtenerCategorias(req, res) {
    try {
        const categorias = await categoriasService.obtenerCategorias();
        res.json(categorias);
    } catch (error) {
        console.error('Error al consultar categorías:', error.message);

        res.status(500).json({
            mensaje: 'No se pudieron consultar las categorías'
        });
    }
}

module.exports = { obtenerCategorias };