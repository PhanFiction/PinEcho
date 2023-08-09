const Pin = require('../models/Pin');
const config = require('../config/config');

// store to cloudinary and return path
exports.createPin = async (req, res) => {
  const { title, description, altText, link, category } = req.body;
  console.log('cookies ', req.cookie);
  const newPin= new Pin({
    title,
    description,
    altText,
    link,
    category,
  });
  try{
    const result = await config.cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",{ public_id: "olympic_flag" });
    console.log(result);
    res.sttus(200).send({success: 'pin created'});
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
exports.getPin = async (req, res) => {
  const pinId = req.params.id;
  const foundPin = await Pin.findById(pinId);
  res.status(201).send(foundPin);
};

// update the pin
exports.updatePin = async (req, res) => {
  const { title, description, altText, link, category, pinId } = req.body;
  const foundPin = await Pin.findById({pindId});
  if(!foundPin) return res.status(401).send({'Pin error': 'Pin not found'});

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
;}