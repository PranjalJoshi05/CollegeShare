const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null,'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
})

let upload = multer({
  storage: storage,
  limit: {fileSize: 1000000*50}, //50MB
}).single('file');

router.get('/',(req,res)=>{
  res.render('upload');
});

router.post('/',(req, res)=>{
  //store file
  upload(req, res, async(err) =>{
    //validate request
    if(!req.file){
      return res.json({error: 'All fields are required'});
    }
    if(err){
      return res.status(500).send({error: err.message});
    }
    //store into Database
    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      email: req.body.email,
      subject: req.body.subject,
      category: req.body.category,
      year: req.body.year,
      branch: req.body.branch
    });

    const response = await file.save();

    //Response
    res.render('success');

  });
});

module.exports = router;
