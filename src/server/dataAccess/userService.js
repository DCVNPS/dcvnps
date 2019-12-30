//userService.js
// User service provides functions for operation on user's information

module.exports = (config) => {

    if (!config) {
        throw new Error('userService missing config object.')
    }
    const bcrypt = config.bcrypt;
    const mySQL = config.mySQL;

    function deleteByEmail(email) {
        return mySQL('users').where('email', email).delete()
            .then((r) => {
                console.log(`${r} rows effected. User ${email} deleted.`);
                return { recordDelete: true };
            })
            .catch((err) => console.error(err));
    }

    function deleteById(userId) {
        return mySQL('users').where('userId', userId).delete()
            .then(r => { return r; })
            .catch(err => { throw err; });
    }

    function createUser(user) {
        // console.log(user);
        if (!user) {
            throw new Error('createUser: user objec is undefined');
        }
        return mySQL('users')
            .insert({
                userId: user.userId,
                userName: user.email,
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

    function updateUser(user) {
        if (!user) {
            throw new Error('updateUser: user object is undefined.')
        }
        return mySQL('users')
            .where({ userId: user.userId })
            .update({
                userName: user.email,
                userSurname: user.userSurname,
                userGivenName: user.userGivenName,
                password: user.password,
                roleCode: user.roleCode,
                updatedUserId: user.updatedUserId,
                updatedDate: user.updatedDate
            })
            .then((r) => {
                console.log(`${r} record(s) updated.`);
                return {recordUpdated: true};
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }

    function selectByEmail(email) {
        return mySQL('users')
            .whereRaw('email = IFNULL(?,email)', [email])
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
        return mySQL('users')
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
        deleteByEmail,
        deleteById,
        createUser,
        updateUser,
        selectByEmail,
        selectById
    }
}
