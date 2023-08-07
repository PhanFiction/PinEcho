const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// returns all users from database
exports.getUsers = async (req, res) => {
  const foundUsers = await User.find({}, {'Username': 1, 'passwordHash': 0, '_id': 0, 'email': 0, 'name': 1});
  res.status(201).send(foundUsers);
};

// return user from database
exports.getUser = async (req, res) => {
  const token = req.cookie['session_id'];
  try{
    const decoded = jwt.verify(token, config.SECRET_KEY);
    if(!decoded) return res.send({error: 'Not authorized'});
    const foundUser = await User.findById({id: decoded.id}, {'Username': 1, 'passwordHash': 0, '_id': 0, 'email': 1, 'name': 1});
    res.status(200).send(foundUser);
  }catch(error){
    res.status(400).send({error});
  }
};

// update user information
exports.updateUserInfo = async (req, res) => {
  const { username, email, name, password } = req.body;

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
  const updatedUserInfo = {
    username,
    name,
    email,
    passwordHash: passwordHash === null ? foundUser.passwordHash : passwordHash
  };

  try {
    await User.findByIdAndUpdate({id: decoded.id}, updatedUserInfo);
    res.status(201).send({'success': 'user information updated'});
  }catch(error){
    res.status(401).send({'error': 'could not update user information'});
  };
};