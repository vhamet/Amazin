import { getProtectedValue } from './protected';
var nodemailer = require('nodemailer');

export const confirmationStatus = {
  expired: 1,
  nouser: 2,
  verified: 3,
  success: 4,
  error: 5
}

export const resetStatus = {
  expired: 1,
  nouser: 2,
  valid: 3,
  success: 4,
  error: 5
}

export function sendMail(to, subject, text, callback) {
  var transporter = nodemailer.createTransport({service: 'SendGrid', auth: {user: getProtectedValue('usrSendgrid'), pass: getProtectedValue('pwdSendgrid')}});
  var mailOptions = { from: 'no-reply@amazin.com', to: to, subject: subject, text: text };
  transporter.sendMail(mailOptions, function (err) {
    callback(err);
  });
}
