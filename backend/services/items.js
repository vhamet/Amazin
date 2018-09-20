import Item from '../models/item';

function getRandoms(filter) {
  return new Promise((resolve, reject) => {
    Item.findRandom(filter, {}, { limit: 10 }, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
}

module.exports = {
  getRandoms,
};
