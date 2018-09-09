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
    const orders = await models.Order.findAll({ where: {}, include: [models.OrderItem] });
    return orders;
}

async function create(user, items, t) {
    const order = await models.Order.create({
        userId: user.userId,
        email: user.email,
        status: 'Not shipped',
    }, { transaction: t });

    return Promise.all(items.map(async (item) => {
        const orderItem = await models.OrderItem.create({
            sku: item.sku,
            qty: item.quantity,
            name: item.name,
            price: item.price,
            orderId: order.orderId,
        }, { transaction: t });
        return order.addOrderItem(orderItem, { transaction: t });
    }));
}

async function setStatus(orderId, status) {
    return models.Order.update({ status }, { where: { orderId } });
}
module.exports = (_client) => {
    if (!_client) throw new Error('Missing sequelize client object');
    models = Models(_client);
    client = _client;

    return {
        getAll,
        create,
        setStatus,
        inTransaction,
    };
};
