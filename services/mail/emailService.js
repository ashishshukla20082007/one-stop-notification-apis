const transporter = require('../../config/mailer.js');

const sendEmailNotification = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reset email sent to ${mailOptions.to}`);
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
};

module.exports = { sendEmailNotification };