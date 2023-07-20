const User = require('../models/User');
const config = require('../config/config');

// update username, name, password, and email,
// get cookie and user that to find the username 
exports.updateUserInfo = (req, res) => {
  const { username, name, email, password } = req.body;
  const cookie = req.cookie;

  const decodedToken = jwt.verify(token, config.SECRET_KEY);
  User.findOneAndUpdate(
    { username: username }, // Filter condition to find the user
    { name: name, email: email, password: password }, // Updated user information
    { new: true } // Set to true to return the updated document instead of the original one
  )
    .then((updatedUser) => {
      if (updatedUser) {
        res.json({ message: "User information updated successfully!", user: updatedUser });
      } else {
        res.status(404).json({ message: "User not found." });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "An error occurred while updating user information.", error: error });
    });
};