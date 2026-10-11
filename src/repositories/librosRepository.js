const pool = require('../config/db');

async function obtenerLibros(busqueda = '', idCategoria = null) {
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
        WHERE (
            $1 = ''
            OR POSITION(LOWER($1) IN LOWER(l.titulo)) > 0
            OR POSITION(LOWER($1) IN LOWER(l.autor)) > 0
            OR POSITION(LOWER($1) IN LOWER(l.isbn)) > 0
        )
        AND ($2::integer IS NULL OR l.id_categoria = $2)
        GROUP BY
            l.id_libro, l.isbn, l.titulo, l.autor, c.nombre
        ORDER BY l.titulo
    `, [busqueda, idCategoria]);

    return resultado.rows;
}

module.exports = { obtenerLibros };