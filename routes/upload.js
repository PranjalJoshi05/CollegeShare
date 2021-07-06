const router = require('express').Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const File = require('../models/file');

router.get('/',(req,res)=>{
  res.render('upload');
});

router.post('/', upload.single("file"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    //Create new file
    const file = new File({
      url: result.secure_url,
      cloudinary_id: result.public_id,
      size: req.file.size,
      email: req.body.email,
      subject: req.body.subject,
      category: req.body.category,
      year: req.body.year,
      branch: req.body.branch
    });

    // Save file
    await file.save();

    //Response
    res.render('success');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
