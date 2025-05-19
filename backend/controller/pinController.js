const Pin = require('../models/Pin');
const User = require('../models/User');
const Comment = require('../models/Comment');
const verifyToken = require('../utils/verifyToken');
const convertIdToString = require('../utils/idToString');
const { deleteImg, uploadImg } = require('../utils/cloudinaryService');

// returns all pins
exports.getAllPins = async (req, res) => {
  try {
    const pins = await Pin.find({}).populate({ path: 'comments creator', select: 'username profileImage' });
    res.status(200).json({ data: pins});
  } catch(error) {
    // Send a 500 Internal Server Error response with a generic error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// return a single pin
exports.getSinglePin = async (req, res) => {
  try {
    const pinId = req.params.id;
    const foundPin = await Pin.findById(pinId)
      .populate({path: 'comments', populate: { path: 'creator', select: 'username creator profileImage -_id' }})
      .populate({path: 'creator', select: 'profileImage username'});

    if (!foundPin) {
      // If the pin is not found, send a 404 Not Found response
      return res.status(404).json({ error: 'Pin not found' });
    }

    res.status(200).json(foundPin);
  } catch (error) {
    // Send a 500 Internal Server Error response with a generic error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// store to cloudinary and return path
exports.createPin = async (req, res) => {
  try {
    const { image, title, description, altText, link } = req.body;
    const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1];
    const decodedToken = verifyToken(cookie);

    if(!decodedToken) return res.status(401).json({ error: 'Not authorized' });

    const foundUser = await User.findById(decodedToken.id);
  
    if(image === "") return res.status(400).json({ error: "missing image" });
    if(!foundUser) return res.status(401).json({ error: 'User not found' });
  
    // store to cloudinary
    const result = await uploadImg(image, 'posts');;
  
    // create new pin
    const newPin = new Pin({
      title,
      description,
      creator: foundUser._id,
      altText,
      link,
      imgPath: {
        path: result.url,
        publicId: result.public_id,
      },
      comments: [],
      likes: [],
    });
  
    const savedPin = await newPin.save();
    const pinStringId = convertIdToString(savedPin._id);
    foundUser.posts.push(pinStringId);
    await foundUser.save();
    res.status(201).json({ success: 'pin created', pinId: pinStringId });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// update the pin
exports.updatePin = async (req, res) => {
  const { title, description, altText, link, category } = req.body;
  const pinId = req.params.id;
  const foundPin = await Pin.findById(pinId);

  if(!foundPin) return res.status(401).json({'Pin error': 'Pin not found'});

  const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1]; // split and return cookie
  const decodedToken = verifyToken(cookie);

  if(!decodedToken) return res.status(401).json({error: 'Not authorized'});
  if(foundPin.creator != decodedToken.id) return res.status(401).json({error: 'Not authorized'});

  try{
    foundPin.title = title === '' ? foundPin.title : title;
    foundPin.description = description === '' ? foundPin.description : description;
    foundPin.altText = altText === '' ? foundPin.altText : altText;
    foundPin.link = link === '' ? foundPin.link : link;
    foundPin.category = category.length < 1 ? foundPin.category : category;

    await foundPin.save();
    res.status(200).json({success: 'Pin has been updated'});
  }catch(error){
    res.status(401).json({error});
  }
};

exports.deletePin = async (req, res) => {
  try {
    const pinId = req.params.id;
    const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1]; // split and return cookie

    const decodedToken = verifyToken(cookie); // verify token

    const foundPin = await Pin.findById(pinId);
    const foundUser = await User.findById(decodedToken.id);

    if (!decodedToken) return res.status(401).json({ error: 'Not authorized' });
    if (!foundPin) return res.status(401).json({ error: 'Pin is not available' });
    if (!foundUser) return res.status(401).json({ error: 'User not found' });
    if (foundPin.creator != decodedToken.id) return res.status(401).json({ error: 'Not authorized' });

    // Delete associated comments
    await Comment.deleteMany({ pinId: foundPin._id });

    // Delete pin and remove from user's posts
    await deleteImg(foundPin.imgPath.publicId, 'posts');
    await Pin.findByIdAndDelete(pinId);

    foundUser.posts = foundUser.posts.filter((postId) => postId !== pinId);
    await foundUser.save();

    res.status(200).json({ success: 'Pin and associated comments deleted' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getSaves = async (req, res) => {
  try {
    const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1];
    const decodedToken = verifyToken(cookie);
    const foundUser = await User.findById(decodedToken.id).select('saves')
      .populate({path: 'saves', populate: { path: 'creator', select: 'username creator profileImage -_id'}});

    if(!decodedToken) return res.status(401).json({error: 'Not authorized'});
    if(decodedToken.id !== foundUser.id) return res.status(401).json({error: 'Not authorized'});
    if(!foundUser) return res.status(401).json({error: 'User does not exist'});
    res.status(201).json(foundUser);
  } catch(error) {
    res.status(401).json({error});
  }
}

exports.updatePinSaves = async (req, res) => {
  try {
    const pinId = req.params.id;
    const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1]; // split and return cookie
    const decodedToken = verifyToken(cookie);

    if (!decodedToken) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    const foundUser = await User.findById(decodedToken.id);

    if (!foundUser) {
      return res.status(401).json({ error: 'User does not exist' });
    }

    // Check if the pinId is already in the saves array
    const isPinAlreadySaved = foundUser.saves.includes(pinId);

    if (isPinAlreadySaved) {
      // If the pin is already saved, remove it from saves
      foundUser.saves = foundUser.saves.filter(savedPinId => savedPinId.toString() !== pinId.toString());
    } else {
      // If the pin is not saved, add it to saves
      foundUser.saves.push(pinId);
    }

    // Save the updated user
    const savedUser = await foundUser.save();

    // Return the updated user object
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error updating saves:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Todo: Test code and see if the likes is getting updated
exports.updatePinLike = async (req, res) => {
  try {
    const pinId = req.params.id;
    const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1];
    const decodedToken = verifyToken(cookie);

    const foundPin = await Pin.findById(pinId);
    const foundUser = await User.findById(decodedToken.id);

    if(!decodedToken) return res.status(401).json({error: 'Not authorized'});
    if(!foundPin) return res.status(401).json({error: 'Pin is not available'});
    if(!foundUser) return res.status(401).json({error: 'User not found'});

    if(foundPin.likes.includes(decodedToken.id) === true) {
      foundUser.pinLikes.map(id => id.toString() !== pinId.toString());
      foundPin.likes.map(id => id.toString() !== decodedToken.id.toString());
    }else{
      foundPin.likes.push(decodedToken.id);
      foundUser.pinLikes.push(pinId);
    }
    await foundPin.save();
    await foundUser.save();
    res.status(201).json({'successfully updated likes': foundPin.pinLikes})
  }catch(error){
    res.status(401).json({error});
  }
};

exports.createComment = async (req, res) => {
  const pinId = req.params.id;
  const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1];
  const decodedToken = verifyToken(cookie);
  const { comment } = req.body;

  const foundPin = await Pin.findById(pinId);
  const foundUser = await User.findById(decodedToken.id);

  if(!decodedToken) return res.status(401).json({error: 'Not authorized'});
  if(!foundPin) return res.status(401).json({error: 'Pin is not available'}); 
  if(!foundUser) return res.status(401).json({error: 'User not found'});

  const newComment = {
    creator: decodedToken.id,
    comment,
    pin: pinId,
  }

  try{
    const savedComment = new Comment(newComment);
    await savedComment.save();

    const commentId = convertIdToString(savedComment._id);

    // push the id of the comment into Pin and User
    foundPin.comments.push(commentId);
    foundUser.comments.push(commentId);

    const comment = await Comment.findById(commentId)
      .populate({
        path: 'creator',
        select: 'username profileImage -_id'
      });

    // save the newly added id to database
    await foundUser.save();
    await foundPin.save();
    res.status(201).json({ comment });
  }catch(error){
    res.status(401).json({error});
  }
};

exports.updateComment = async (req, res) => {
  const { comment, commentId } = req.body;
  const foundComment = await Comment.findById(commentId);

  const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1]; // split and return cookie
  const decodedToken = verifyToken(cookie);

  if(!decodedToken) return res.status(401).json({error: 'Not authorized'});
  if(decodedToken.id !== foundComment.creator.id) return res.status(401).json({error: 'Not authorized'});

  try{
    foundComment.comment = comment;
    await foundComment.save();
    res.status(201).json({'success': 'updated comment'});
  }catch(error){
    res.status(401).json({error});
  }
};

// Todo: Test code and see if the likes is getting updated
exports.updateCommentLike = async (req, res) => {  
  try {
    const commentId = req.params.id;
    const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1]; // split and return cookie
    const decodedToken = verifyToken(cookie);

    if(!decodedToken ) return res.status(401).json({error: 'Not authorized'});

    const foundComment = await Comment.findById(commentId);
    const foundUser = await User.findById(decodedToken.id);

    if(!foundComment) return res.status(401).json({error: 'Comment is not available'});  
    if(!foundUser) return res.status(401).json({error: 'User not found'});

    if (foundComment.likes.includes(decodedToken.id)) {
      // If the user already liked the comment, remove the like
      foundComment.likes.filter(userId => userId.toString() !== foundUser._id.toString());
      foundUser.commentLikes.filter(commentId => commentId.toString() !== foundComment._id.toString());
    } else {
      // If the user hasn't liked the comment, add the like
      foundComment.likes.push(foundUser._id);
      foundUser.commentLikes.push(foundComment._id);
    }    
    await foundComment.save();
    await foundUser.save();

    res.status(201).json({success: 'successfully updated likes'});
  }catch(error){
    res.status(401).json({error});
  }
};

exports.deleteComment = async (req, res) => {
  const commentId = req.params.id;
  const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1];
  const decodedToken = verifyToken(cookie);
  const foundComment = await Comment.findById(commentId);
  const foundPin = await Pin.findById(foundComment.pin.id);

  if(!decodedToken) return res.status(401).json({error: 'Not authorized'});
  if(decodedToken.id !== foundComment.creator.id) return res.status(401).json({error: 'Not authorized'});
  if(!foundPin) return res.status(401).json({error: 'Pin not found'});
  try{
    foundPin.comments = foundPin.comments.map(item => item !== commentId);
    foundUser.comments = foundUser.comments.map(item => item !== commentId);

    await foundPin.save();
    await foundUser.save();
    await Comment.findByIdAndDelete(commentId);
    res.status(201).json({'success': 'comment deleted'});
  }catch(error){
    res.status(401).json({error});
  }
};