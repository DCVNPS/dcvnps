const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

module.exports = (sequelize, DataTypes) => {
    // Implement schema dcnvps
    const User = sequelize.define('User',
        {
            userId: { type: DataTypes.UUID, unique: true, primaryKey:true, defaultValue:DataTypes.UUIDV4 },
            email: { type: DataTypes.STRING, allowNull: false },
            password: { type: DataTypes.STRING(64), allowNull: false },
            status: { type: DataTypes.STRING(5), allowNull: false },
        },
        {
            timestamps: true,
            createdAt:'createdDate',
            updatedAt:'updatedDate',
            deletedAt:false,
            paranoid:false,
            hooks: {
                beforeCreate: async (user, options) => {
                    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
                    user.password = await bcrypt.hash(user.password, salt);
                },
                beforeUpdate: async (user, options) => {
                    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            instanceMethods: {
                validatePassword: async (candiatePassword) => {
                    const isMatch = await bcrypt.compare(plaintextPassword, this.passwordHash);
                    return isMatch;
                }
            },
            comment:'Users table: Store user credential.'
        }
    );

    return User;
};

