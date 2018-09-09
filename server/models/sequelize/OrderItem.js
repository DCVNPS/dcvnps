module.exports = (sequelize, DataTypes) => {

  // Implement schema here
  const OrderItem = sequelize.define('OrderItem', {
    orderItemId: { type: DataTypes.INTEGER, allowNUll: false, primaryKey: true, autoIncrement: true },
    sku: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
  },
    {
      timestamps: true,
      createdAt: 'createdDate',
      updatedAt: 'updatedDate',
      deletedAt: false,
      paranoid: false,
    });

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'orderId',
        allowNull: false,
      },
    });
  };

  return OrderItem;
};
