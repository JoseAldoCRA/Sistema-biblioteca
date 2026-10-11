const supabase = require('../config/supabase');
const usuariosRepository = require('../repositories/usuariosRepository');

async function verificarAuth(req, res, next) {
    try {
        const autorizacion = req.headers.authorization;

        if (!autorizacion || !autorizacion.startsWith('Bearer ')) {
            return res.status(401).json({
                mensaje: 'Debes iniciar sesión'
            });
        }

        const token = autorizacion.split(' ')[1];

        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data.user) {
            return res.status(401).json({
                mensaje: 'Sesión inválida o expirada'
            });
        }

        const usuario = await usuariosRepository.buscarPorAuthId(data.user.id);

        if (!usuario || usuario.estado !== 'activo') {
            return res.status(403).json({
                mensaje: 'Usuario sin acceso'
            });
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        console.error('Error de autenticación:', error.message);

        res.status(500).json({
            mensaje: 'Error al verificar la autenticación'
        });
    }
}

function permitirRoles(...rolesPermitidos) {
    return function(req, res, next) {
        if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({
                mensaje: 'No tienes permisos para realizar esta operación'
            });
        }

        next();
    };
}

module.exports = {
    verificarAuth,
    permitirRoles
};