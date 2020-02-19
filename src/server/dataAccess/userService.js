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
                email: user.email,
                userSurname: user.userSurname,
                userGivenName: user.userGivenName,
                password: user.password,
                activeInd: user.activeInd,
                roleCode: user.roleCode,
                createdUserId: user.createdUserId,
                createdDate: user.createdDate,
                updatedUserId: user.updatedUserId,
                updatedDate: user.updatedDate
            })
            .then(async () => {
                try {
                    const nUser = await selectById(user.userId);
                    return nUser;
                } 
                catch (error) {
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
                email: user.email,
                userSurname: user.userSurname,
                userGivenName: user.userGivenName,
                password: user.password,
                roleCode: user.roleCode,
                activeInd: user.activeInd,
                updatedUserId: user.updatedUserId,
                updatedDate: user.updatedDate
            })
            .then((r) => {
                console.log(`${r} record(s) updated.`);
                return { recordUpdated: true };
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }

    function setPassword(user) {
        if (!user) {
            throw new Error('updateUser: user object is undefined.')
        }
        return mySQL('users')
            .where({ userId: user.userId })
            .update({
                password: user.password,
                updatedUserId: user.updatedUserId,
                updatedDate: user.updatedDate
            })
            .then((r) => {
                console.log(`${r} record(s) updated.`);
                return { recordUpdated: true };
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }

    function selectByEmail(email) {
        return mySQL({u:'users'})
            .whereRaw('u.email = IFNULL(?,u.email)', [email])
            .select({
                userId: 'u.userId',
                email: 'u.email',
                userSurname: 'u.userSurname',
                userGivenName: 'u.userGivenName',
                password: 'u.password',
                activeInd: 'u.activeInd',
                roleCode: 'u.roleCode',
                roleDescription: mySQL.raw('(select `r`.`roleDescription` from `roles` as  `r` where `r`.`roleCode` = `u`.`roleCode`)') ,
                createdUserId: 'u.createdUserId',
                createdDate: 'u.createdDate',
                updatedUserId: 'u.updatedUserId',
                updatedDate: 'u.updatedDate'
            })
            .then((users) => {
                // console.log('Knex log getUserByName', JSON.stringify(users));
                return users;
            })
            .catch(function (err) {
                throw err;
            });
    }

    function selectById(userId) {
        return mySQL({u:'users'})
            .whereRaw('u.userId = IFNULL(?,u.userId)', [userId])
            .select({
                userId: 'u.userId',
                email: 'u.email',
                userSurname: 'u.userSurname',
                userGivenName: 'u.userGivenName',
                password: 'u.password',
                activeInd: 'u.activeInd',
                roleCode: 'u.roleCode',
                roleDescription: mySQL.raw('(select `r`.`roleDescription` from `roles` as  `r` where `r`.`roleCode` = `u`.`roleCode`)') ,
                createdUserId: 'u.createdUserId',
                createdDate: 'u.createdDate',
                updatedUserId: 'u.updatedUserId',
                updatedDate: 'u.updatedDate'
            })
            .then((users) => {
                return users;
            })
            .catch(function (err) {
                throw err;
            });
    }

    function siteUsers(userId){
        return mySQL({ u: 'users'})
            .select({
                userId: 'u.userId',
                email: 'u.email',
                userSurname: 'u.userSurname',
                userGivenName: 'u.userGivenName',
                password: 'u.password',
                activeInd: 'u.activeInd',
                roleCode: 'u.roleCode',
                roleDescription: mySQL.raw('(select `r`.`roleDescription` from `roles` as  `r` where `r`.`roleCode` = `u`.`roleCode`)') ,
                createdUserId: 'u.createdUserId',
                createdDate: 'u.createdDate',
                updatedUserId: 'u.updatedUserId',
                updatedDate: 'u.updatedDate'
            })
            .whereRaw('`u`.`userId` = IFNULL(?,`u`.`userId`)', [userId])
            .then((users) => {
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
        setPassword,
        selectByEmail,
        selectById,
        siteUsers
    }
}
