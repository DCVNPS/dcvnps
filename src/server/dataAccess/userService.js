//userService.js
// User service provides functions for operation on user's information
const bcrypt = require('bcrypt');

module.exports = (knex) => {
    if (!knex) {
        throw new Error('Missing Knex client object.')
    }
    function deleteByName(userName) {
        return knex('users').where('userName', userName).delete()
            .then((r) => {
                console.log(`${r} rows effected. User ${userName} deleted.`);
                return { recordDelete: true };
            })
            .catch((err) => console.error(err));
    }

    function deleteById(userId) {
        return knex('users').where('userId', userId).delete()
            .then(r => { return r; })
            .catch(err => { throw err; });
    }

    function createUser(user) {
        console.log(user);
        return knex('users')
            .insert({
                userId: user.userId,
                userName: user.userName,
                userSurname: user.userSurname,
                userGivenName: user.userGivenName,
                password: user.password,
                roleCode: user.roleCode,
                createdUserId: user.createdUserId,
                createdDate: user.createdDate,
                updatedUserId: user.updatedUserId,
                updatedDate: user.updatedDate
            })
            .then(async () => {
                try {
                    const nUser = await getUserById(user.userId);
                    const response = {
                        'success': true,
                        'authmsg': 'Register Success',
                        'authuser': {
                            'userId': nUser.userId,
                            'userName': nUser.userName,
                            'roleCode': nUser.roleCode
                        }
                    }
                    return response;
                } catch (error) {
                    throw error;
                }
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }

    function selectByName(userName) {
        return knex('users')
            .whereRaw('userName = IFNULL(?, userName)', [userName])
            .select()
            .then((users) => {
                // console.log('Knex log getUserByName', JSON.stringify(users));
                return users;
            })
            .catch(function (err) {
                throw err;
            });
    }

    function selectById(userId) {
        return knex('users')
            .whereRaw('userId = IFNULL(?,userId)', [userId])
            .select()
            .then((users) => {
                // console.log('Knex log getUserById', JSON.stringify(user));
                return users;
            })
            .catch(function (err) {
                throw err;
            });
    }
    return {
        deleteByName: deleteByName,
        deleteById: deleteById,
        createUser: createUser,
        selectByName: selectByName,
        selectById: selectById
    }
}
