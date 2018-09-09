const express = require('express');
const OrderService = require('../../../services/orderService');

module.exports = (config) => {
  const orderService = OrderService(config.mysql.client);
  const router = express.Router();
  const log = config.logger;

  router.get('/', async (req, res) => {
    // return res.render('admin/orders', {});
    try {
      // Get all orders
      const orderResult = await orderService.getAll();
      // Run map on the data to convert it into nested arrays with orders and orderitems
      const orders = await orderResult.map(item => item.get({ plain: true }));
      return res.render('admin/orders', { orders });
    } catch (err) {
      req.session.messages.push({
        type: 'danger',
        text: 'There was an error fetching the orders',
      });
      log.fatal(err);
      return res.redirect('/admin/orders');
    }
  });

  // router.get('/setshipped/:orderId', async (req, res, next) => {
    // return next('Not Implemented');
  router.get('/setshipped/:orderId', async (req, res) => {
    try {
      await orderService.setStatus(req.params.orderId, 'Shipped');
      req.session.messages.push({
        type: 'success',
        text: 'Status updated',
      });
      return res.redirect('/admin/orders');
    } catch (err) {
      req.session.messages.push({
        type: 'danger',
        text: 'There was an updaeting the order',
      });
      log.fatal(err);
      return res.redirect('/admin/orders');
    }
  });

  return router;
};

