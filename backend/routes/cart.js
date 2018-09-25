const cartController = require('../controllers/cart');

module.exports = (app, router) => {
  router.post('/addItem', cartController.addItem);
  router.get('/getItems', cartController.getItems);

  app.use('/cart', router);
};
