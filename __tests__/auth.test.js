const supertest = require('supertest');
const { db } = require('../src/models/index');
const { server } = require('../src/server');
const { password } = require('pg/lib/defaults');

const request = supertest(server);

beforeAll(async () => {
  await db.sync();
});


afterAll(async () => {
  db.drop();
});



describe('Auth', () => {

  it('signup works with basic auth', async () => {
    const response = await request.post('/signup').send({
      username: 'test',
      password: 'testPassword',
    });

    expect(response.status).toBe(201);

  });

  it('signin works with bearer auth', async () => {
    const user = await request.post('/signup').send({
      username: 'test',
      password: 'password',
      role: 'admin',
    });

    const response = await request.post('/signin').send({
      username: 'test',
      password: 'password',
    });

    expect(response.status).toBe(200);
  });

});