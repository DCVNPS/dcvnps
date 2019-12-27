//userService.js
// User service provides functions for operation on user's information
const bcrypt = require('bcrypt');

module.exports = (knex) => {
    if (!knex) {
        throw new Error('Missing Knex client object.')
    }
    function authenticate({ username, password }) {
        let response = undefined;
        return knex('users')
            .whereRaw('userName=?', [username])
            .first('userId', 'userName', 'password', 'roleCode')
            .then((user) => {
                if (!user) {
                    return response = {
                        success: false,
                        status: 401,
                        authmsg: `User  Not Found -- ${username} .`,
                        authuser: undefined
                    };
                }
                const pwdMatch = bcrypt.compareSync(password, user.password);
                // console.log({match: pwdMatch,   userpwd: user.password, inpwd:password});
                if (pwdMatch) {
                    response = {
                        success: true,
                        status: 200,
                        authmsg: 'Authenticate Success',
                        authuser: {
                            userId: user.userId,
                            userName: user.userName,
                            roleCode: user.roleCode
                        }
                    };
                } else
                    response = {
                        success: false,
                        status: 401,
                        authmsg: 'Authenticate failed. Invalid username/password.',
                        authuser: undefined
                    };
                return response;
            })
            .catch((err) => { throw err; });
    }

    function changePassword(userName, oldPassword, encryptedNewPassword) {
        // console.log(`changePassword DB ${userName}  -- ${oldPassword} -- ${encryptedNewPassword}`);
        return authenticate({ username: userName, password: oldPassword })
            .then(res => {
                if (res.success) {
                    // console.log('chagne password authentication success');
                    // console.log(res);
                    const authuser = res.authuser;
                    return knex('users')
                        .whereRaw("userId=?", [authuser.userId])
                        .update({ password: encryptedNewPassword })
                        .then(() => {
                            return {
                                success: true,
                                status: 200,
                                authuser: {
                                    userId: authuser.userId,
                                    userName: authuser.userName,
                                    roleCode: authuser.roleCode
                                }
                            }
                        })
                        .catch(error => { throw error; });
                } else {
                    return res;
                }
            })
            .catch(error => { throw error; });
    }
    return {
        uuid: async () => {
            try {
                const data = await knex.raw('select uuid() as uuid');
                const jsonString = JSON.stringify(data);
                const jsonValue = JSON.parse(jsonString);
                return jsonValue[0][0];
            }
            catch (error) {
                console.log(error);
                throw error;
            };
        },
        authenticate: authenticate,
        changePassword: changePassword
    }
}