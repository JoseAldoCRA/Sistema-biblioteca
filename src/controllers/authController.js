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

module.exports = {
    iniciarSesion
};  