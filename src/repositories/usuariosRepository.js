const pool = require('../config/db');

async function buscarPorAuthId(authUserId) {

    const resultado = await pool.query(
        `SELECT id_usuario, nombre, correo, rol, estado
         FROM usuarios
         WHERE auth_user_id = $1`,
        [authUserId]
    );

    return resultado.rows[0];
}

module.exports = {
    buscarPorAuthId
};