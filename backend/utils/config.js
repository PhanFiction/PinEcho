require('dotenv').config();

const { PORT } = process.env;
const { SECRET_KEY } = process.env

module.exports = {
  PORT,
  SECRET_KEY,
};
