const express = require('express');
const ItemService = require('../../services/itemService');
const BasketService = require('../../services/basketService');
const OrderService = require('../../services/orderService');

module.exports = (config) => {
  const router = express.Router();
  const log = config.logger;
  // const basket = basketService(config.redis.client);
  const basketService = BasketService(config.mysql.client);
  const orderService = OrderService(config.mysql.client);
  const itemService = ItemService(config.mysql.client);

  router.get('/', async (req, res) => {
    const basketItems = await basketService.getAll(res.locals.currentUser.userId);
    let items = [];
    if (basketItems) {
      items = await Promise.all(Object.keys(basketItems).map(async (key) => {
        const item = await itemService.getOne(basketItems[key].itemId);
        item.quantity = basketItems[key].quantity;
        return item;
      }));
    }
    return res.render('basket', { items });
  });

  router.get('/remove/:itemId', async (req, res) => {
    if (!res.locals.currentUser) {
      req.session.messages.push({
        type: 'warning',
        text: 'Please log in first',
      });
      return res.redirect('/shop');
    }

    try {
      await basketService.remove(req.params.itemId, res.locals.currentUser.id);
      req.session.messages.push({
        type: 'success',
        text: 'The item was removed from the the basket',
      });
    } catch (err) {
      req.session.messages.push({
        type: 'danger',
        text: 'There was an error removing the item from the basket',
      });
      log.fatal(err);
      return res.redirect('/basket');
    }

    return res.redirect('/basket');
  });

  router.get('/buy', async (req, res) => {
    try {
      const user = res.locals.currentUser;
      const { userId } = user;
      // Get all basket items for a user
      const basketItems = await basketService.getAll(userId);

      // be defensive
      if (!basketItems) {
        throw new Error('No items found in basket');
      }

      // Find the item for each basket entry and add the quantity to it
      // Return a new array with items plus quantity as new field
      const items = await Promise.all(Object.keys(basketItems).map(async (key) => {
        const item = await itemService.getOne(basketItems[key].itemId);
        item.quantity = basketItems[key].quantity;
        return item;
      }));

      // Run this in a sequelize transaction
      await orderService.inTransaction(async (t) => {
        // Create a new order and add all items
        await orderService.create(user, items, t);
        // Clear the users basket
        await Promise.all(Object.keys(basketItems).map(async (key) => {
          await basketService.remove(userId, basketItems[key].itemId);
        }));
      });

      req.session.messages.push({
        type: 'success',
        text: 'Thank you for your business',
      });
      return res.redirect('/basket');
    } catch (err) {
      req.session.messages.push({
        type: 'danger',
        text: 'There was an error finishing your order',
      });
      log.debug(err);
      return res.redirect('/basket');
    }
  });

  return router;
};
