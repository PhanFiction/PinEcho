const User = require('../models/User');

exports.getUsers = async (req, res) => {
  const foundUsers = await User.find({});
  res.status(201).send(foundUsers);
};