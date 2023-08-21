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

const newPinData = {
  title: 'New Pin',
  description: 'Pin description',
  link: 'random url',
  category: 'food',
  imgURL: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
};

const newEmptyPinData = {
  title: "",
  description: "",
  link: "",
  imgURL: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
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
    const newPinData = {
      title: 'New Pin',
      description: 'Pin description',
      link: 'random url',
      category: 'food',
      imgURL: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
    };

    const loggedUser = await api
      .post('/login')
      .send(credentials)
    const authToken = loggedUser.header['set-cookie'][0];

    // create pin
    const res = await api
      .post('/pin/create-new-pin')
      .send(newPinData)
      .set('Cookie', authToken)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    // Check if the response contains the created pin
    const createdPin = await Pin.findById(res.body.pinId);
    expect(createdPin.title).toBe(newPinData.title);
    expect(createdPin.description).toBe(newPinData.description);
  });

  test('failed to create pin', async () => {

    const loggedUser = await api
      .post('/login')
      .send(credentials)
    const authToken = loggedUser.header['set-cookie'][0];

    // create pin
    await api
      .post('/pin/create-new-pin')
      .send(newPinData)
      .set('Cookie', authToken)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

describe('Test update pin', ()=> {
  test('update pin', async ()=>{

    const loggedUser = await api
      .post('/login')
      .send(credentials)
    const authToken = loggedUser.header['set-cookie'][0];

    // create pin
    const res = await api
      .post('/pin/create-new-pin')
      .send(newEmptyPinData)
      .set('Cookie', authToken)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const pinId = res.body.pinId;

    const newUpdatedPinData = {
      title: 'New Pin',
      description: 'Pin description',
      link: 'random url',
      category: "food",
    }

    await api
      .put(`/pin/${pinId}`)
      .send(newUpdatedPinData)
      .set('Cookie', authToken)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const createdPin = await Pin.findById(pinId);
    expect(createdPin.title).toBe(newUpdatedPinData.title);
    expect(createdPin.description).toBe(newUpdatedPinData.description);
  });
});

describe('Test pin deletion', ()=> {
  test('test pin deletion', async ()=> {

    const loggedUser = await api
      .post('/login')
      .send(credentials)
    const authToken = loggedUser.header['set-cookie'][0];

    // create pin
    const res = await api
      .post('/pin/create-new-pin')
      .send(newPinData)
      .set('Cookie', authToken)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const pinId = res.body.pinId;
    await api
      .delete(`/pin/${pinId}`)
      .set('Cookie', authToken)
      .expect(200)
  })
});

afterAll(async () => {
  await mongoose.disconnect();
});