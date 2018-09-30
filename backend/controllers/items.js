const itemsService = require('../services/items');

function handleError(res, err) {
  console.log(err);
  return res.status(500).json({ success: false, message: 'Internal Server Error.' });
}

async function findRandoms(req, res) {
  try {
    const _category = req.params.category;
    const randoms = await itemsService.getRandoms({ category: _category });

    res.json({ success: true, items: randoms });
  } catch (err) {
    handleError(res, err);
  }
}

async function search(req, res) {
  try {
    const filter = (req.body.categoryValue === 'all' ? { name: { $regex: req.body.searchText, $options: 'i' } }
      : { $and: [{ [req.body.categoryLevel]: req.body.categoryValue }, { name: { $regex: req.body.searchText, $options: 'i' } }] });
    const items = await itemsService.getItems(filter);

    res.json({ success: true, items });
  } catch (err) {
    handleError(res, err);
  }
}

async function getItem(req, res) {
  try {
    const _id = req.params.id;
    const item = await itemsService.getItem({ _id });

    res.json({ success: true, item });
  } catch (err) {
    handleError(res, err);
  }
}

module.exports = {
  findRandoms,
  search,
  getItem,
};
