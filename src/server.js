const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// Allow requests from any origin
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// API endpoint for sending email messages
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.somewhere',
    port: 465, // Update the port number here
    secure: true, // Use SSL
    auth: {
      user: 'emailAddress',
      pass: 'password'
    }
  });

  // Define the email message
  const mailOptions = {
    from: 'emailAddress',
    to,
    subject,
    text
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
