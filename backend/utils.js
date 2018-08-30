import { getProtectedValue } from './protected';
var bcrypt = require('bcrypt');
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

export function sendMail(to, subject, text) {
  var transporter = nodemailer.createTransport({service: 'SendGrid', auth: {user: getProtectedValue('usrSendgrid'), pass: getProtectedValue('pwdSendgrid')}});
  var mailOptions = { from: 'no-reply@amazin.com', to: to, subject: subject, text: text };

  return new Promise((reject) => {
    transporter.sendMail(mailOptions, function (err) {
      reject(err);
    });
  });
}

export function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      if (err)
        reject(err);

      resolve(hash);
    });
  });
}
