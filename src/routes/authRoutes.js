const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { verificarAuth, permitirRoles } = require('../middlewares/verificarAuth');

router.post('/login', authController.iniciarSesion);
router.get('/verificar', authController.verificarSesion);

router.get(
    '/bibliotecario',
    verificarAuth,
    permitirRoles('bibliotecario'),
    (req, res) => {
        res.json({
            mensaje: 'Acceso autorizado al bibliotecario',
            usuario: req.usuario.nombre
        });
    }
);

module.exports = router;