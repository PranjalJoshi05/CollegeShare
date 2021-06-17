const router = require('express').Router();
const File = require('../models/file');

router.get('/:filename', async (req, res) => {
  const file = await File.findOne({ filename: req.params.filename});
  const filePath = `${__dirname}/../${file.path}`;
  res.download(filePath);
});

router.post('/',(req,res)=>{
  File.find({},(err, foundItems)=>{
    if(err){
      console.log(err);
    }else{
      res.render('download', {files:foundItems});
    }
  });
});

router.post('/filter',(req,res)=>{
  const category = req.body.category;
  const year = req.body.year;
  const branch = req.body.branch;
  File.find({category: category, year: year, branch: branch},(err, foundItems)=>{
    if(err){
      console.log(err);
    }else{
      res.render('download', {files:foundItems});
    }
  });
});

module.exports = router;
