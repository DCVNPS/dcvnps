const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

module.exports = (sequelize, DataTypes) => {
    // Implement schema dcnvps
    const User = sequelize.define(
        'User',
        {
            user_id: {
                type: DataTypes.UUID,
                unique: true,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            email: { type: DataTypes.STRING, allowNull: false },
            password: { type: DataTypes.STRING(64), allowNull: false },
            role: {
                type: DataTypes.STRING(45),
                allowNull: false,
                defaultValue: 'VNPS_USER',
            },
            status: { type: DataTypes.STRING(5), allowNull: false },
        },
        {
            timestamps: true,
            createdAt: 'created_date',
            updatedAt: 'updated_date',
            deletedAt: 'deleted_date',
            paranoid: false,
            hooks: {
                beforeCreate: async (user) => {
                    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
                    user.password = await bcrypt.hash(user.password, salt);
                },
                beforeUpdate: async (user) => {
                    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            instanceMethods: {
                validatePassword: async (candiatePassword) => {
                    const isMatch = await bcrypt.compare(candiatePassword, this.passwordHash);
                    return isMatch;
                }
            },
            comment: 'Users table: Store user credential.',
        },
    );
    User.associate = (models) => { User.hasMany(models.Post, { foreignKey: 'user_id' }); };
    return User;
};

