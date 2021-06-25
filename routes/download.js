const router = require('express').Router();
const File = require('../models/file');

router.get('/api/:filename', async (req, res) => {
  const file = await File.findOne({ filename: req.params.filename});
  const filePath = `${__dirname}/../${file.path}`;
  res.download(filePath);
});

router.get('/',(req,res)=>{
  File.find(req.query,(err, foundItems)=>{
    if(err){
      console.log(err);
    }else{
      res.render('download', {files:foundItems});
    }
  });
});

router.post('/filter',(req,res)=>{
  const subject = req.body.subject;
  const category = req.body.category;
  const year = req.body.year;
  const branch = req.body.branch;
  let url = '/download?';
  if(subject!=="") url = url + "subject=" + subject;
  if(category!=="") url = url + "category=" + category;
  if(year!=="") url = url + "&year=" + year;
  if(branch!=="") url = url + "&branch=" + branch;
  res.redirect(url);
});

module.exports = router;
