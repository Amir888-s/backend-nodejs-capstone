const request = require('supertest');
const app = require('../app');

describe('Second Chance API', () => {
  test('GET /health reports ok', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  test('GET / serves the landing page', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Second Chance');
    expect(response.text).toContain('Get Started');
  });
});
