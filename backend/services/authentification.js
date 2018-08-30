import mongoose from 'mongoose';
import User from '../models/user';
import Token from '../models/token';
import { getProtectedValue } from '../protected';
var crypto = require('crypto');

function test() {
  return new Promise((resolve, reject) => {
    User.find({}, function(err, users) {
      if (err)
        reject(err);

      resolve(users);
    });
  });
}

function getUser(filter) {
  return new Promise((resolve, reject) => {
    User.findOne(filter, function(err, user) {
      if (err)
        reject(err);

      resolve(user);
    });
  });
}

function createUser(username, email, hash) {
  const user = new User({ username: username, email: email, password: hash });
  return new Promise((resolve, reject) => {
    user.save(err => {
      if (err)
        reject(err);

      resolve(user);
    });
  });
}

function updateUser(user) {
  return new Promise((resolve, reject) => {
    user.save(function (err) {
      if (err)
        reject(err);

      resolve(user);
    });
  });
}

function getToken(filter) {
  return new Promise((resolve, reject) => {
    Token.findOne(filter, function(err, token) {
      if (err)
        reject(err);

      resolve(token);
    });
  });
}

function createToken(userId, type) {
  var token = new Token({ _userId: userId, token: crypto.randomBytes(16).toString('hex'), type: type });
  return new Promise((resolve, reject) => {
    token.save(function (err) {
      if (err)
        reject(err);

      resolve(token);
    });
  });
}

function deleteToken(id) {
  return new Promise((resolve, reject) => {
    Token.deleteOne({ _id: id }, function (err, result) {
      if (err)
        reject(err);

      resolve(result);
    });
  });
}

function deleteTokens(userId, type) {
  return new Promise((resolve, reject) => {
    Token.deleteMany({$and:[{ _userId: userId }, {type: type}]}, function (err, result) {
      if (err)
        reject(err);

      resolve(result);
    });
  });
}

module.exports = {
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  getToken: getToken,
  createToken: createToken,
  deleteToken: deleteToken,
  deleteTokens: deleteTokens
};
