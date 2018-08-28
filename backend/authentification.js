import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getProtectedValue } from './protected';
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
import User from './models/user';
import Token from './models/token';
import { confirmationStatus, resetStatus, sendMail } from './utils';
const MongoStore = require('connect-mongo')(session);

module.exports = function(app, router) {
  // db config -- set your URI from mLab in secrets.js
  mongoose.connect(getProtectedValue('dbUri'), { useNewUrlParser: true });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  app.use(cookieParser());
  app.use(session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: db }),
  }));

  // now we should configure the API to use bodyParser and look for JSON data in the request body
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(logger('dev'));

  // now we can set the route path & initialize the API
  router.get('/', (req, res) => {
    console.log('USER: ' + req.session.user);
    res.json({ signedIn: typeof(req.session.user) !== "undefined" });
  });

  function handleError(err) {
    return res.json({ success: false, message: 'An error occured while creating your account, please try again later.' });
  }

  function deleteTokens(userId, type) {
    Token.deleteMany({$and:[{ _userId: userId }, {type: type}]}, function (err, results) { });
  }

  function sendTokenVerification(res, user) {
    deleteTokens(user._id, 'verification');
    var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex'), type: 'verification' });
    token.save(function (err) {
      if (err)
        return handleError(err);

      sendMail(user.email, '[Amazin] Account verification','Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/localhost:3000\/confirmation\/' + token.token + '.\n',
                function (err) {
                  if (err)
                    return handleError(err);
                  return res.json({ success: true });
                });
    });
  }

  function sendTokenReset(res, user) {
    deleteTokens(user._id, 'reset');
    var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex'), type: 'reset' });
    token.save(function (err) {
      if (err)
        return handleError(err);

      sendMail(user.email, '[Amazin] Reset password',
                'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http:\/\/localhost:3000\/reset-password\/' + token.token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n',
                function (err) {
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

      return sendTokenVerification(res, user);
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
    Token.findOne({$and:[{ token: token }, {type: 'verification'}]}, function (err, token) {
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
            return handleError(err);

          return res.json({ status: confirmationStatus.success, message: 'The account has been verified.' });
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

      sendTokenVerification(res, user);
    });
  });

  router.post('/send-reset', (req, res) => {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (!user)
        return res.json({ success: false, message: 'We were unable to find a user with that email.' });

      if (!user.isVerified)
        return res.json({ success: false, notVerified: true, message: 'This account has not been verified yet.' });

      sendTokenReset(res, user);
    });
  });

  router.get('/reset-password/:token', (req, res) => {
    const { token } = req.params;
    // Find a matching token
    Token.findOne({$and:[{ token: token }, {type: 'reset'}]}, function (err, token) {
      if (err)
        return handleError(err);
      if (!token)
        return res.json({ status: resetStatus.expired, message: 'We were unable to find a valid token. Your token my have expired.' });

      User.findOne({ _id: token._userId }, function (err, user) {
        if (!user)
          return res.json({ status: resetStatus.nouser, message: 'We were unable to find a user for this token.' });

        return res.json({ status: resetStatus.valid });
      });
    });
  });

  router.post('/reset-password', (req, res) => {
    Token.findOne({$and:[{ token: req.body.token }, {type: 'reset'}]}, function(err, token) {
      if (err)
        return handleError(err);
      if (!token)
        return res.json({ status: resetStatus.expired, message: 'We were unable to find a valid token. Your token my have expired.' });

      User.findOne({ _id: token._userId }, function (err, user) {
        if (err)
          return handleError(err);
        if (!user)
          return res.json({ status: resetStatus.nouser, message: 'We were unable to find a user for this token.' });

          bcrypt.hash(req.body.password, 10, function(err, hash) {
            if (err)
              return handleError(err);

            user.password = hash,
            user.save(function (err) {
              if (err)
                return handleError(err);
              Token.deleteOne({ _id: token._id }, function (err, results) { });

              return res.json({ status: resetStatus.success, message: 'Your password has been updated.' });
            });
          });
      });
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
    User.findOne({$or: [{ email: req.body.username }, { username: req.body.username }]}, function(err, user) {
      if (err)
        return handleError(err);
      if (!user)
        return res.json({ success: false, message: 'We were unable to find a user for this token.' });


      bcrypt.compare(req.body.password, user.password, function(err, match) {
        if (!match)
          return res.json({ success: false, message: 'Your password is incorrect' });

        // Make sure the user has been verified
        if (!user.isVerified)
          return res.json({ success: false, toVerify: true, message: 'Your account has not been verified.' });

        req.session.user = user;
        if (req.body.keepMeSignedIn)
          req.session.cookie.expires = false;
        else
          req.session.cookie.maxAge = 60 * 60 * 1000;
        res.json({ success: true });
      });
    });
  });

  router.get('/signout', (req, res) => {
    req.session.destroy(function(err) {
      if (err)
        return handleError(err);

      return res.json({ success: true });
    });
  });

  app.use('/authentification', router);
}
