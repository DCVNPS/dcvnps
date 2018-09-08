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
  return models.User.findAll({ where: {}});
}

async function getOne(userId){
  return models.User.findOne({ where:{userId: userId}});
}

async function create(data,t) {
  const order = await models.User.create({
    email: data.email,
    password: data.password,
    status: data.status,
  },{ transaction: t });
  return order;
}

async function update(userId, data, t) {
  //This 
  return models.User.update(
    data, 
    { where: { userId: userId } , individualHooks: (data.password && data.password.length > 0) ? true:false},
    { transaction: t });
}

async function remove(userId, t){
  return models.User.destroy({where: {userId:userId}},{ transaction:  t});
}

module.exports = (_client) => {
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
