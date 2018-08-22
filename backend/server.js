// server.js

// first we import our dependencies…
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
import { confirmationStatus } from './const';

// and create our instances
const app = express();
const router = express.Router();

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;

// db config -- set your URI from mLab in secrets.js
mongoose.connect(getSecret('dbUri'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// now we can set the route path & initialize the API
router.get('/', (req, res) => {
  console.log('get');
  if (req.session.user)
    return res.json({ success: true, logged: true });
  else
    return res.json({ success: true, logged: false });
});

function sendToken(res, user) {
  var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
  token.save(function (err) {
    if (err)
      return res.status(500).send({ msg: err.message });

    var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'devtesting.emailaddress@gmail.com', pass: getSecret('pwdGMail')}});
    var mailOptions = { from: 'no-reply@merncommentbox.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/localhost:3000\/confirmation\/' + token.token + '.\n' };
    transporter.sendMail(mailOptions, function (err) {
      if (err)
        return res.json({ success: false, message: err.message });
      return res.json({ message: 'A verification email has been sent to ' + user.email + '.' });
    });
  });
}

function saveUser(res, firstname, lastname, email, hash) {
  const user = new User();
  user.firstname = firstname;
  user.lastname = lastname;
  user.email = email;
  user.password = hash;
  user.save(err => {
    if (err)
      return res.json({ success: false, message: 'An error occured while saving your account, please try again later.' });

    sendToken(res, user);
  });
}

router.post('/signup', (req, res) => {
  User.find({email:req.body.email}, function(err,users) {
    if (err)  return res.json({ success: false, message: 'Error db: ' + err });
    else if (users.length) return res.json({ success: false, message: 'Email already used. Please use another or Log in' });
    else {
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        if (err)
          return res.json({ success: false, message: 'An error occured while creating your account, please try again later.' });
        else {
          const { firstname, lastname, email } = req.body;
          return saveUser(res, firstname, lastname, email, hash);
        }
      });
    }
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

        return res.json({  status: confirmationStatus.success, message: 'The account has been verified. Please log in.' });
      });
    });
  });
});

router.post('/resend', (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user)
      return res.json({  success: false,  message: 'We were unable to find a user with that email.' });

    if (user.isVerified)
      return res.json({  success: true,  message: 'This account has already been verified. Please log in.' });

    sendToken(res, user);
  });
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.username }, function(err, user) {
    if (!user)
      return res.json({ success: false, message: 'The email address ' + req.body.username + ' is not associated with any account. Double-check your email address and try again.'});

      console.log(req.body.passwordLogin);
    console.log(JSON.stringify(user));
    bcrypt.compare(req.body.passwordLogin, user.password, function(err, match) {
      if (!match)
        return res.json({ success: false, message: 'Invalid email or password' });

      // Make sure the user has been verified
      if (!user.isVerified)
        return res.json({ success: false, message: 'Your account has not been verified.' });

      req.session.user = user;
      res.json({ success: true });
    });
  });
});

// Use our router configuration when we call /api
app.use('/home', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
