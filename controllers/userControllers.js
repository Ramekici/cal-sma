const UserModel = require('../models/User');

exports.get_users = async (req, res, next) => {
  try {
      const user = await UserModel.find();
      res.status(201).json(user);
  }
  catch (err) {
      return res.status(500).json({ errors: [{ message: err.message }] });
  }
}

//on post request
exports.add_user = async (req, res, next) => {
  const { USERNAME, EMAIL, FIRSTNAME, LASTNAME, BIRTHDATE, DESCRIPTION, IMGURL} = req.body;
  //const url = "https://react-app-deneme.herokuapp.com";
  //console.log(url, req.body)
  try {

    const kulla = await UserModel.findOne({EMAIL});
    if(kulla){
      return res.status(403).json({message: "Bu email daha önce kullanılmıştır."})
    }else{
      const newUser = await new UserModel({
        IMGURL: IMGURL,
        USERNAME: USERNAME, 
        EMAIL: EMAIL,
        FIRSTNAME: FIRSTNAME, 
        LASTNAME: LASTNAME,
        BIRTHDATE: BIRTHDATE, 
        DESCRIPTION: DESCRIPTION,
      })
  
      const addedUser = await newUser.save();
      res.status(200).json(addedUser);

    }
    } catch (error) {
      res.send("An error occured.");
    }
};


exports.delete_user = async (req, res, next) => {
  try {
      await UserModel.deleteOne({ _id: req.params.id });
      res.status(200).send('Data is deleted');
  }
  catch (err) {
      return res.status(500).json({ errors: [{ message: err.message }] });
  }
}



exports.edit_user = async (req, res) => {
  const filter = { _id: req.params.id };
  const { USERNAME, EMAIL, FIRSTNAME, LASTNAME, BIRTHDATE, DESCRIPTION,IMGURL} = req.body;
  //let imagePath = req.body.IMGURL;
  //if(req.file) {
  //  const url = req.protocol + '://' + req.get("host");
  //  imagePath = url + '/images/' + req.file.filename
  //};

  const update = { 
    USERNAME: USERNAME, 
    EMAIL: EMAIL,
    FIRSTNAME: FIRSTNAME, 
    LASTNAME: LASTNAME,
    BIRTHDATE: BIRTHDATE, 
    DESCRIPTION: DESCRIPTION, 
    IMGURL: IMGURL, 
  };
    try {
      const updatedUser = await UserModel.findOneAndUpdate( 
        filter, update,
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500).json({ errors: [{ message: err.message }] });
    }
  };