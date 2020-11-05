const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening to port ${port}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

var transporterSetup = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use SSL
    requireTLS: true,
    auth: {
        user: 'kunden.nachrichten3033@gmail.com',
        pass: 'kundenNachrichten001%'
    }
};

var transporter = nodemailer.createTransport(transporterSetup);

/* Send E-mail */

app.post('/sendContactForm', (req, res) => {    
    let name = req.body.name;
    let subject = req.body.subject;
    let message = req.body.message;

    var mailOptions = {
        from: `${name}`,
        to: 'cristian.diass@hotmail.com',
        subject: `${subject},`,
        text: `${message}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }

    });    
    res.send("Success");
});
