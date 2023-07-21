const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    console.log('errorMessages ', errorMessages, 'body ', req.body);
    return res.status(401).json({
        errors: errorMessages
    });
  };

  const { username, password } = req.body;
  const user = await User.findOne({username});
  console.log(user);
  // compare password from post and db
  const passwordCorrect = (user) === null ? false : await bcrypt.compare(password, user.passwordHash); 

  // if user not found, return error of 401 
  if(!(user && passwordCorrect)) return res.status(401).send({error: "incorrect password"});

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const oneDay = 24 * 60 * 60 * 1000;
  
  try {
    const token = jwt.sign(userForToken, process.env.SECRET);
    res
      .cookie('session_id', token, {maxAge: oneDay})
      .status(200)
      .send({success: 'logged in successfully', redirectURL: '/'});
  }catch(error){
    res.send({error})
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
  const { username, name, password, email } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // create new user and store password hash
  const user = new User({
      username,
      name,
      email,
      passwordHash,
  });

  try{
    await user.save();
    res.status(201)
      .send({success: 'created account successfully', redirectURL: '/'});
  }catch(error){
      res.status(401).send(error);
  };
};

exports.logout = async (req, res) => {
  res.clearCookie('session_id').send({success: 'successly logged out', redirectURL: '/'});
};