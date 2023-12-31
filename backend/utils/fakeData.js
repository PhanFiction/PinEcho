const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Pin = require('../models/Pin'); // Adjust the path based on your project structure
const User = require('../models/User');
const config = require('../config/config');

mongoose.connect(config.databaseURL);

const seedDataFunction = async () => {
  try {
    // Delete all existing records
    await User.deleteMany({});
    await Pin.deleteMany({});

    const createdPins = [];

    // Generate fake users
    for (let i = 0; i < 5; i++) {
      const fakeUser = {
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        passwordHash: faker.random.alphaNumeric(8),
        profileImage: faker.image.avatar(),
      };

      const user = await User.create(fakeUser);
      createdPins.push(user);
    }

    // Generate fake pins
    for (let i = 0; i < 5; i++) {
      const fakePin = {
        title: faker.lorem.words(),
        creator: createdPins[i % createdPins.length]._id,
        description: faker.lorem.sentence(),
        altText: faker.lorem.words(),
        link: faker.internet.url(),
        category: [faker.random.word(), faker.random.word()],
        imgPath: {
          path: faker.image.imageUrl(),
          publicId: faker.random.alphaNumeric(10),
        },
      };

      const pin = await Pin.create(fakePin);
      createdPins.push(pin);
    }

    // Update users and push Pin IDs into their saves array
    for (let i = 0; i < 5; i++) {
      const userId = createdPins[i]._id;
      const pinIds = createdPins.map((pin) => pin._id);

      await User.updateOne({ _id: userId }, { $push: { saves: { $each: pinIds } } });
    }

    console.log('Data seeded successfully.');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};

// Call the seedData function
seedDataFunction();


/* // Generate fake users
for (let i = 0; i < 5; i++) { // Generate 5 fake users as an example
  const fakeUser = {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    passwordHash: faker.random.alphaNumeric(8),
    profileImage: faker.image.avatar(),
  };

  seedData.push(fakeUser);
}
  
// Generate fake pins
for (let i = 0; i < 5; i++) { // Generate 10 fake pins as an example
  const fakePin = {
    title: faker.lorem.words(),
    creator: seedData[i % seedData.length]._id, // Use the generated user's ObjectId
    description: faker.lorem.sentence(),
    altText: faker.lorem.words(),
    link: faker.internet.url(),
    category: [faker.random.word(), faker.random.word()],
    imgPath: {
      path: faker.image.imageUrl(),
      publicId: faker.random.alphaNumeric(10),
    },
  };

  seedData.push(fakePin);
}

// Update users and push Pin IDs into their saves array
for (let i = 0; i < 5; i++) {
  const userId = seedData[i]._id;
  const pinIds = createdPins.map((pin) => pin._id);

  await User.updateOne({ _id: userId }, { $push: { saves: { $each: pinIds } } });
}

console.log(seedData);

async function seedDatabase() {
  try {
    // Insert fake users
    const users = await User.insertMany(seedData.slice(0, 5));

    // Map user _ids to be used as creators in fake pins
    const userIds = users.map(user => user._id);

    // Update creator field in fake pins with user _ids
    const fakePins = seedData.slice(5).map((pin, index) => ({
      ...pin,
      creator: userIds[index % userIds.length],
    }));

    // Insert fake pins
    await Pin.insertMany(fakePins);

    console.log('Data seeding successful');
  } catch (error) {
    console.error('Data seeding failed', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase(); */