const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const config = require('../config/config');
const User = require('../models/User');
const Pin = require('../models/Pin');

const api = supertest(app);

const credentials = {
  username: 'tester',
  password: '12345',
};

beforeAll(async ()=> {
  await mongoose.connect(config.databaseURL);
  await Pin.deleteMany({});
  await User.deleteMany({});
  const credentials = {
    username: 'tester',
    name: 'test',
    password: '12345',
    email: 'test@gmail.com'
  };
  await api.post('/signup')
    .send(credentials)
});

// Create Pin
describe('Pin creation', ()=> {
  test('pin created', async ()=> {
    const newPin = {
      title: 'New Pin',
      description: 'Pin description',
      link: 'random url',
      category: 'food',
    };

    const loggedUser = await api
      .post('/login')
      .send(credentials)

    const authToken = loggedUser.header['set-cookie'][0];

    console.log('headers ', authToken);

    await api
      .post('/pin/create-new-pin')
      .send(newPin)
      .set('Cookie', [authToken])
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});