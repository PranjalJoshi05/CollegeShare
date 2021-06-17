const express = require('express');
const app = express();

//static files
// app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//connect to database
const connectDB = require('./config/db');
connectDB();

//Template engine
app.set('view engine','ejs');

//Routes
app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/landing.html");
});

// const show = require('./routes/show');
// app.use('/files', show);
//

const upload = require('./routes/upload')
app.use('/upload', upload);

const download = require('./routes/download');
app.use('/download', download);

//connect to port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
