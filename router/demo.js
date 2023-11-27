var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pokalerunali52@gmail.com',
    pass: 'aeiou@5803'
  }
});

var mailOptions = {
  from: 'pokalerunali52@gmail.com',
  to: 'truptikhandalkar8766@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'I love you'
};

transporter.sendMail(mailOptions, function(error,res){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ');
  }
});