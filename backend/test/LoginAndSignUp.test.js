const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('test login', () => {
  test('login', async () => {
    const credentials = {
      username: 'tester',
      name: 'test',
      password: '12345',
      email: 'test@gmail.com'
    }
    await api
      .post('/signup')
      .send(credentials)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  });

  test('login failed', async () => {
    const credentials = {
      username: 'tester',
      name: '',
      password: '12345',
      email: ''
    }
    await api
    .post('/signup')
    .send(credentials)
    .expect(422)
    .expect('Content-Type', /application\/json/)
  })
})