// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Cargar variables de entorno
dotenv.config({ path: './.env' }); // Especifica la ruta al .env

// Conectar a la base de datos
connectDB();

// Rutas (después de la conexión a DB)
const items = require('./src/routes/items');

const app = express();

// Body parser
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Rutas de la API
app.get('/api/health', (req, res) => res.json({ status: 'UP' })); // Health check
app.use('/api/items', items); // Montar rutas de items

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
);

// Manejar rechazos de promesas no controlados
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`);
  // Cerrar servidor y salir
  server.close(() => process.exit(1));
});