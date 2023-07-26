require('dotenv').config();
const cloudinaryService = require('cloudinary').v2;

const { PORT, SECRET_KEY, NODE_ENV, MONGODB, MONGODB_TEST, CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;
console.log(process.env.CLOUD_API_KEY);

const databaseURL = NODE_ENV === 'dev' ? MONGODB : MONGODB_TEST;

console.log(CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET)

cloudinaryService.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET 
});

module.exports = {
  PORT,
  SECRET_KEY,
  databaseURL,
  cloudinaryService,
};
