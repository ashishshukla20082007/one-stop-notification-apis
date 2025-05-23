const express = require('express');
const router = express.Router();
const {
  sendEmail,
  sendSMS,
  saveInAppMessage,
  getInAppMessages
} = require('../../controllers/notification/notificationController');

//router.use(express.json());

router.post('/email', sendEmail);
router.post('/sms', sendSMS);
router.post('/in-app', saveInAppMessage);
router.get('/in-app/:userId', getInAppMessages);

module.exports = router;