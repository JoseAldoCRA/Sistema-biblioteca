const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
        ca: fs.readFileSync(
            path.join(__dirname, 'supabase-ca.crt'),
            'utf8'
        ),
        rejectUnauthorized: true
    },
    connectionTimeoutMillis: 10000
});

pool.on('error', (error) => {
    console.error('Error de conexión:', error.message);
});

module.exports = pool;