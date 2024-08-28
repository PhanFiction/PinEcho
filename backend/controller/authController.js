const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(401).json({
        errors: errorMessages
    });
  };

  const { username, password } = req.body;
  const foundUser = await User.findOne({username});
  // compare password from post and db
  const passwordCorrect = (foundUser) === null ? false : await bcrypt.compare(password, foundUser.passwordHash); 

  // if user not found, return error of 401 
  if(!(foundUser && passwordCorrect)) return res.status(401).json({error: "incorrect information"});

  const userForToken = {
    username: foundUser.username,
    id: foundUser._id,
  };
  const oneDay = 24 * 60 * 60 * 1000;
  
  const user = {
    username: foundUser.username,
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
    profileImage: foundUser.profileImage,
  }
  
  try {
    const token = jwt.sign(userForToken, config.SECRET_KEY);
    
    res
      .cookie('authToken', token, {maxAge: oneDay}, { httpOnly: true })
      .status(201)
      .json({success: 'logged in successfully', redirectURL: '/', user});
  }catch(error){
    res.json({'error': error})
  }
};

exports.signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(401).json({
      errors: errorMessages
    });
  }
  const { username, firstName, lastName, password, email } = req.body;
  
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // create new user and store password hash
  const user = new User({
    username,
    firstName,
    lastName,
    email,
    passwordHash,
  });

  try{
    await user.save();
    res
      .status(201)
      .json({success: 'created account successfully', redirectURL: '/login'});
  }catch(error){
      res.status(401).json(error);
  };
};

exports.logout = async (req, res) => {
  res.clearCookie('authToken');
  res.json({success: 'successly logged out', redirectURL: '/'});
};

exports.checkAuthenticatiion = async (req, res) => {
  if (req.headers.cookie && req.headers.cookie.includes('authToken')) {
    res.status(200).json({message: "Authorized"});
  } else {
    res.status(401).json({message: "Not Authorized"});
  }
}