import { Config } from '../config';

export class UsersDataService {
    private config: Config = new Config();
    private mySQL: any;

    constructor() {
        this.mySQL = this.config.mySQL;
    }

    public deleteByEmail(email) {
        return this.mySQL('users').where('email', email).delete()
            .then((r) => {
                console.log(`${r} rows effected. User ${email} deleted.`);
                return { recordDelete: true };
            })
            .catch((err) => console.error(err));
    }

    public deleteById(userId) {
        return this.mySQL('users').where('userId', userId).delete()
            .then(r => { return r; })
            .catch(err => { throw err; });
    }

    public createUser(user) {
        // console.log(user);
        if (!user) {
            throw new Error('createUser: user objec is undefined');
        }
        return this.mySQL('users')
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
            .then( () => {
                return this.selectById(user.userId);
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }

    public updateUser(user) {
        if (!user) {
            throw new Error('updateUser: user object is undefined.');
        }
        return this.mySQL('users')
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
            });
    }

    public setPassword(user) {
        if (!user) {
            throw new Error('updateUser: user object is undefined.');
        }
        return this.mySQL('users')
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
            });
    }

    public selectByEmail(email) {
        return this.mySQL({u: 'users'})
            .whereRaw('u.email = IFNULL(?,u.email)', [email])
            .select({
                userId: 'u.userId',
                email: 'u.email',
                userSurname: 'u.userSurname',
                userGivenName: 'u.userGivenName',
                password: 'u.password',
                activeInd: 'u.activeInd',
                roleCode: 'u.roleCode',
                roleDescription: this.mySQL.raw('(select `r`.`roleDescription` from `roles` as  `r` where `r`.`roleCode` = `u`.`roleCode`)') ,
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

    public selectById(userId) {
        return this.mySQL({u: 'users'})
            .whereRaw('u.userId = IFNULL(?,u.userId)', [userId])
            .select({
                userId: 'u.userId',
                email: 'u.email',
                userSurname: 'u.userSurname',
                userGivenName: 'u.userGivenName',
                password: 'u.password',
                activeInd: 'u.activeInd',
                roleCode: 'u.roleCode',
                roleDescription: this.mySQL.raw('(select `r`.`roleDescription` from `roles` as  `r` where `r`.`roleCode` = `u`.`roleCode`)') ,
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

    public siteUsers(userId) {
        return this.mySQL({ u: 'users'})
            .select({
                userId: 'u.userId',
                email: 'u.email',
                userSurname: 'u.userSurname',
                userGivenName: 'u.userGivenName',
                password: 'u.password',
                activeInd: 'u.activeInd',
                roleCode: 'u.roleCode',
                roleDescription: this.mySQL.raw('(select `r`.`roleDescription` from `roles` as  `r` where `r`.`roleCode` = `u`.`roleCode`)') ,
                createdUserId: 'u.createdUserId',
                createdDate: 'u.createdDate',
                updatedUserId: 'u.updatedUserId',
                updatedDate: 'u.updatedDate'
            })
            .whereRaw('`u`.`userId` = IFNULL(?,`u`.`userId`) and (select `u`.`roleCode` regexp \'usr$\') = 1', [userId])
            .then((users) => {
                return users;
            })
            .catch(function (err) {
                throw err;
            });
    }
    public adminUsers(userId) {
        // console.log(this.mySQL({ u: 'users'})
        // .select({
        //     userId: 'u.userId',
        //     email: 'u.email',
        //     userSurname: 'u.userSurname',
        //     userGivenName: 'u.userGivenName',
        //     password: 'u.password',
        //     activeInd: 'u.activeInd',
        //     roleCode: 'u.roleCode',
        //     roleDescription: this.mySQL.raw('(select `r`.`roleDescription` from `roles` as  `r` where `r`.`roleCode` = `u`.`roleCode`)') ,
        //     createdUserId: 'u.createdUserId',
        //     createdDate: 'u.createdDate',
        //     updatedUserId: 'u.updatedUserId',
        //     updatedDate: 'u.updatedDate'
        // })
        // .whereRaw('`u`.`userId` = IFNULL(?,`u`.`userId`) and (select `u`.`roleCode` regexp \'adm$\') = 1' , [userId]).toString());

        return this.mySQL({ u: 'users'})
            .select({
                userId: 'u.userId',
                email: 'u.email',
                userSurname: 'u.userSurname',
                userGivenName: 'u.userGivenName',
                password: 'u.password',
                activeInd: 'u.activeInd',
                roleCode: 'u.roleCode',
                roleDescription: this.mySQL.raw('(select `r`.`roleDescription` from `roles` as  `r` where `r`.`roleCode` = `u`.`roleCode`)') ,
                createdUserId: 'u.createdUserId',
                createdDate: 'u.createdDate',
                updatedUserId: 'u.updatedUserId',
                updatedDate: 'u.updatedDate'
            })
            .whereRaw('`u`.`userId` = IFNULL(?,`u`.`userId`) and (select `u`.`roleCode` regexp \'adm$\') = 1' , [userId])
            .then((users) => {
                return users;
            })
            .catch(function (err) {
                throw err;
            });
    }
}
