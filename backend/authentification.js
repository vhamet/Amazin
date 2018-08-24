import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getSecret } from './secrets';
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
import User from './models/user';
import Token from './models/token';

module.exports = function(app, router) {
  app.use(cookieParser());
  app.use(session({secret: "Shh, its a secret!"}));
  // db config -- set your URI from mLab in secrets.js
  mongoose.connect(getSecret('dbUri'), { useNewUrlParser: true });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  // now we should configure the API to use bodyParser and look for JSON data in the request body
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(logger('dev'));

  // now we can set the route path & initialize the API
  router.get('/', (req, res) => {
    if (req.session.user)
      return res.json({ success: true, logged: true });
    else
      return res.json({ success: true, logged: false });
  });

  function handleError(err) {
    return res.json({ success: false, message: 'An error occured while creating your account, please try again later.' });
  }

  function sendToken(res, user) {
    var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
    token.save(function (err) {
      if (err)
        return handleError(err);

      var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'devtesting.emailaddress@gmail.com', pass: getSecret('pwdGMail')}});
      var mailOptions = { from: 'no-reply@merncommentbox.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/localhost:3000\/confirmation\/' + token.token + '.\n' };
      transporter.sendMail(mailOptions, function (err) {
        if (err)
          return handleError(err);

        return res.json({ success: true });
      });
    });
  }

  function saveUser(res, username, email, hash) {
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hash;
    user.save(err => {
      if (err)
        return handleError(err);

      return sendToken(res, user);
    });
  }

  router.post('/signup', (req, res) => {
    User.findOne({$or: [{username:req.body.username},{email:req.body.email}]}, function(err,user) {
      if (err)
        return handleError(err);

      if (user) {
        if (user.username === req.body.username)
          return res.json({ success: false, message: 'Email already used. Please use another or sign in' });
        return res.json({ success: false, message: 'Username already used. Please chose another one' });
      }

      bcrypt.hash(req.body.password, 10, function(err, hash) {
        if (err)
          return handleError(err);

        const { username, email } = req.body;
        return saveUser(res, username, email, hash);
      });
    });
  });

  router.get('/confirmation/:token', (req, res) => {
    const { token } = req.params;
    // Find a matching token
    Token.findOne({ token: token }, function (err, token) {
      if (!token)
        return res.json({ status: confirmationStatus.expired, message: 'We were unable to find a valid token. Your token my have expired.' });

      User.findOne({ _id: token._userId }, function (err, user) {
        if (!user)
          return res.json({ status: confirmationStatus.nouser, message: 'We were unable to find a user for this token.' });

        if (user.isVerified)
          return res.json({ status: confirmationStatus.verified, message: 'This user has already been verified.' });

        user.isVerified = true;
        user.save(function (err) {
          if (err)
            return res.json({ status: confirmationStatus.error, message: err.message });

          return res.json({  status: confirmationStatus.success, message: 'The account has been verified. Please sign in.' });
        });
      });
    });
  });

  router.post('/resend', (req, res) => {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (!user)
        return res.json({ success: false, message: 'We were unable to find a user with that email.' });

      if (user.isVerified)
        return res.json({ success: false, message: 'This account has already been verified. Please sign in.' });

      sendToken(res, user);
    });
  });

  router.post('/user-exists', (req, res) => {
    User.findOne({$or: [{ email: req.body.username }, { username: req.body.username }]}, function(err, user) {
      if (err)
        return res.json({ success: false, message: 'An error occured while trying to log in. Please try again later.' });

      if (!user)
        return res.json({ success: false, message: 'We were unable to find a user with that email or username.' });

      return res.json({ success: true });
    });
  });

  router.post('/available', (req, res) => {
    User.findOne({ [req.body.field]: req.body.value }, function(err, user) {
      if (err)
        return res.json({ success: false });

      return res.json({ success: true, available: !user });
    });
  });

  router.post('/signin', (req, res) => {
    User.findOne({$or: [{ email: req.body.email }, { username: req.body.username }]}, function(err, user) {
      if (err)
        return handleError(err);

      bcrypt.compare(req.body.password, user.password, function(err, match) {
        if (!match)
          return res.json({ success: false, message: 'Your password is incorrect' });

        // Make sure the user has been verified
        if (!user.isVerified)
          return res.json({ success: false, toVerify: true, message: 'Your account has not been verified.' });

        req.session.user = user;
        res.json({ success: true });
      });
    });
  });

  app.use('/authentification', router);
}
