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

async function getAll(userId, t) {
    const basketItems = [];
    const data = await models.Basket.findAll({ where: { userId } }, t);
    Object.keys(data).forEach((key) => {
        basketItems.push(data[key]);
    });
    return basketItems;
}

async function getOne(userId, itemId, t) {
    return models.Basket.findAll({ where: { userId, itemId } }, { transaction: t });
}

// Update User's basket item. data:{itemId, quantity }
async function update(userId, itemId, quantity, t) {
    return models.Basket.update({
        quantity,
    }, {
            where: { userId, itemId },
        }, { transaction: t });
}

async function add(userId, itemId, t) {
    try {
        let basketItem = await getOne(userId, itemId);
        if (!basketItem.length > 0) {
            basketItem = await models.Basket.create({
                userId,
                itemId,
            }, { transaction: t });
        } else {
            basketItem[0].quantity += 1;
            await update(basketItem[0].userId, basketItem[0].itemId, basketItem[0].quantity);
        }
        return basketItem;
    } catch (error) {
        throw error;
    }
}

async function remove(userId, itemId, t) {
    return models.Basket.destroy({ where: { userId, itemId } }, { transaction: t });
}

module.exports = (_client) => {
    if (!_client) throw new Error('Missing sequelize client object');
    models = Models(_client);
    client = _client;

    return {
        getAll,
        getOne,
        add,
        update,
        remove,
        inTransaction,
    };
};

// let client = null;
// //add
// async function add(itemId, userId) {
//     return new Promise((resolve, reject) => {
//         client.hget(`basket: ${userId}`, itemId, (gerr, obj) => {
//             if (gerr) return reject(gerr);
//             if (!obj) {
//                 return client.hset(`basket:${userId}`, itemId, 1, (serr, result) => {
//                     if (serr) return reject(serr);
//                     return resolve(result);
//                 })
//             }
//         });
//         return client.hincrby(`basket:${userId}`, itemId, 1, (incerr, res) => {
//             if (incerr) return reject(incerr);
//             return resolve(res);
//         });
//     });
// }

// // getAll
// async function getAll(userId) {
//     return new Promise((resolve, reject) => {
//         client.hgetall(`basket:${userId}`, (err, res) => {
//             if (err) return reject(err);
//             return resolve(res);
//         });
//     });
// }

// // remove
// async function remove(userId, itemId) {
//     return new Promise((resolve, reject) => {
//         client.hdel(`basket:${userId}`, itemId, (err, res) => {
//             if (err) return reject(err);
//             return resolve(res);
//         });
//     });
// }
// module.exports = (_client) => {
//     if (!_client) throw new Error('Missing redis client object');
//     client = _client;
//     return {
//         add,
//         getAll,
//         remove,
//     }
// };
