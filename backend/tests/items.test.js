// backend/tests/items.test.js
const request = require('supertest');
// Necesitarías exportar tu app de server.js o crear una app de test
// Asumiendo que exportas la app desde server.js (modifica server.js para exportar `app`)
// const app = require('../server'); // Ajusta la ruta
// Por simplicidad aquí, asumiremos que corre en un puerto conocido
const API_URL = 'http://localhost:5000'; // O el puerto que uses para test

// (Nota: Integrar con MongoDB in-memory o un servicio DB es más complejo,
// esto es un test básico de endpoint sin conexión real a DB configurada aquí)

describe('Items API', () => {
  it('GET /api/health - should return status UP', async () => {
    const res = await request(API_URL).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'UP');
  });

  // Test básico para GET /api/items (requiere DB corriendo y poblada o mock)
  it('GET /api/items - should return items', async () => {
    // Este test fallará si la DB no está conectada y accesible
    // En un pipeline CI, usarías el servicio 'mongo' definido en Actions
    const res = await request(API_URL).get('/api/items');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

   it('POST /api/items - should create an item', async () => {
        const newItem = { name: 'Test Item from Jest', quantity: 5 };
        const res = await request(API_URL)
            .post('/api/items')
            .send(newItem);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body.data).toHaveProperty('name', newItem.name);
        expect(res.body.data).toHaveProperty('_id'); // Verificar que se asignó un ID
        // Podrías añadir un GET by ID o DELETE para limpiar después
   });
});