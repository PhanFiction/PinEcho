const Pin = require('../models/Pin');
const config = require('../config/config');

// store to cloudinary and get path
exports.createPin = async (req, res) => {
  const { title, description, altText, link, category } = req.body;
  const { session_id } = req.cookie;
  const newPost = new Post({
    title,
    description,
    altText,
    link,
    category,
  });
  try{
    const result = await config.cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",{ public_id: "olympic_flag" });
    console.log(result);
    res.send({success: 'pin created'});
  }catch(error){
    res.send({error});
  }
};

exports.getAllPins = async (req, res) => {
  const pins = await Pins.find({});
  res.status(200).send({data: pins});
};