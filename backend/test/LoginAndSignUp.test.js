const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const config = require('../config/config');
const User = require('../models/User');

const api = supertest(app);

beforeAll(async () => {
  mongoose.connect(config.databaseURL);
  await User.deleteMany({});
});

describe('test signup', () => {
  test('signup', async () => {
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

  test('signup failed', async () => {
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
  });
});

describe('test login', () => {
  const credentials = {
    username: 'tester',
    name: 'test',
    password: 'test',
  };

  test('login success', async () => {
    await api
      .post('/login')
      .send(credentials)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  });

  test('test login fail', async () => {
    const falseCredentials = {
      username: 'tes23r',
      password: '4123',
    }
    await api
      .post('/login')
      .send(falseCredentials)
      .expect(422)
      .expect('Content-Type', /application\/json/)
  });
});

afterAll(() => {
  mongoose.disconnect();
});