const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const config = require('../config/config');
const User = require('../models/User');
const fakeService = require('../utils/testHelper');

const api = supertest(app);

beforeAll(async () => {
  await mongoose.connect(config.databaseURL);
  await User.deleteMany();
});

describe('test signup', () => {
  test('signup success', async () => {
    const credentials = {
      email: 'test@gmail.com',
      username: 'tester',
      name: 'tester',
      password: '12345',
    };
    await api
      .post('/signup')
      .send(credentials)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  });

  test('signup failed', async () => {
    const falseCredentials = {
      username: 'tester',
      name: '',
      password: '12345',
      email: ''
    }
    await api
      .post('/signup')
      .send(falseCredentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  });
});

describe('test login', () => {
  beforeEach(async () => {
    await User.insertMany(fakeService.fakeUsers);
  });

  const credentials = {
    username: 'tester2',
    password: '12345',
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
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const userData = await api.get('/users');
    console.log('data ', userData.data);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});