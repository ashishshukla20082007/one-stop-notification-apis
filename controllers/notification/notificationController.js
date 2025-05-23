const Notification = require('../../models/notification/notificationModel');
const { sendEmailNotification } = require('../../services/mail/emailService');
const { sendSMSNotification } = require('../../services/sms/smsService');

//send email
const sendEmail = async (req, res) => {  
  const { userId, to, subject, text } = req.body;
  try {
    const mailOptions = {
      from: 'test@test.com',
      to: to,
      subject: subject,
      text: text
    };
    await sendEmailNotification(mailOptions);

    await Notification.create({ userId, type: 'email', content: text });

    res.status(200).json({ message: 'Email sent' });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

//send sms
const sendSMS = async (req, res) => {
  const { userId, to, message } = req.body;
  try {
    await sendSMSNotification(to, message);

    await Notification.create({ userId, type: 'sms', content: message });

    res.status(200).json({ message: 'SMS sent' });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

//save in-app message
const saveInAppMessage = async (req, res) => {
  const { userId, message } = req.body;
  try {
    await Notification.create({ userId, type: 'in-app', content: message });

    res.status(200).json({ message: 'In-app message saved' });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

//get in-app messages by user id  
const getInAppMessages = async (req, res) => {
  const { userId } = req.params;
  try {
    const messages = await Notification.find({ userId, type: 'in-app' });
    
    res.status(200).json(messages);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

module.exports = { sendEmail, sendSMS, saveInAppMessage, getInAppMessages };
