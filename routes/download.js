const router = require('express').Router();
const File = require('../models/file');

//download route
router.get('/', async (req,res)=>{
  req.query.accepted = true;
  await File.find(req.query, async (err, foundItems)=>{
    if(err){
      console.log(err);
    }else{
      await File.find().distinct( 'subject', (error,items)=>{
        res.render('download', {files: foundItems, filters: req.query, subjects: items});
      });
    }
  });
});

//filter search
router.post('/filter',(req,res)=>{
  const subject = req.body.subject;
  const category = req.body.category;
  const year = req.body.year;
  const branch = req.body.branch;
  let url = '/download?';
  if(subject!=="") url = url + "subject=" + subject;
  if(category!=="") url = url + "&category=" + category;
  if(year!=="") url = url + "&year=" + year;
  if(branch!=="") url = url + "&branch=" + branch;
  res.redirect(url);
});

module.exports = router;
