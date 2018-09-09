module.exports = (sequelize, DataTypes) => {

  // Implement schema here
  const Item = sequelize.define('Item', {
    itemId: { type: DataTypes.INTEGER, allowNUll: false, primaryKey: true, autoIncrement: true },
    sku: { type: DataTypes.INTEGER, allowNull: false, unique: 'index_items_sku' },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
  },
    {
      timestamps: true,
      createdAt: 'createdDate',
      updatedAt: 'updatedDate',
      deletedAt: false,
      paranoid: false,
    });

  return Item;
};
