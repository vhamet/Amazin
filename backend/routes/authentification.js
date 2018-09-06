const authentificationController = require('../controllers/authentification');

module.exports = (app, router) => {
  router.get('/', authentificationController.index);
  router.post('/check-user-exists', authentificationController.checkUserExists);
  router.post('/signin', authentificationController.signin);
  router.post('/available', authentificationController.available);
  router.post('/signup', authentificationController.signup);
  router.get('/confirmation/:token', authentificationController.confirmation);
  router.post('/resend', authentificationController.resend);
  router.post('/send-reset', authentificationController.sendReset);
  router.get('/reset-password/:token', authentificationController.gResetPassword);
  router.post('/reset-password', authentificationController.pResetPassword);
  router.get('/signout', authentificationController.signout);

  app.use('/authentification', router);
};
