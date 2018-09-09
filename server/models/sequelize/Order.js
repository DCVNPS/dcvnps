module.exports = (sequelize, DataTypes) => {

  // Implement schema here
  const Order = sequelize.define('Order', {
    orderId: { type: DataTypes.INTEGER, allowNUll: false, primaryKey: true, autoIncrement: true },
    userId: DataTypes.STRING(36),
    email: DataTypes.STRING,
    status: DataTypes.STRING,
  },
    {
      timestamps: true,
      createdAt: 'createdDate',
      updatedAt: 'updatedDate',
      deletedAt: false,
      paranoid: false,
    });

  Order.associate = models => Order.hasMany(models.OrderItem);

  return Order;
};
