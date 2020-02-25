// const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const CommonService = require('../../dataAccess/commonService');

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
             log.levels('dcvnpslog',logLevel.ERROR)
            log.error({id: req.id, err: err},'Error getting roles');
            return res.status(500).json(err.message);
            });
    });
    router.get('/states', (req, res) =>{
        commonService.getStates()
        .then( data =>{
            // console.log(data);
            return res.status(200).json(data);
        })
        .catch(err =>{
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
                if (result.success) {
                    const roleCode = result.authuser.roleCode;
                    const admRole = roleCode.match(/ADM$/g);
                    const payload = {
                        userid: result.authuser.userId,
                        username: result.authuser.userName,
                        userrole: result.authuser.roleCode,
                        admin: `${(!admRole) ? false : admRole[0] === "ADM"}`,
                        refresh_token: uuidv4()
                    }
                    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 900 }); /// expired in 15minutes
                    // const token = jwt.sign(payload, process.env.JWT_SECRET);
                    // console.log(token);
                    return res.status(200).json({
                        token: token,
                        role: result.authuser.roleCode,
                        lastRead: Date.now()
                    });
                }             
                else{
                    return res.status(401).json(result);
                }
            } )
            .catch((err) => {
                log.levels('dcvnpslog', logLevel.ERROR)
                log.error({ id: req.id, err: err }, 'Error authenticate');
                return res.status(500).json(err.message);
            })
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
    router.get('/vnpsclassmenu', (req, res) =>{
        // console.log('calling getPhotoClassMenu');
        return commonService.getVnpsClassMenu()
        .then( data =>{
            // console.log({'classMenu': data});
            return res.status(200).json(data);
        })
        .catch(err =>{
            log.levels('dcvnpslog',logLevel.ERROR)
            log.error({id: req.id, err: err},'Error deleting announcement');
            return res.status(500).json(err.message);
        })        ;
    });
    return router;
}