const client = require('../../config/twilioConfig');            

const sendSMS = (to, body) => {
   return client.messages.create({
    body,
    from: process.env.TWILIO_PHONE,
    to
  });
};

module.exports = { sendSMS };