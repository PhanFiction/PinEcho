const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const config = require('../config/config');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const api = supertest(app);

beforeAll(async () => {
  await mongoose.connect(config.databaseURL);
  await User.deleteMany({});
});

describe('test signup', () => {
  test('signup success', async () => {
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

  test('signup failed missing username', async () => {
    const credentials = {
      username: '',
      name: 'tester',
      password: '12345',
      email: 'tester@gmail.com'
    };
    await api
      .post('/signup')
      .send(credentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  });

  test('sign up failed missing name', async () => {
    const credentials = {
      username: 'tester',
      name: '',
      password: '12345',
      email: 'tester@gmail.com'
    }
    await api
      .post('/signup')
      .send(credentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  });

  test('signup failed missing password', async () => {
    const credentials = {
      username: 'tester',
      name: 'tester',
      password: '',
      email: 'tester@gmail.com'
    };
    await api
      .post('/signup')
      .send(credentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  });

  test('signup failed missing email', async () => {
    const credentials = {
      username: 'tester',
      name: 'tester',
      password: '12345',
      email: ''
    };
    await api
      .post('/signup')
      .send(credentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  });
});

describe('test login', () => {
  beforeEach(async () => {
    const credentials = {
      username: 'tester',
      name: 'test',
      password: '12345',
      email: 'test@gmail.com'
    };
    await api.post('/signup')
  });

  const credentials = {
    username: 'tester2',
    password: '12345',
  };

  test('login success', async () => {
    const credentials = {
      username: 'tester',
      name: 'test',
      password: '12345',
      email: 'test@gmail.com'
    };
    await api
      .post('/login')
      .send(credentials)
      .expect(200)
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
      .expect(401)
      .expect('Content-Type', /application\/json/)
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});