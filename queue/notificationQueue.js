const { sendEmailNotification } = require('../services/mail/emailService');
const { sendSMSNotification } = require('../services/sms/smsService');
const Notification = require('../models/notification/notificationModel');
const { emailQueue, smsQueue } = require('../config/queueConfig');

function createQueues() {
    //email queue
  emailQueue.process(async (job) => {
    const { userId, to, subject, text } = job.data;
    try {
      const mailOptions = {
            from: 'test@test.com',
            to: to,
            subject: subject,               
            text: text
        };
      await sendEmailNotification(mailOptions);
      await Notification.create({ userId, type: 'email', content: text });
    } catch (err) {
      console.error('Email processing failed:', err.message);
    }
  });

  //sms queue   
  smsQueue.process(async (job) => {
    const { userId, to, message } = job.data;
    try {
      await sendSMSNotification (to, message);
      await Notification.create({ userId, type: 'sms', content: message });
    } catch (err) {
      console.error('SMS processing failed:', err.message);
    }
  });
}

module.exports = { emailQueue, smsQueue, createQueues };