const pool = require('../config/db');

async function obtenerLibros() {
    const resultado = await pool.query(`
        SELECT
            l.id_libro,
            l.isbn,
            l.titulo,
            l.autor,
            c.nombre AS categoria,
            COUNT(e.id_ejemplar)
                FILTER (WHERE e.estado <> 'baja') AS total_ejemplares,
            COUNT(e.id_ejemplar)
                FILTER (WHERE e.estado = 'disponible') AS disponibles
        FROM public.libros l
        JOIN public.categorias c
            ON c.id_categoria = l.id_categoria
        LEFT JOIN public.ejemplares e
            ON e.id_libro = l.id_libro
        GROUP BY
            l.id_libro, l.isbn, l.titulo, l.autor, c.nombre
        ORDER BY l.titulo
    `);

    return resultado.rows;
}

module.exports = { obtenerLibros };