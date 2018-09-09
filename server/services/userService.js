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
  return models.User.findAll({ where: {} });
}

async function getOne(userId) {
  return models.User.findOne({ where: { userId } });
}

async function create(data, t) {
  const order = await models.User.create({
    email: data.email,
    password: data.password,
    status: data.status,
  }, { transaction: t });
  return order;
}

async function update(userId, data, t) {
  const individualHook = (data.password && data.password.length > 0);
  return models.User.update(
    data,
    { where: { userId }, individualHooks: individualHook },
    { transaction: t },
  );
}

async function remove(userId, t) {
  return models.User.destroy({ where: { userId } }, { transaction: t });
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
