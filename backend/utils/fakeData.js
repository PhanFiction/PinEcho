const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Pin = require('../models/Pin'); // Adjust the path based on your project structure
const User = require('../models/User');
const Comment = require('../models/Comment');
const config = require('../config/config');
const { uploadImg } = require('../utils/cloudinaryService');

const createdUsers = [];
const createdPins = [];
const pinTaken = [];

const numUsers = 15;
const numPins = 30;
const numComments = 20;

mongoose.connect(config.databaseURL);

const generateRandomUserId = () => {
  let randomUser = Math.floor(Math.random() * createdUsers.length);
  const randomUserId = createdUsers[randomUser]._id; // random user is selected
  return randomUserId;
}

const generateRandomPinId = () => {
  let randomPin = Math.floor(Math.random() * createdPins.length);
  const randomPinId = createdPins[randomPin]._id; // random pin is selected
  return randomPinId;
}

const generateRandomSentence = () => {
  const wordCount = faker.number.int({ min: 5, max: 15 });
  
  // Generate an array of words
  const words = Array.from({ length: wordCount }, () => faker.word.words());

  // Join the words into a sentence
  const sentence = words.join(' ');

  // Capitalize the first letter of the sentence
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
};

const seedDataFunction = async () => {
  try {
    await config.cloudinaryService.api.delete_all_resources('profile/');
    await config.cloudinaryService.api.delete_all_resources('posts/');

    // Delete all existing records
    await User.deleteMany({});
    await Pin.deleteMany({});
    await Comment.deleteMany({});

    // Generate fake users
    for (let i = 0; i < numUsers; i++) {
      const result = await uploadImg(faker.image.avatar(), 'profile');
      const fakeUser = {
        username: faker.internet.userName(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        passwordHash: faker.string.alphanumeric(8),
        profileImage: {
          path: result.url,
          publicId: result.public_id,
        },
        comments: [],
      };

      const user = await User.create(fakeUser);
      createdUsers.push(user);
    }

    // Generate fake pins
    for (let i = 0; i < numPins; i++) {
      const result = await uploadImg(faker.image.image(), 'posts');
      const randomUserId = generateRandomUserId();

      const fakePin = {
        title: faker.lorem.words(),
        creator: randomUserId,
        description: faker.lorem.sentence(),
        altText: faker.lorem.words(),
        link: faker.internet.url(),
        category: [faker.word.sample(), faker.word.sample()],
        imgPath: {
          path: result.url,
          publicId: result.public_id,
        },
      };

      const pin = await Pin.create(fakePin);
      createdPins.push(pin);
    }

    // generate fake Comments
    for (let i = 0; i < numComments; i++) {
      const randomSentence = generateRandomSentence();
      const randomUserId = generateRandomUserId();
      const randomPinId = generateRandomPinId();
      const fakeComment = {
        comment: randomSentence,
        creator: randomUserId,
        pin: randomPinId,
      };
      const comment = await Comment.create(fakeComment);
      await User.updateOne({ _id: randomUserId }, { $push: { comments: comment._id } });
    }

    // Update users and push Pin IDs into their saves array
    for (let i = 0; i < createdPins.length;  i++) {
      const randomUserId = generateRandomUserId();
      const pinIds = createdPins.map((pin) => pin._id); // return all pins from createdPins
      if(pinTaken.indexOf(pinIds[i]) === -1) {
        pinTaken.push(pinIds[i]);
        await User.updateOne({ _id: randomUserId }, { $push: { posts: pinIds[i] } });
      }
    }

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};


// Call the seedData function
seedDataFunction();