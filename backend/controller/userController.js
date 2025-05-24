const User = require('../models/User');
const bcrypt = require('bcrypt');
const { uploadImg, deleteImg } = require('../utils/cloudinaryService');
const verifyToken = require('../utils/verifyToken');

// return user from database
exports.getUser = async (req, res) => {
  try{
    const userId = req.userId;
    const foundUser = await User.findById(userId).select('-passwordHash -v');
    res.status(200).json(foundUser);
  }catch(error){
    res.status(400).json({error});
  }
};

// update user information
exports.updateUserInfo = async (req, res) => {
  try {
    const { username, email, firstName, lastName, password, newPassword, profileImage } = req.body;
    const userId = req.userId;
    const passwordMin = 4;

    let imgResult = '';
    const saltRounds = 10;
    let passwordHash = null;

    const foundUser = await User.findById(userId);
    
    if (!foundUser) return res.status(401).json({error: 'user not found'});

    if (password.length > passwordMin && newPassword.length > passwordMin) {
      const correctPassword = await bcrypt.compare(password, foundUser.passwordHash);

      if(!correctPassword) return res.status(401).json("Unauthorized: Incorrect password");

      if(password !== newPassword) passwordHash = await bcrypt.hash(newPassword, saltRounds);
      else passwordHash = foundUser.passwordHash;
    } else {
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