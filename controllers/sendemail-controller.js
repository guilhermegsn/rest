const nodemailer = require('nodemailer');

exports.SendEmail=(req, res, next)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "offerdescontos@gmail.com",
            pass: "#OfferApp2021"
        },
        tls: { rejectUnauthorized: false }
      });
      transporter.sendMail({
          from: "Offer <offerdescontos@gmail.com>",
          to: [req.body.email],
          subject: "Olá! Seja bem vindo a Offer.",
          text: "Seja bem vindo a offer. A maior plataforma de descontos do Brasil.",

      }).then(message => {console.log(message); return res.status(202).send({mensagem: 'E-mail enviado.'});}).catch(err => {console.log(err);return res.status(202).send({mensagem: 'Falha ao enviar e-mail.'});});
}

