const router = require('express').Router();
const cloudinary = require("../utils/cloudinary");
const File = require('../models/file');

//file delete route
router.get('/delete/:id', async (req, res) => {
  // Delete file from cloudinary
  await cloudinary.uploader.destroy(req.params.id);

  //Delete file from database
  await File.deleteOne({
    cloudinary_id: req.params.id
  }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/admin');
    }
  });
});

//accept route
router.get('/accept/:id/:email', async (req, res) => {
  await File.updateOne({
    cloudinary_id: req.params.id
  }, {
    accepted: true
  }, function(err) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/sendmail/accept/'+req.params.email);
    }
  });
});

//reject route
router.get('/reject/:id/:email', async (req, res) => {
  // Delete file from cloudinary
  await cloudinary.uploader.destroy(req.params.id);

  //Delete file from database
  await File.deleteOne({
    cloudinary_id: req.params.id
  }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/sendmail/reject/'+req.params.email);
    }
  });
});

module.exports = router;
