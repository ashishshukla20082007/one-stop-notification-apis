const mongoose = require('mongoose');
const { NotificationType, NotificationStatus } = require('../../constants');

const notificationSchema = new mongoose.Schema({
  userId: {
     type: String, 
     required: true 
  },
  type: {
     type: String, 
     enum: Object.values(NotificationType), 
     required: true 
    },
  content: { 
     type: String, 
     required: true 
    },
  status: { 
    type: String, 
    enum: Object.values(NotificationStatus), 
    default: 'sent' 
   } 
}, {
       timestamps: true,
});

module.exports = mongoose.model('Notification', notificationSchema);