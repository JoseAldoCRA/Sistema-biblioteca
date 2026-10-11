const express = require('express');
const path = require('path');

require('dotenv').config();

const librosRoutes = require('./src/routes/librosRoutes');
const categoriasRoutes = require('./src/routes/categoriasRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const puerto = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/estado', (req, res) => {
    res.json({
        mensaje: 'Servidor de biblioteca funcionando'
    });
});

app.use('/api/libros', librosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/auth', authRoutes);

app.listen(puerto, () => {
    console.log(`Servidor iniciado en http://localhost:${puerto}`);
});