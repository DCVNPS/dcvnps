const Models = require('../models/sequelize');

let client = null;
let models = null;

async function inTransaction(work) {
  const t = await client.transaction();

  try {
    await work(t);
    return t.commit();
  } catch (err) {
    t.rollback();
    throw err;
  }
}

async function getAll() {
  return models.Item.findAll({ where: {} });
}

async function getOne(itemId) {
  return models.Item.findOne({ where: { itemId } });
}

async function create(data, t) {
  const order = await models.Item.create({
    sku: data.sku,
    name: data.name,
    price: data.price,
  }, { transaction: t });
  return order;
}

async function update(itemId, data, t) {
  const item = await getOne(itemId);
  if (!item) throw new Error('Could not find requested item');
  return models.Item.update(
    data,
    { where: { itemId } },
    { transaction: t },
  );
}

async function remove(itemId, t) {
  return models.Item.destroy({ where: { itemId } }, { transaction: t });
}

module.exports = (_client) => {
  if (!_client) throw new Error('Missing sequelize client object');
  client = _client;
  models = Models(client);

  return {
    inTransaction,
    getAll,
    getOne,
    create,
    update,
    remove,
  };
};
