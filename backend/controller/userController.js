const User = require('../models/User');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const { uploadImg } = require('../utils/cloudinaryService');
const verifyToken = require('../utils/verifyToken');

// returns all users from database
exports.getUsers = async (req, res) => {
  const foundUsers = await User.find({});
  res.status(201).send(foundUsers);
};

// return user from database
exports.getUser = async (req, res) => {
  try{
    const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1];
    const decodedToken = verifyToken(cookie);
    const foundUser = await User.findById(decodedToken.id).select('-passwordHash -posts -_id');

    if(!decodedToken) return res.send({error: 'Not authorized'});
    res.status(200).send(foundUser);
  }catch(error){
    res.status(400).send({error});
  }
};

// update user information
exports.updateUserInfo = async (req, res) => {
  const { username, email, name, password, profileImg } = req.body;

  let imgResult = '';
  const saltRounds = 10;
  let passwordHash = null;
  
  if(password !== '' || password.length < 5) {
    passwordHash = await bcrypt.hash(password, saltRounds);
  };

  const token = req.cookie['session_id'];
  const decoded = jwt.verify(token, config.SECRET_KEY);
  if(!decoded) return res.send({error: 'Not authorized'});

  const foundUser = await User.findById({id: decoded.id});
  if(!foundUser) return res.status(401).send({error: 'user not found'});

  // delete profile image if user provides profile img
  if(profileImg.length > 1) {
    await deleteImg(foundUser.imgPath.publicId, 'profile');
    imgResult = await uploadImg(profileImg, 'profile');
  }

  const updatedUserInfo = {
    username,
    name,
    email,
    passwordHash: passwordHash === null ? foundUser.passwordHash : passwordHash,
    profileImage: {
      path: result.url,
      publicId: result.public_id,
    },
  };

  try {
    await User.findByIdAndUpdate({id: decoded.id}, updatedUserInfo);
    res.status(201).send({'success': 'user information updated'});
  }catch(error){
    res.status(401).send({'error': 'could not update user information'});
  };
};