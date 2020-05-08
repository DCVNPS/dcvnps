import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import { Config } from '../../../config';
import { UsersDataService } from '../../../dataaccess/users.service';

class UsersRouter {
    public usersRouter = express.Router();
    private config: Config = new Config();
    private log: any;
    private bcrypt: any;
    private logLevel: any;
    private usersDataService: UsersDataService;
    constructor() {
        this.usersDataService = new UsersDataService();
        this.bcrypt = this.config.bcrypt;
        this.log = this.config.logger;
        this.logLevel = this.config.logLevel;
        this.configUserRouter();
    }
    public isAdmin(req) {
        const auth = req.auth;
        // if (auth.userrole !== 'SITEADM') {
        //     return false;
        // }
        // return true;
        const regex = RegExp('*ADM$');
        console.log(`Is user addmint ${regex.test(auth.userrole)}`);
        return regex.test(auth.userrole);
    }

    private configUserRouter() {
        this.usersRouter.get('/byemail/:email?', (req, res) => {
            const email = req.params.email || null;
            return this.usersDataService.selectByEmail(email)
                .then(data => {
                    return res.status(200).json(data);
                })
                .catch(err => {
                    this.log.levels('dcvnpslog', this.config.logLevel.ERROR);
                    this.log.error({ id: req.id, err: err }, 'Error getting uuid');
                    return res.status(500).json({ error: err.message });
                });
        });

        this.usersRouter.get('/adminusers/:userid?', (req, res) => {
            // if (!this.isAdmin(req)) {
            //     return res.status(401).json(`user ${req.auth.username} is not authorized to create new application user`);
            // }
            const userid = req.params.userid || null;
            return this.usersDataService.adminUsers(userid)
                .then(data => {
                    return res.status(200).json(data);
                })
                .catch(err => {
                    this.log.levels('dcvnpslog', this.config.logLevel.ERROR);
                    this.log.error({ id: req.id, err: err }, `Error getting adminusers uuid`);
                    return res.status(500).json({ err: err.message });
                });
        });

        this.usersRouter.get('/siteusers/:userid?', (req, res) => {
            // if (!this.isAdmin(req)) {
            //     return res.status(401).json(`user ${req.auth.username} is not authorized to create new application user`);
            // }
            const userid = req.params.userid || null;
            return this.usersDataService.siteUsers(userid)
                .then(data => {
                    return res.status(200).json(data);
                })
                .catch(err => {
                    this.log.levels('dcvnpslog', this.config.logLevel.ERROR);
                    this.log.error({ id: req.id, err: err }, `Error getting adminusers uuid`);
                    return res.status(500).json({ err: err.message });
                });
        });

        this.usersRouter.get('/:userid?', (req, res) => {
            // if (!this.isAdmin(req)) {
            //     return res.status(401).json(`user ${req.auth.username} is not authorized to create new application user`);
            // }
            const userid = req.params.userid || null;
            return this.usersDataService.selectById(userid)
                .then(data => {
                    return res.status(200).json(data);
                })
                .catch(err => {
                    this.log.levels('dcvnpslog', this.config.logLevel.ERROR);
                    this.log.error({ id: req.id, err: err }, `Error getting uuid: ${userid}`);
                    return res.status(500).json({ err: err.message });
                });
        });

        this.usersRouter.post('/', async (req, res) => {
            if (!this.isAdmin(req)) {
                return res.status(401).json(`user ${req.auth.username} is not authorized to create new application user`);
            }
            const user = req.body;
            // console.log(user);
            try {
                // const userid = await database.uuid();
                user.userId = this.config.uuidv4();
                user.password = `${this.bcrypt.hashSync(user.password, 10)}`;
                user.activeInd = 'Y';
                user.createdUserId = req.auth.userid;
                user.createdDate = new Date();
                user.updatedUserId = req.auth.userid;
                user.updatedDate = new Date();
                const result = await this.usersDataService.createUser(user);
                return res.status(200).json(result);
            } catch (err) {
                this.log.levels('dcvnpslog', this.logLevel.ERROR);
                this.log.error({ id: req.id, err: err }, 'Error creating user');
                return res.status(500).json(err.message);
            }
        });


        this.usersRouter.put('/:action?', async (req, res) => {
            if (!this.isAdmin(req)) {
                return res.status(401).json(`user ${req.auth.username} is not authorized to update application user`);
            }
            const action = req.params.action || null;
            const user = req.body;
            let result = undefined;
            try {
                user.updatedUserId = req.auth.userid;
                user.updatedDate = new Date();
                // console.log(user);
                switch (action) {
                    case 'setpassword':
                        user.password = `${this.bcrypt.hashSync(user.password, 10)}`;
                        result = await this.usersDataService.setPassword(user);
                        break;
                    default:
                        result = await this.usersDataService.updateUser(user);
                        break;
                }
                return res.status(200).json(result);
            } catch (err) {
                this.log.levels('dcvnpslog', this.logLevel.ERROR);
                this.log.error({ id: req.id, err: err }, 'Error creating user');
                return res.status(500).json(err.message);
            }
        });

        this.usersRouter.delete('/:userid', (req, res) => {
            if (!this.isAdmin(req)) {
                return res.status(401).json(`user ${req.auth.username} is not authorized to update application user`);
            }
            const userid = req.params.userid;
            if (userid) {
                this.usersDataService.deleteById(userid)
                    .then(() => {
                        return res.status(200).json(`User with ${userid} has been deleted.`);
                    })
                    .catch(err => {
                        return res.status(500).json(err.message);
                    });
            } else {
                return res.status(400).json(`request is missing userid ${userid}`);

            }
        });
    }
}

export default new UsersRouter().usersRouter;
