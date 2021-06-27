const router = require('express').Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_APP_KEY,
  },
});

function sendRejectMail(username) {

  // message object
  let message = {
    from: process.env.GMAIL_ID,
    to: `${username}`,
    subject: 'Rejected',
    html: `<p>Sorry, the file you uploaded is irrelevant to our database.</p>`
  };

  transporter.sendMail(message, (err, info) => {
    if (err) console.log('Error occurred. ' + err.message);
  });
}

function sendAcceptMail(username) {

  // message object
  let message = {
    from: process.env.GMAIL_ID,
    to: `${username}`,
    subject: 'Accepted',
    html: `<p>The file you uploaded is added to our database. Thank You for contributing to CollegeShare.</p>`
  };

  transporter.sendMail(message, (err, info) => {
    if (err) console.log('Error occurred. ' + err.message);
  });
}

router.get('/:status/:email', async (req, res) => {
  if(req.params.status==="accept"){
    sendAcceptMail(req.params.email);
  }else{
    sendRejectMail(req.params.email);
  }
  res.redirect('/admin');
});

module.exports = router;
