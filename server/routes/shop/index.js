const express = require('express');
const ItemService = require('../../services/itemService');
const basketService = require('../../services/basketService');

module.exports = (config) => {
  const router = express.Router();
  const log = config.logger;
  // const basket = basketService(config.redis.client);
  const basket = basketService(config.mysql.client);
  const itemService = ItemService(config.mysql.client);
  router.get('/', async (req, res) => {
    const items = await itemService.getAll();
    return res.render('shop', { items });
  });

  router.get('/tobasket/:itemId', async (req, res) => {
    if (!res.locals.currentUser) {
      req.session.messages.push({
        type: 'warning',
        text: 'Please log in first',
      });
      return res.redirect('/shop');
    }

    try {
      await basket.add(res.locals.currentUser.userId, req.params.itemId );
      req.session.messages.push({
        type: 'success',
        text: 'The item was added to the basket',
      });
    } catch (err) {
      req.session.messages.push({
        type: 'danger',
        text: 'There was an error adding the item to the basket',
      });
      log.fatal(err);
    }

    return res.redirect('/shop');
  });

  return router;
};
