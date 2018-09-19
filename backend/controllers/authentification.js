const authentificationService = require('../services/authentification');
const utils = require('../utils');

function handleError(res, err) {
  console.log(err);
  return res.status(500).json({ success: false, message: 'Internal Server Error.' });
}

function index(req, res) {
  res.json({ signedIn: typeof (req.session) !== 'undefined' && typeof (req.session.user) !== 'undefined' });
}

async function checkUserExists(req, res) {
  try {
    const user = await authentificationService.getUser({ $or: [{ email: req.body.username }, { username: req.body.username }] });
    if (!user)
      return res.json({ success: false, message: 'We were unable to find a user with that email or username.' });

    res.json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
}

async function signin(req, res) {
  try {
    const user = await authentificationService.getUser({ $or: [{ email: req.body.username }, { username: req.body.username }] });
    if (!user)
      return res.json({ success: false, message: 'We were unable to find a user with that email or username.' });

    const match = await user.comparePassword(req.body.password);
    if (!match)
      return res.json({ success: false, message: 'Your password is incorrect.' });

    if (!user.isVerified)
      return res.json({ success: false, toVerify: true, message: 'Your account has not been verified.' });

    req.session.user = user;
    if (req.body.keepMeSignedIn)
      req.session.cookie.expires = false;
    else
      req.session.cookie.maxAge = 60 * 60 * 1000;
    res.json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
}

async function available(req, res) {
  try {
    const user = await authentificationService.getUser({ [req.body.field]: req.body.value });
    res.json({ available: !user });
  } catch (err) {
    handleError(res, err);
  }
}

async function signup(req, res) {
  try {
    let user = await authentificationService.getUser({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    if (user) {
      if (user.username === req.body.username)
        return res.json({ success: false, message: 'Username already used. Please chose another one.' });

      return res.json({ success: false, message: 'Email already used. Please use another one or sign in.' });
    }

    const hash = await utils.hashPassword(req.body.password);
    const { username, email } = req.body;
    user = await authentificationService.createUser(username, email, hash);

    await sendTokenVerification(user);

    res.json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
}

async function sendTokenVerification(user) {
  await authentificationService.deleteTokens(user._id, 'verification');
  const token = await authentificationService.createToken(user._id, 'verification');
  await utils.sendMail(
    user.email,
    '[Amazin] Account verification',
    `Welcome to Amazin !\n\n
    Please complete your subscription by clicking the following link or pasting it into your browser :\n\n
    http://localhost:3000/confirmation/${token.token} \n`,
  );
}

async function confirmation(req, res) {
  try {
    const _token = req.params.token;
    const token = await authentificationService.getToken({ $and: [{ token: _token }, { type: 'verification' }] });
    if (!token)
      return res.json({ status: utils.confirmationStatus.expired, message: 'We were unable to find a valid token. Your token my have expired.' });

    const user = await authentificationService.getUser({ _id: token._userId });
    if (!user)
      return res.json({ status: utils.confirmationStatus.nouser, message: 'We were unable to find a user for this token.' });
    if (user.isVerified)
      return res.json({ status: utils.confirmationStatus.verified, message: 'This user has already been verified.' });

    user.isVerified = true;
    await authentificationService.updateUser(user);

    res.json({ status: utils.confirmationStatus.success, message: 'The account has been verified.' });
  } catch (err) {
    handleError(res, err);
  }
}

async function resend(req, res) {
  try {
    const user = await authentificationService.getUser({ email: req.body.email });
    if (!user)
      return res.json({ success: false, message: 'We were unable to find a user with that email.' });
    if (user.isVerified)
      return res.json({ success: false, message: 'This account has already been verified. Please sign in.' });

    await sendTokenVerification(user);

    res.json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
}

async function sendReset(req, res) {
  try {
    const user = await authentificationService.getUser({ email: req.body.email });
    if (!user)
      return res.json({ success: false, message: 'We were unable to find a user with that email.' });
    if (!user.isVerified)
      return res.json({ success: false, notVerified: true, message: 'This account has not been verified yet.' });

    await authentificationService.deleteTokens(user._id, 'reset').catch(err => console.log(err));
    const token = await authentificationService.createToken(user._id, 'reset');
    await utils.sendMail(
      user.email,
      '[Amazin] Reset password',
      `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      http://localhost:3000/reset-password/${token.token}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    );

    res.json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
}

async function gResetPassword(req, res) {
  try {
    const _token = req.params.token;
    const token = await authentificationService.getToken({ $and: [{ token: _token }, { type: 'reset' }] });
    if (!token)
      return res.json({ status: utils.resetStatus.expired, message: 'We were unable to find a valid token. Your token my have expired.' });

    const user = await authentificationService.getUser({ _id: token._userId });
    if (!user)
      return res.json({ status: utils.resetStatus.nouser, message: 'We were unable to find a user for this token.' });

    res.json({ status: utils.resetStatus.valid });
  } catch (err) {
    handleError(res, err);
  }
}

async function pResetPassword(req, res) {
  try {
    const token = await authentificationService.getToken({ $and: [{ token: req.body.token }, { type: 'reset' }] });
    if (!token)
      return res.json({ status: utils.resetStatus.expired, message: 'We were unable to find a valid token. Your token my have expired.' });

    const user = await authentificationService.getUser({ _id: token._userId });
    if (!user)
      return res.json({ status: utils.resetStatus.nouser, message: 'We were unable to find a user for this token.' });

    const hash = await utils.hashPassword(req.body.password);
    user.password = hash;
    await authentificationService.updateUser(user);
    authentificationService.deleteToken({ id: token._id }).catch(err => console.log(err));

    res.json({ status: utils.resetStatus.success, message: 'Your password has been updated.' });
  } catch (err) {
    handleError(res, err);
  }
}

function signout(req, res) {
  req.session.destroy((err) => {
    if (err)
      return handleError(err);

    res.json({ success: true });
  });
}

module.exports = {
  index,
  checkUserExists,
  signin,
  available,
  signup,
  confirmation,
  resend,
  sendReset,
  gResetPassword,
  pResetPassword,
  signout,
};
