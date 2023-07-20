const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  const { username, password } = req.body;
  const user = await User.findOne({username});

  // compare password from post and db
  const passwordCorrect = (user) === null ? false : await bcrypt.compare(password, user.passwordHash); 

  // if user not found, return error of 401 
  if(!(user && passwordCorrect)) return res.status(401).send({error: "incorrect password"});

  const userForToken = {
    username: user.username,
    id: user._id,
  };
  
  // sign token
  const token = jwt.sign(userForToken, process.env.SECRET);
  res
    .status(200)
    .send({token, username: user.username, name: user.name, id: user._id})
};

exports.signUp = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  const { username, name, password, email } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // create new user and store password hash
  const user = new User({
      username,
      name,
      email,
      passwordHash: passwordHash,
  });

  try{
    const savedUser = await user.save();
    res.status(201).send({"success": 'created account successfully'});
    res.json(savedUser);
  }catch(error){
      res.status(400).send(error);
  };
};

exports.getUsers = async (req, res) => {
  const foundUsers = await User.find({});
  res.status(200).send(foundUsers);
};