const config = require('../config/config');

const profilePath = '/pinEcho/profile';
const postPath = '/pinEcho/posts';

// Default image size
const transformation = {
  width: 500, 
  height: 400,
  crop: "scale",
};

/**
 * Uploads an image to Cloudinary with an optional folder path.
 * 
 * @param {string} imgURL - The URL of the image to be uploaded.
 * @param {string} folderName - The folder name where the image will be stored.
 *                              Accepted values: "profile" or "posts".
 * @returns {Object} - The result of the Cloudinary upload operation.
 */
exports.uploadImg = async (imgURL, folderName) => {
  const folderPath = folderName === 'profile' ? profilePath: postPath;
  const imgResult = await config.cloudinaryService.uploader.upload(imgURL, {
    folder: folderPath,
    transformation,
  });
  return imgResult;
}

exports.deleteImg = async(imgId, folderName) => {
  const folderPath = folderName === 'profile' ? profilePath: postPath;
  await config.cloudinaryService.uploader.destroy(`${folderPath}/${imgId}`);
}