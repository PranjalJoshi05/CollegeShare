const router = require('express').Router();
const session = require("express-session");
const passport = require("passport");
const File = require('../models/file');

router.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

const User = require('../models/user');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    File.find(req.query,(err, foundItems)=>{
      if(err){
        console.log(err);
      }else{
        File.find().distinct( 'subject', (error,items)=>{
          res.render('admin', {files: foundItems, filters: req.query, subjects: items});
        });
      }
    });
  } else {
    res.render("login");
  }
});

router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/admin");
});

router.post("/", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/admin");
      });
    }
  });
});

//filter search
router.post('/filter',(req,res)=>{
  if (req.isAuthenticated()) {
    const subject = req.body.subject;
    const category = req.body.category;
    const year = req.body.year;
    const branch = req.body.branch;
    const accepted = req.body.accepted;
    let url = '/admin?';
    if(subject!=="") url = url + "subject=" + subject;
    if(category!=="") url = url + "&category=" + category;
    if(year!=="") url = url + "&year=" + year;
    if(branch!=="") url = url + "&branch=" + branch;
    if(accepted!=="") url = url + "&accepted=" + accepted;
    res.redirect(url);
  } else {
    res.render("login");
  }
});

module.exports = router;
