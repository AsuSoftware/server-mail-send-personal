const express = require('express'); // viene utilizzato per gli endpoint
const nodemailer = require('nodemailer'); // viene utilizzato per mandare le mail
const bodyParser = require("body-parser"); // serve per leggere i dati che vengono in json dal client e li ingloba come req.body(js accesibile)
const mailGun = require('nodemailer-mailgun-transport'); // serve per mandare la mail
const cors = require('cors'); // serve per poter dare i dati ai client, in questo caso i dati sono dati a tutti i richiedenti(client)

var app = express(); // per poter utilizzare gli endpoint
const PORT = process.env.PORT || 4000;

var api__key = "c3895ffa13e9ffa3fa1131037097ae17-ba042922-87794a6d"; // e la key per mailGun in modo da mandare le mail
var domain_ = "sandboxc412994b03054c0a9a948946a3d40cb8.mailgun.org";

app.use(bodyParser.json());

// serve a nodemailer per mandare la mail
const auth = {
    auth: {
        api_key: api__key,
        domain: domain_
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };

app.use(cors(corsOpts)); // stiamo indicando che utiliziamo l'abilitazione del cors, e che tutti gli

app.post("/api/v1/send-mail", (req, res) => {
    const { name, email, subject, message } = req.body;
    var data = {
        from: email,
        to: "web.antonio.popa@gmail.com",
        subject: subject,
        text: message
    };

    transporter.sendMail(data, function (error, info) {
        if(error) {
            console.log(error);
            res.json("Mail was not sent. Retry!");
        } else {
            res.json("Your message has been received, I will contact you soon.");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost/${PORT}`);
});
