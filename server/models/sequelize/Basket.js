module.exports = (sequelize, DataTypes) => {
    // Implement schema here
    const Basket = sequelize.define(
        'Basket', {
            userId: { type: DataTypes.STRING(36), allowNUll: false, primaryKey: 'pk_bsk_uer_item_id' },
            itemId: { type: DataTypes.INTEGER, allowNUll: false, primaryKey: 'pk_bsk_user_item_id' },
            quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        },
        {
            timestamps: true,
            createdAt: 'createdDate',
            updatedAt: 'updatedDate',
            deletedAt: false,
            paranoid: false,
        },
    );

    return Basket;
};
