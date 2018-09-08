// const ItemModel = require('../models/mongoose/Item');

// async function getAll() {
//   return ItemModel.find({}).sort({ createdAt: -1 });
// }

// async function getOne(itemId) {
//   return ItemModel.findOne({ _id: itemId });
// }

// async function create(data) {
//   const item = new ItemModel(data);
//   return item.save();
// }

// async function update(itemId, data) {
//     const item = await getOne(itemId);
//     if( !item ) throw new Error(`Could not find item: ${itemId}`);
//     Object.keys(data).forEach((key)=>{
//             item[key] = data[key];
//     });
//     return item.save();
// };
// async function remove(query) {
//     const result = ItemModel.remove(query);
//     return result.result.n;
// }
// module.exports = {
//   getAll,
//   getOne,
//   create,
//   update,
//   remove,
// }
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
  return models.Item.findOne({ where: { id: itemId } });
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
  //This 
  return models.Item.update(
    data,
    { where: { id: itemId }},
    { transaction: t });
}

async function remove(itemId, t) {
  return models.Item.destroy({ where: { id: itemId } }, { transaction: t });
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
