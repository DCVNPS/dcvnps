module.exports = (sequelize, DataTypes) => {

    // Implement schema here
    const Item = sequelize.define('Item',{
      sku: { type: DataTypes.INTEGER, allowNull: false, unique:'index_items_sku'},
      name: { type: DataTypes.STRING, allowNull: false},
      price: { type: DataTypes.STRING, allowNull: false },
    });
    
    return Item;
  };
