const authService = require('../services/authService');

async function iniciarSesion(req, res) {
    try {
        const { correo, contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).json({
                mensaje: 'Debes ingresar correo y contraseña'
            });
        }

        const resultado = await authService.iniciarSesion(correo, contrasena);

        res.status(200).json(resultado);

    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);

        res.status(401).json({
            mensaje: 'No se pudo iniciar sesión. Verifica tus credenciales o el estado de tu cuenta.'
        });
    }
}

async function verificarSesion(req, res) {
    try {
        const autorizacion = req.headers.authorization;

        if (!autorizacion || !autorizacion.startsWith('Bearer ')) {
            return res.status(401).json({
                mensaje: 'No has iniciado sesión'
            });
        }

        const token = autorizacion.split(' ')[1];

        const supabase = require('../config/supabase');
        const usuariosRepository = require('../repositories/usuariosRepository');

        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data.user) {
            return res.status(401).json({
                mensaje: 'Sesión inválida o expirada'
            });
        }

        const usuario = await usuariosRepository.buscarPorAuthId(data.user.id);

        if (!usuario || usuario.estado !== 'activo') {
            return res.status(403).json({
                mensaje: 'Usuario sin acceso al sistema'
            });
        }

        res.status(200).json({
            usuario: usuario
        });

    } catch (error) {
        console.error('Error al verificar sesión:', error.message);

        res.status(500).json({
            mensaje: 'Error al verificar la sesión'
        });
    }
}

module.exports = {
    iniciarSesion,
    verificarSesion
};