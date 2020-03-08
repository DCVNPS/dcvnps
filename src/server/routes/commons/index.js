const jwt = require('jsonwebtoken');
const CommonService = require('../../dataAccess/commonService');

const refreshTokens = {};

module.exports = (express, config) => {
    if (!config) {
        throw new Error('admin user missing config object');
    }
    const commonService = CommonService(config);
    const uuidv4 = config.uuidv4;
    const bcrypt = config.bcrypt;
    const log = config.logger;
    const logLevel = config.logLevel;
    const router = express.Router();
    const pwdexp = parseInt(process.env.pwdexpirein);
    const pwdgrc = parseInt(process.env.pwdgracetime);
    router.get('/uuid', (req, res) => {
        commonService.uuid().then(data => {
            return res.status(200).json(data)
        })
            .catch(err => {
                log.levels('dcvnpslog', config.logLevel.ERROR)
                log.error({ id: req.id, err: err }, 'Error getting uuid');
                return res.status(500).json({ error: err.message });
            });
    });
    router.get('/roles', (req, res) => {
        return commonService.getRoles()
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                log.levels('dcvnpslog', logLevel.ERROR)
                log.error({ id: req.id, err: err }, 'Error getting roles');
                return res.status(500).json(err.message);
            });
    });
    router.get('/states', (req, res) => {
        commonService.getStates()
            .then(data => {
                // console.log(data);
                return res.status(200).json(data);
            })
            .catch(err => {
                log.levels('dcvnpslog', config.logLevel.ERROR)
                log.error({ id: req.id, err: err }, 'Error getting uuid');
                return res.status(500).json({ error: err.message });
            })
    });
    router.post('/authenticate', (req, res) => {
        const user = req.body;
        // console.log(user);
        commonService.authenticate({ email: user.email, password: user.password })
            .then((result) => {
                let refreshToken = undefined;
                if (result.success) {
                    const roleCode = result.authuser.roleCode;
                    const admRole = roleCode.match(/ADM$/g);
                    const payload = {
                        userid: result.authuser.userId,
                        username: result.authuser.userName,
                        userrole: result.authuser.roleCode
                    }
                    const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: pwdexp}); /// expired in 2minutes
                    if (Object.keys(refreshTokens).length > 0) {
                        // console.log(Object.keys(refreshTokens));
                        Object.keys(refreshTokens).forEach(key => {
                            // console.log(refreshTokens[key]);
                            // If sign in again, remove the existing refreshToken entry and add a new one.
                            if (refreshTokens[key] === result.authuser.userName) {
                                delete refreshTokens[key];
                                refreshToken = uuidv4();
                                refreshTokens[refreshToken] = result.authuser.userName;
                            }
                        });
                    }
                    // New user loging or begining of the application.
                    if (!refreshToken) {
                        refreshToken = uuidv4();
                        refreshTokens[refreshToken] = result.authuser.userName;
                    }
                    res.status(200).send({
                        authToken: authToken,
                        role: result.authuser.roleCode,
                        lastRead: Date.now(),
                        refreshToken: refreshToken
                    });
                }
                else {
                    return res.status(401).json(result);
                }
            })
            .catch((err) => {
                log.levels('dcvnpslog', logLevel.ERROR)
                log.error({ id: req.id, err: err }, 'Error authenticate');
                return res.status(500).json(err.message);
            })
    });

    router.post('/logout', (req, res) => {
        const refreshToken = req.body.refreshToken;
        if (refreshToken in refreshTokens) {
            delete refreshTokens[refreshToken];
        }
        res.send(204);
    });

    router.post('/renewtoken', (req, res) => {
        const authorization = req.headers.authorization;
        const auth = jwt.verify(authorization.split(' ')[1],process.env.JWT_SECRET,{ignoreExpiration: true});
        // console.log(auth);
        const refreshAble = (auth.exp + pwdgrc) > Date.now();
        let refreshToken = req.body.refreshToken;
        // if (username && username === auth.username) {
        if((refreshToken in refreshTokens) && refreshAble){
            const username = refreshTokens[refreshToken];
            if(username === auth.username){
                const payload = {
                    userid: auth.userid,
                    username: auth.username,
                    userrole: auth.userrole
                }
                authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: pwdexp }); /// expired in 15minutes
                // console.log(`refreshToken: ${refreshTokens[refreshToken]} exists.`);
                delete refreshTokens[refreshToken];
                refreshToken = uuidv4();
                refreshTokens[refreshToken] = auth.username;
                // console.log(`New refreshToken: ${refreshTokens[refreshToken]}.`);
                res.status(200).send({
                    authToken: authToken,
                    role: payload.userrole,
                    lastRead: Date.now(),
                    refreshToken: refreshToken
                });    
            }
            else{
                delete refreshTokens[refreshToken];
                res.sendStatus(401);
            }
        }
        else{
            res.sendStatus(401);
        }
    });

    //  Need to use Async to make sure the authentication and change password is  completed.
    router.post('/changepassword', async (req, res) => {
        const { userName, oldPassword, newPassword } = req.body;
        const encryptedNewPassword = `${bcrypt.hashSync(newPassword, 10)}`;
        // console.log(`username: ${userName}, oldPassword: ${oldPassword}, newPassword: ${encryptedNewPassword}`);
        try {
            const chgPwdResult = await commonService.changePassword(userName, oldPassword, encryptedNewPassword);
            // console.log(chgPwdResult);
            return res.status(200).json(chgPwdResult);
        } catch (err) {
            // console.log(err);
            log.levels('dcvnpslog', logLevel.ERROR)
            log.error({ id: req.id, err: err }, 'Error changin user password');
            return res.status(500).json(err);
        }
    });

    router.get('/vnpsclassmenu', (req, res) => {
        // console.log(req.auth);
        return commonService.getVnpsClassMenu()
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                log.levels('dcvnpslog', logLevel.ERROR)
                log.error({ id: req.id, err: err }, 'Error Selecting VnpsClassMenu');
                return res.status(500).json(err.message);
            });
    });

    router.get('/adminlevel', (req, res) => {
        return commonService.getAdminLevel()
            .then(data => {
                return res.json(data);
            })
            .catch(err => {
                log.levels('dcvnpslog', logLevel.ERROR)
                log.error({ id: req.id, err: err }, 'Error Selecting AdminLevel');
                return res.status(500).json(err.message);
            });
    });

    return router;
}