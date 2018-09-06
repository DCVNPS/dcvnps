module.exports = (sequelize, DataTypes) => {

  // Implement schema here
  const OrderItem = sequelize.define('OrderItem',{
    sku: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
  });

  OrderItem.associate = (models)=>{
    OrderItem.belongsTo(models.Order,{
      onDelete:'CASCADE',
      foreignKey:{
        allowNull:false,
      },
    });
  };

  return OrderItem;
};
