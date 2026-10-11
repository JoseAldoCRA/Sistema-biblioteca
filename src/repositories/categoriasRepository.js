const pool = require('../config/db');

async function obtenerCategorias() {
    const resultado = await pool.query(`
        SELECT id_categoria, nombre
        FROM public.categorias
        ORDER BY nombre
    `);

    return resultado.rows;
}

module.exports = { obtenerCategorias };