const UserService = require('../../../dataAccess/userService');

module.exports = (express, config) => {
    if (!config) {
        throw new Error('admin user missing config object');
    }
    const userService = UserService(config);
    const log = config.logger;
    const logLevel = config.logLevel;
    const bcrypt = config.bcrypt;
    const uuidv4 = config.uuidv4;
    const router = express.Router();

    function isAdmin(req) {
        const auth = req.auth;
        if (auth.userrole !== "SITEADM") {
            return false;
        }
        return true;
    }

    router.get('/byemail/:email?', (req, res) => {
        const email = req.params.email || null;
        return userService.selectByEmail(email)
            .then(data => {
                email
                return res.status(200).json(data);
            })
            .catch(err => {
                log.levels('dcvnpslog', config.logLevel.ERROR)
                log.error({ id: req.id, err: err }, 'Error getting uuid');
                return res.status(500).json({ error: err.message });
            })
    });

    router.get('/adminusers/:userid?', (req, res) => {
        if (!isAdmin(req)) {
            return res.status(401).json(`user ${req.auth.username} is not authorized to create new application user`);
        }
        const userid = req.params.userid || null;
        return userService.adminUsers(userid)
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                log.levels('dcvnpslog', config.logLevel.ERROR)
                log.error({ id: req.id, err: err }, `Error getting adminusers uuid`);
                return res.status(500).json({ err: err.message });
            })
    });

    router.get('/siteusers/:userid?', (req, res) => {
        if (!isAdmin(req)) {
            return res.status(401).json(`user ${req.auth.username} is not authorized to create new application user`);
        }
        const userid = req.params.userid || null;
        return userService.siteUsers(userid)
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                log.levels('dcvnpslog', config.logLevel.ERROR)
                log.error({ id: req.id, err: err }, `Error getting adminusers uuid`);
                return res.status(500).json({ err: err.message });
            })
    });

    router.get('/:userid?', (req, res) => {
        const userid = req.params.userid || null;
        return userService.selectById(userid)
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                log.levels('dcvnpslog', config.logLevel.ERROR)
                log.error({ id: req.id, err: err }, `Error getting uuid: ${userid}`);
                return res.status(500).json({ err: err.message });
            })
    });

    router.post('/', async (req, res) => {
        if (!isAdmin(req)) {
            return res.status(401).json(`user ${req.auth.username} is not authorized to create new application user`);
        }
        const user = req.body;
        // console.log(user);
        try {
            // const userid = await database.uuid();
            user.userId = uuidv4();
            user.password = `${bcrypt.hashSync(user.password, 10)}`;
            user.activeInd = 'Y';
            user.createdUserId = req.auth.userid;
            user.createdDate = new Date();
            user.updatedUserId = req.auth.userid;
            user.updatedDate = new Date();
            // console.log(user);
            const result = await userService.createUser(user);
            // console.log(result);
            return res.status(200).json(result);
        } catch (err) {
            log.levels('dcvnpslog', logLevel.ERROR)
            log.error({ id: req.id, err: err }, 'Error creating user');
            return res.status(500).json(err.message);
        }
    });


    router.put('/:action?', async (req, res) => {
        if (!isAdmin(req)) {
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
                case "setpassword":
                    user.password = `${bcrypt.hashSync(user.password, 10)}`;
                    result = await userService.setPassword(user);
                    break;
                default:
                    if(action ==='updatepassword'){
                        user.password = `${bcrypt.hashSync(user.password, 10)}`;
                    }
                    result = await userService.updateUser(user);
                    break;
            }
            return res.status(200).json(result);
        } catch (err) {
            log.levels('dcvnpslog', logLevel.ERROR)
            log.error({ id: req.id, err: err }, 'Error creating user');
            return res.status(500).json(err.message);
        }
    });

    router.delete('/:userid', (req, res) => {
        if (!isAdmin(req)) {
            return res.status(401).json(`user ${req.auth.username} is not authorized to update application user`);
        }
        const userid = req.params.userid;
        if (userid) {
            userService.deleteById(userid)
                .then(() => {
                    return res.status(200).json(`User with ${userid} has been deleted.`);
                })
                .catch(err => {
                    return res.status(500).json(err.message);
                });
        }
        else{
            return res.status(400).json(`request is missing userid ${userid}`);

        }
    })
    return router;
}