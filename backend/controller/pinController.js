const Pin = require('../models/Pin');
const User = require('../models/User');
const Comment = require('../models/Comment');
const config = require('../config/config');
const verifyToken = require('../utils/verifyToken');

// store to cloudinary and return path
exports.createPin = async (req, res) => {
  const { title, description, altText, link, category } = req.body;
  const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1]; // split and return cookie
  const decoded = verifyToken(cookie);
  
  console.log('decoded token ', decoded);

  const foundUser = await User.findById(decoded.id);
  if(!foundUser) return res.status(401).send({error: 'User not found'});

  try{
    // store to cloudinary
    const result = await config.cloudinaryService.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
      { 
        public_id: "olympic_flag",
        crop: "fill",
        width: 250,
        height: 250,
      },
    );

    // create new pin
    const newPin = new Pin({
      title,
      description,
      creator: foundUser._id,
      altText,
      link,
      category,
      imgPath: result.url,
      comments: [],
      likes: 0,
    });

    const savedPin = newPin.save();
    foundUser.posts = foundUser.posts.push(savedPin._id);
    await foundUser.save();
    res.status(200).send({success: 'pin created'});
  }catch(error){
    res.status(404).send({error});
  }
};

// returns all pins
exports.getAllPins = async (req, res) => {
  const pins = await Pins.find({});
  res.status(200).send({data: pins});
};

// return a single pin
exports.getSinglePin = async (req, res) => {
  const pinId = req.params.id;
  const foundPin = await Pin.findById(pinId);
  res.status(201).send(foundPin);
};

// update the pin
exports.updatePin = async (req, res) => {
  const { title, description, altText, link, category, pinId } = req.body;
  const foundPin = await Pin.findById({pinId});

  if(!foundPin) return res.status(401).send({'Pin error': 'Pin not found'});

  const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1]; // split and return cookie
  const decoded = verifyToken(cookie);

  if(!decoded) return res.status(401).send({error: 'Not authorized'});
  if(foundPin._id != decoded.id) return res.status(401).send({error: 'Not authorized'});

  try {
    foundPin.title = title === '' ? foundPin.title : title;
    foundPin.description = description === '' ? foundPin.description : description;
    foundPin.altText = altText === '' ? foundPin.altText : altText;
    foundPin.link = link === '' ? foundPin.link : link;
    foundPin.category = category.length < 1 ? foundPin.category : category;

    await foundPin.save();
    res.status(201).send({success: 'Pin has been updated'});
  }catch(error){
    res.status(401).send({error});
  }
};

exports.deletePin = async (req, res) => {
  const pinId = req.body;
  const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1]; // split and return cookie

  const decoded = verifyToken(cookie); // verify token

  const foundPin = await Pin.findById(pinId);
  const foundUser = await User.findById(decoded.id);
 
  if(!decoded) return res.status(401).send({error: 'Not authorized'});
  if(!foundPin) return res.status(401).send({error: 'Pin is not available'});  
  if(!foundUser) return res.status(401).send({error: 'User not found'});

  try{
    await Pin.findByIdAndDelete(pinId);
    foundUser.post = await foundUser.post.map(i => i.id !== pinId);
    foundUser.save();
    res.status(201).send({'success': 'pin deleted'});
  }catch(error){
    res.status(401).send({error: error})
  }
};

exports.updateLike = async (req, res) => {
  const pinId = req.params.id;
  const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1]; // split and return cookie
  const decoded = verifyToken(cookie);

  if(!decoded) return res.status(401).send({error: 'Not authorized'});
  if(!foundPin) return res.status(401).send({error: 'Pin is not available'});  
  if(!foundUser) return res.status(401).send({error: 'User not found'});

  const foundPin = await Pin.findById(pinId);
  const foundUser = await User.findById(decoded.id);
  
  try {
    if(foundPin.likes.includes(decoded.id) === true) {
      foundPin.likes = foundPin.likes - 1;
      foundUser.likes = foundUser.likes.map(item => item.id !== decoded.id);
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
  const decoded = verifyToken(cookie);
  const comment = req.body;

  if(!decoded) return res.status(401).send({error: 'Not authorized'});
  if(!foundPin) return res.status(401).send({error: 'Pin is not available'}); 
  if(!foundUser) return res.status(401).send({error: 'User not found'});

  const foundPin = await Pin.findById(pinId);
  const foundUser = await User.findById(decoded.id);

  const newComment = {
    creator: decoded.id,
    comment,
    pin: pinId,
  }

  try{
    const savedComment = new Comment(newComment);
    await savedComment.save();

    // push the id of the comment into Pin and User
    foundPin.comments = foundPin.comments.push(savedComment._id);
    foundUser.comments = foundUser.comments.push(savedComment._id);

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
  const decoded = verifyToken(cookie);

  if(!decoded) return res.status(401).send({error: 'Not authorized'});
  if(decoded.id !== foundComment.creator.id) return res.status(401).send({error: 'Not authorized'});

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
  const decoded = verifyToken(cookie);
  const foundComment = await Comment.findById(commentId);
  const foundPin = await Pin.findById(foundComment.pin.id);

  if(!decoded) return res.status(401).send({error: 'Not authorized'});
  if(decoded.id !== foundComment.creator.id) return res.status(401).send({error: 'Not authorized'});
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