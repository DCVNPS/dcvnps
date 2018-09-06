const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

module.exports = (sequelize, DataTypes) => {
    // Implement schema dcnvps
    const User = sequelize.define('User', {
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING(64), allowNull: false },
        status: { type: DataTypes.STRING(5), allowNull: false },
    }

        , {
            hooks: {
                beforeCreate: (user, options) => {
                    const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
                    user.password = bcrypt.hashSync(user.password, salt);
                },
                beforeUpdate: (user, options) => {
                    const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
                    user.password = bcrypt.hashSync(user.password, salt);    
                }
            },
            instanceMethods: {
                validatePassword: async (candiatePassword) => {
                    return await bcrypt.compare(candiatePassword, this.password);
                }
            }
        }
    );

    return User;
};

