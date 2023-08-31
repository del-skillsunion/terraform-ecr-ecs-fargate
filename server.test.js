const request = require('supertest');
const server = require('./server'); // Import the server

describe('Express App', () => {
  afterAll((done) => {
    server.close(done); // Close the server after all tests
  });

  it('responds with status 200 for the root URL', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
  });

  it('responds with status 200 for the /meetings URL', async () => {
    const response = await request(server).get('/meetings');
    expect(response.status).toBe(200);
  });

  it('responds with status 200 for the /meeting-details URL', async () => {
    const response = await request(server).get('/meeting-details');
    expect(response.status).toBe(200);
  });
});
