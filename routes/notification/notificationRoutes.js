const express = require('express');
const router = express.Router();
const {
  queueEmailNotification,
  queueSMSNotification,
  saveInAppMessage,
  getInAppMessages
} = require('../../controllers/notification/notificationController');

//router.use(express.json());

router.post('/email', queueEmailNotification);
router.post('/sms', queueSMSNotification);
router.post('/in-app', saveInAppMessage);
router.get('/in-app/:userId', getInAppMessages);

module.exports = router;