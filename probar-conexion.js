const pool = require('./src/config/db');

async function probarConexion() {
    try {
        const resultado = await pool.query(
            'SELECT id_categoria, nombre FROM public.categorias ORDER BY id_categoria'
        );

        console.log('Conexión con SupaBase exitosa');
        console.table(resultado.rows);
    } catch (error) {
        console.error('No se pudo conectar:', error.message);
    } finally {
        await pool.end();
    }
}

probarConexion();