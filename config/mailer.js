const nodemailer = require('nodemailer');

const mailPort = process.env.MAIL_PORT_SMTP4DEV || 25;

const transporter = nodemailer.createTransport({
    service: 'smtp4dev',
    host: '127.0.0.1',
    port: mailPort,
    secure: false,            
    tls: {
      rejectUnauthorized: false
    }, 
});

module.exports = transporter;
