// const express = require('express');
const uuidv4 = require('uuid/v4');
const UserService = require('../../../dataAccess/userService');

module.exports = (express, config) => {
    if (!config) {
        throw new Error('admin user missing config object');
    }
    const userService = UserService(config.knex);
    const log = config.logger;
    const logLevel = config.logLevel;
    const router = express.Router();

    // moved to commons route
    // router.get('/uuid', (req, res) => {
    //     userService.uuid().then(data => { return res.json(data) })
    //         .catch(err => {
    //             log.levels('dcvnpslog', config.logLevel.ERROR)
    //             log.error({ id: req.id, err: err }, 'Error getting uuid');
    //             return res.status(500).json({ error: err.message });
    //         });
    // });
    router.get('/byid/:userid?', (req, res) => {
        const userid = req.params.userid || null;
        userService.selectById(userid)
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                log.levels('dcvnpslog', config.logLevel.ERROR)
                log.error({ id: req.id, err: err }, `Error getting uuid: ${userid}`);
                return res.status(500).json({ error: err.message });
            })
    });

    router.get('/byname/:name?', (req, res) => {
        const username = req.params.name || null;
        userService.selectByName(username)
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                log.levels('dcvnpslog', config.logLevel.ERROR)
                log.error({ id: req.id, err: err }, 'Error getting uuid');
                return res.status(500).json({ error: err.message });
            })
    });

    router.post('/', async (req, res) => {
        if (!isAdmin(req)) {
            return res.status(401).json(`user ${auth.username} is not authorized to create new application user`);
        }
        const user = req.body;
        // console.log(user);
        try {
            // const userid = await database.uuid();
            user.userId = uuidv4();
            user.password = `${bcrypt.hashSync(user.password, 10)}`
            user.createdUserId = auth.userid;
            user.createdDate = new Date();
            user.updatedUserId = auth.userid;
            user.updatedDate = new Date();
            console.log(user);
            const result = await userService.createUser(user);
            return res.status(200).json(result);
        } catch (err) {
            log.levels('dcvnpslog', logLevel.ERROR)
            log.error({ id: req.id, err: err }, 'Error creating user');
            return res.status(500).json(err.message);
        }
    });
    return router;
}