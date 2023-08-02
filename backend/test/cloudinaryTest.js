const config = require('../config/config');

const test = async () => {
  try{
    const result = await config.cloudinaryService.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
    { 
      public_id: "olympic_flag", 
      crop: "fill",
      width: 250, 
      height: 250,
    },
  );
    console.log('result ', result);
  }catch(error){
    console.log('error ', error);
  }
};
test();