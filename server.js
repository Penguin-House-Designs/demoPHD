const express = require('express');
const bodyParser = require('body-parser');
const app = module.exports = express();
const email = require('emailjs/email');
const path = require('path');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/dist', 'index.html'))
});

var server = email.server.connect({ user: "****", password: "***", host: "smtp.gmail.com", port: 465, ssl: true });

app.post('/sendmail', (req, res) => {

    console.log('email server connected');

    sendEmailUs(req.body, res);
    sendEmailClient(req.body, res);


})

function sendEmailUs(para, res) {

    let ourEmail = {
        text: `From: ${para.name}
        Message: ${para.message}`,
        from: "Website request for info!",
        to: 'penguinhousedesigns@gmail.com',
        subject: para.email
    }

    server.send(ourEmail, function (err, message) {
        if (err)
            console.log(err);
       
    }
    );
}

function sendEmailClient(para, res) {

    let emailTemplate =
        `<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <style>
           .words{
            font-family: 'Montserrat', sans-serif;;
            font-weight: 300;
            font-size: 20px;
            color: black;
           }
           .logo{
            width: 40%;
           }
        </style>
    </head>
    <body>
        <br>
        <br>
        <img src='cid:my-image' class='logo'>
        <br>
        <br>
        <p class='words'>
        Hi ${para.name},
        <br>
        <br>
        Thank you for contacting us. We are currently reviewing your inquiry and will get back to you shortly.
        <br>
        <br>
        <br>
        Sincerely,
        <br>
        Team @ PHD
        </p>
`

    let clientEmail = {
        text: "",
        from: "phd@phdesigns.io",
        to: para.email,
        subject: 'Thank you for contacting us!',
        attachment:
            [
                { data: `${emailTemplate}</body></html>`, alternative: true },
                { path: "src/assets/images/logo-text-black.png", type: "image/png", headers: { "Content-ID": "<my-image>" } }
            ]
    }

    server.send(clientEmail, function (err, message) {
        if (err)
            console.log(err);
    
    }
    );
}




app.listen(4200, () => {
    console.log("Successfully listening on : 4200")
})
