const Notification = require('../../models/notification/notificationModel');
const { sendEmailNotification } = require('../../services/mail/emailService');
const { sendSMSNotification } = require('../../services/sms/smsService');
const { emailQueue, smsQueue } = require('../../queue/notificationQueue');

//queue email notification
const queueEmailNotification = async (req, res) => {
  const { userId, to, subject, text } = req.body;
  //console.log('queueEmailNotification', userId, to, subject, text);
  //const userId = req.user.id;
  if(!userId){
    res.status(401);
    throw new Error("Not authorized, no user id");
  }
  try {
    await emailQueue.add({ userId, to, subject, text });
    res.status(200).json({ message: 'Email queued' });
  } catch (err) {    
    res.status(500);
    throw new Error(err.message);
  }

};

//queue sms notification
const queueSMSNotification = async (req, res) => {
  const { userId, to, message } = req.body;
  try {
    await smsQueue.add({ userId, to, message });
    res.status(200).json({ message: 'SMS queued' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

module.exports = {queueEmailNotification, queueSMSNotification, sendEmail, sendSMS, saveInAppMessage, getInAppMessages };
