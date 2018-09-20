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

module.exports = {
  findRandoms,
};
