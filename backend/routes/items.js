const itemsController = require('../controllers/items');

module.exports = (app, router) => {
  router.get('/randoms/:category', itemsController.findRandoms);

  app.use('/items', router);
};
