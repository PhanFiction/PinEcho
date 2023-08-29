const Pin = require('../models/Pin');
const User = require('../models/User');
const Comment = require('../models/Comment');
const config = require('../config/config');
const verifyToken = require('../utils/verifyToken');
const convertIdToString = require('../utils/idToString');

// returns all pins
exports.getAllPins = async (req, res) => {
  const pins = await Pins.find({});
  res.status(200).send({data: pins});
};

// return a single pin
exports.getSinglePin = async (req, res) => {
  const pinId = req.params.id;
  const foundPin = await Pin.findById(pinId);
  res.status(200).send(foundPin);
};

// store to cloudinary and return path
exports.createPin = async (req, res) => {
  const { imgURL, title, description, altText, link, category } = req.body;
  const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1]; // split and return cookie
  const decodedToken = verifyToken(cookie);

  const foundUser = await User.findById(decodedToken.id);

  if(imgURL === "") return res.status(400).send({error: "missing image"});
  if(!foundUser) return res.status(401).send({error: 'User not found'});
  const transformation = {
    width: 500, 
    height: 400,
    crop: "scale",
  };

  // store to cloudinary
  const result = await config.cloudinaryService.uploader.upload(imgURL,transformation);

  // create new pin
  const newPin = new Pin({
    title,
    description,
    creator: foundUser._id,
    altText,
    link,
    category,
    imgPath: {
      path: result.url,
      publicId: result.public_id,
    },
    comments: [],
    likes: 0,
  });

    const savedPin = await newPin.save();
    const pinStringId = convertIdToString(savedPin._id);
    foundUser.posts.push(pinStringId);
    await foundUser.save();
    res.status(201).send({success: 'pin created', pinId: pinStringId});
};

// update the pin
exports.updatePin = async (req, res) => {
  const { title, description, altText, link, category } = req.body;
  const pinId = req.params.id;
  const foundPin = await Pin.findById(pinId);

  if(!foundPin) return res.status(401).send({'Pin error': 'Pin not found'});

  const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1]; // split and return cookie
  const decodedToken = verifyToken(cookie);

  if(!decodedToken) return res.status(401).send({error: 'Not authorized'});
  if(foundPin.creator != decodedToken.id) return res.status(401).send({error: 'Not authorized'});

  try{
    foundPin.title = title === '' ? foundPin.title : title;
    foundPin.description = description === '' ? foundPin.description : description;
    foundPin.altText = altText === '' ? foundPin.altText : altText;
    foundPin.link = link === '' ? foundPin.link : link;
    foundPin.category = category.length < 1 ? foundPin.category : category;

    await foundPin.save();
    res.status(200).send({success: 'Pin has been updated'});
  }catch(error){
    res.status(401).send({error});
  }
};

exports.deletePin = async (req, res) => {
  const pinId = req.params.id;
  const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1]; // split and return cookie

  const decodedToken = verifyToken(cookie); // verify token

  const foundPin = await Pin.findById(pinId);
  const foundUser = await User.findById(decodedToken.id);
 
  if(!decodedToken) return res.status(401).send({error: 'Not authorized'});
  if(!foundPin) return res.status(401).send({error: 'Pin is not available'});  
  if(!foundUser) return res.status(401).send({error: 'User not found'});
  if(foundPin.creator != decodedToken.id) return res.status(401).send({error: 'Not authorized'});

  try{
    await config.cloudinaryService.uploader.destroy(foundPin.imgPath.publicId);
    await Pin.findByIdAndDelete(pinId);

    foundUser.posts.map(i => i.id !== pinId);
    await foundUser.save();
    res.status(200).send({'success': 'pin deleted'});
  }catch(error){
    res.status(400).send({error});
  }
};

exports.updateLike = async (req, res) => {
  const pinId = req.params.id;
  const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1]; // split and return cookie
  const decodedToken = verifyToken(cookie);

  if(!decodedToken ) return res.status(401).send({error: 'Not authorized'});
  if(!foundPin) return res.status(401).send({error: 'Pin is not available'});  
  if(!foundUser) return res.status(401).send({error: 'User not found'});

  const foundPin = await Pin.findById(pinId);
  const foundUser = await User.findById(decodedToken.id);
  
  try {
    if(foundPin.likes.includes(decodedToken.id) === true) {
      foundPin.likes = foundPin.likes - 1;
      foundUser.likes = foundUser.likes.map(item => item.id !== decodedToken.id);
    }else{
      foundPin.likes = foundPin.likes + 1;
      foundUser.likes = foundUser.likes.push(pinId);
    }
    await foundPin.save();
    await foundUser.save();
    const pinLikes = foundPin.likes.length;
    res.status(201).send({'successfully updated likes': pinLikes})
  }catch(error){
    res.status(401).send({error});
  }
};

exports.createComment = async (req, res) => {
  const pinId = req.params.id;
  const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1]; // split and return cookie
  const decodedToken = verifyToken(cookie);
  const comment = req.body;

  if(!decodedToken) return res.status(401).send({error: 'Not authorized'});
  if(!foundPin) return res.status(401).send({error: 'Pin is not available'}); 
  if(!foundUser) return res.status(401).send({error: 'User not found'});

  const foundPin = await Pin.findById(pinId);
  const foundUser = await User.findById(decodedToken.id);

  const newComment = {
    creator: decodedToken.id,
    comment,
    pin: pinId,
  }

  try{
    const savedComment = new Comment(newComment);
    await savedComment.save();

    const commetId = convertIdToString(savedComment._id);

    // push the id of the comment into Pin and User
    foundPin.comments.push(commetId);
    foundUser.comments.push(commetId);

    // save the newly added id to database
    await foundUser.save();
    await foundPin.save();
  }catch(error){
    res.status(401).send({error});
  }
};

// pin/:id/comment/:id
exports.updateComment = async (req, res) => {
  const commentId = req.params.id;
  const comment = req.body;
  const foundComment = await Comment.findById(commentId);

  const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1]; // split and return cookie
  const decodedToken = verifyToken(cookie);

  if(!decodedToken) return res.status(401).send({error: 'Not authorized'});
  if(decodedToken.id !== foundComment.creator.id) return res.status(401).send({error: 'Not authorized'});

  try{
    foundComment.comment = comment;
    await foundComment.save();
    res.status(201).send({'success': 'updated comment'});
  }catch(error){
    res.status(401).send({error});
  }
};

exports.deleteComment = async (req, res) => {
  const commentId = req.params.id;
  const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1]; // split and return cookie
  const decodedToken = verifyToken(cookie);
  const foundComment = await Comment.findById(commentId);
  const foundPin = await Pin.findById(foundComment.pin.id);

  if(!decodedToken) return res.status(401).send({error: 'Not authorized'});
  if(decodedToken.id !== foundComment.creator.id) return res.status(401).send({error: 'Not authorized'});
  if(!foundPin) return res.status(401).send({error: 'Pin not found'});
  try{
    foundPin.comments = foundPin.comments.map(item => item !== commentId);
    foundUser.comments = foundUser.comments.map(item => item !== commentId);

    await foundPin.save();
    await foundUser.save();
    await Comment.findByIdAndDelete(commentId);
    res.status(201).send({'success': 'comment deleted'});
  }catch(error){
    res.status(401).send({error});
  }
};