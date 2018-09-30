import Item from '../models/item';

function getRandoms(filter) {
  return new Promise((resolve, reject) => {
    Item.findRandom(filter, {}, { limit: 10 }, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
}

function getItems(filter) {
  return new Promise((resolve, reject) => {
    Item.find(filter, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
}

function getItem(filter) {
  return new Promise((resolve, reject) => {
    Item.findOne(filter, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
}

module.exports = {
  getRandoms,
  getItems,
  getItem,
};
