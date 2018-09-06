import User from '../models/user';
import Token from '../models/token';

const crypto = require('crypto');

function getUser(filter) {
  return new Promise((resolve, reject) => {
    User.findOne(filter, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
}

function createUser(username, email, hash, isVerified) {
  const user = new User({ username, email, password: hash, isVerified });
  return new Promise((resolve, reject) => {
    user.save((err) => {
      if (err) reject(err);
      resolve(user);
    });
  });
}

function updateUser(user) {
  return new Promise((resolve, reject) => {
    user.save((err) => {
      if (err) reject(err);
      resolve(user);
    });
  });
}

function getToken(filter) {
  return new Promise((resolve, reject) => {
    Token.findOne(filter, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

function createToken(userId, type) {
  const token = new Token({ _userId: userId, token: crypto.randomBytes(16).toString('hex'), type });
  return new Promise((resolve, reject) => {
    token.save((err) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

function deleteToken(id) {
  return new Promise((resolve, reject) => {
    Token.deleteOne({ _id: id }, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

function deleteTokens(userId, type) {
  return new Promise((resolve, reject) => {
    Token.deleteMany({ $and: [{ _userId: userId }, { type }] }, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  getToken,
  createToken,
  deleteToken,
  deleteTokens,
};
