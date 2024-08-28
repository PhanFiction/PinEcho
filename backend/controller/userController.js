const User = require('../models/User');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const { uploadImg, deleteImg } = require('../utils/cloudinaryService');
const verifyToken = require('../utils/verifyToken');

// returns all users from database
exports.getUsers = async (req, res) => {
  const foundUsers = await User.find({});
  res.status(201).json(foundUsers);
};

// return user from database
exports.getUser = async (req, res) => {
  try{
    const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1];
    const decodedToken = verifyToken(cookie);
    if(!decodedToken) return res.status(401).json({error: 'Not authorized'});
    const foundUser = await User.findById(decodedToken.id).select('-passwordHash -v');
    res.status(200).json(foundUser);
  }catch(error){
    res.status(400).json({error});
  }
};

// update user information
exports.updateUserInfo = async (req, res) => {
  try {
    const { username, email, firstName, lastName, password, newPassword, profileImage } = req.body;
    const passwordMin = 4;

    let imgResult = '';
    const saltRounds = 10;
    let passwordHash = null;
    
    if(!req.headers.cookie) return res.json({error: 'Not authorized'});
    
    const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1];
    const decodedToken = verifyToken(cookie);
    if(!decodedToken) return res.json({error: 'Not authorized'});

    const foundUser = await User.findById(decodedToken.id);
    if(!foundUser) return res.status(401).json({error: 'user not found'});

    if(password.length > passwordMin && newPassword.length > passwordMin) {
      const correctPassword = await bcrypt.compare(password, foundUser.passwordHash);

      if(!correctPassword) return res.status(401).json("Unauthorized: Incorrect password");

      if(password !== newPassword) passwordHash = await bcrypt.hash(newPassword, saltRounds);
      else passwordHash = foundUser.passwordHash;
    }else{
      return res.status(401).json("Unauthorized: Incorrect password");
    }

    // delete profile image if it exist
    if(profileImage && foundUser.imgPath) {
      await deleteImg(foundUser.imgPath.publicId, 'profile');
    }
    imgResult = await uploadImg(profileImage, 'profile');

    const updatedUserInfo = {
      username,
      firstName,
      lastName,
      email,
      passwordHash: passwordHash,
      profileImage: {
        path: imgResult.url,
        publicId: imgResult.public_id,
      },
    };

    await User.findByIdAndUpdate(decodedToken.id, updatedUserInfo, {new:true});
    res.status(201).json({'success': 'user information updated'});
  }catch(error){
    res.status(401).json({'error': 'could not update user information'});
  };
};