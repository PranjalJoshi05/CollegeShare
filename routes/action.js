const router = require('express').Router();
const File = require('../models/file');

//file delete route
router.get('/delete/:filename', async (req, res) => {
  File.deleteOne({
    filename: req.params.filename
  }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/admin');
    }
  });
});

//accept route
router.get('/accept/:filename', async (req, res) => {
  File.updateOne({
    filename: req.params.filename
  }, {
    accepted: true
  }, function(err) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/admin');
    }
  });
});

//reject route
router.get('/reject/:filename', async (req, res) => {
  res.redirect('/action/delete' + req.params.filename);
});

module.exports = router;