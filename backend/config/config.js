require('dotenv').config();

const { PORT, SECRET_KEY, NODE_ENV, MONGODB, MONGODB_TEST } = process.env;

const databaseURL = NODE_ENV === 'dev' ? MONGODB : MONGODB_TEST;

module.exports = {
  PORT,
  SECRET_KEY,
  databaseURL,
};
