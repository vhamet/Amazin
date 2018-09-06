import { protectedValue } from './protected';

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

export const confirmationStatus = {
  expired: 1,
  nouser: 2,
  verified: 3,
  success: 4,
  error: 5,
};

export const resetStatus = {
  expired: 1,
  nouser: 2,
  valid: 3,
  success: 4,
  error: 5,
};

export function sendMail(to, subject, text) {
  // const transporter = nodemailer.createTransport({ service: 'SendGrid', auth: { user: protectedValue('sendgriduser'), pass: protectedValue('sendgridPassword') } });
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: protectedValue('mailtrapUser'),
      pass: protectedValue('mailtrapPassword'),
    },
  });
  const mailOptions = {
    from: 'no-reply@amazin.com', to, subject, text,
  };

  return new Promise((reject) => {
    transporter.sendMail(mailOptions, (err) => {
      reject(err);
    });
  });
}

export function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err)
        reject(err);

      resolve(hash);
    });
  });
}
