const itemsController = require('../controllers/items');

module.exports = (app, router) => {
  router.get('/randoms/:category', itemsController.findRandoms);
  router.post('/search', itemsController.search);
  router.get('/get/:id', itemsController.getItem);

  app.use('/items', router);
};
