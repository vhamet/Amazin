const itemsService = require('../services/items');

function handleError(res, err) {
  console.log(err);
  return res.status(500).json({ success: false, message: 'Internal Server Error.' });
}

function getCart(req) {
  let { cart } = req.session;
  if (typeof (cart) === 'undefined')
    cart = [];

  return cart;
}

function addItem(req, res) {
  try {
    const cart = getCart(req);
    cart.push(req.body.item);
    req.session.cart = cart;

    res.json({ success: true, items: cart });
  } catch (err) {
    handleError(res, err);
  }
}


function getItems(req, res) {
  try {
    const cart = getCart(req);

    res.json({ success: true, cart });
  } catch (err) {
    handleError(res, err);
  }
}

module.exports = {
  addItem,
  getItems,
};
