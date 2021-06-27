const express = require('express');

const app = express();

// static files
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//connect to database
const connectDB = require('./config/db');
connectDB();

//Template engine
app.set('view engine','ejs');

//Routes
app.get('/',(req,res)=>{
  res.render('home');
});

const upload = require('./routes/upload')
app.use('/upload', upload);

const download = require('./routes/download');
app.use('/download', download);

const admin = require('./routes/admin');
app.use('/admin', admin);

const action = require('./routes/action');
app.use('/action', action);

const sendmail = require('./routes/sendMail');
app.use('/sendmail', sendmail);

//connect to port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
