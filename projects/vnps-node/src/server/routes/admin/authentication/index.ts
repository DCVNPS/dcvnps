import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import { Config } from '../../../config';
import { AuthenticationService } from '../../../dataaccess/authentication.service';

const refreshTokens = {};

class AuthenticationRouter {
    public authRouter = express.Router();
    private config: Config = new Config();
    private log: any;
    private bcrypt: any;
    private logLevel: any;
    private pwdexp: number;
    private pwdgrc: number;

    private authDataService: AuthenticationService;
    constructor() {
        this.authDataService = new AuthenticationService();
        this.bcrypt = this.config.bcrypt;
        this.log = this.config.logger;
        this.logLevel = this.config.logLevel;
        this.pwdexp = parseInt(process.env.pwdexpirein, 10);
        this.pwdgrc  = parseInt(process.env.pwdgracetime, 10);
        this.configAuthenticateRoute();
    }

    private configAuthenticateRoute() {

        this.authRouter.post('/login', (req, res) => {
            const user = req.body;
            // console.log(user);
            this.authDataService.authenticate(user.email, user.password )
                .then((result) => {
                    let refreshToken = undefined;
                    if (result.success) {
                        const payload = {
                            userid: result.authuser.userId,
                            username: result.authuser.userName,
                            userrole: result.authuser.roleCode
                        };
                        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: this.pwdexp}); /// expired in 15minutes
                        if (Object.keys(refreshTokens).length > 0) {
                            // console.log(Object.keys(refreshTokens));
                            Object.keys(refreshTokens).forEach(key => {
                                // console.log(refreshTokens[key]);
                                // If sign in again, remove the existing refreshToken entry and add a new one.
                                if (refreshTokens[key] === result.authuser.userName) {
                                    delete refreshTokens[key];
                                    refreshToken = this.config.uuidv4();
                                    refreshTokens[refreshToken] = result.authuser.userName;
                                }
                            });
                        }
                        // New user loging or begining of the application.
                        if (!refreshToken) {
                            refreshToken = this.config.uuidv4();
                            refreshTokens[refreshToken] = result.authuser.userName;
                        }
                        res.status(200).send({
                            jwtToken: jwtToken,
                            role: result.authuser.roleCode,
                            lastRead: Date.now(),
                            refreshToken: refreshToken
                        });
                    } else {
                        return res.status(401).json(result);
                    }
                })
                .catch((err) => {
                    this.log.levels('dcvnpslog', this.logLevel.ERROR);
                    this.log.error({ id: req.id, err: err }, 'Error authenticate');
                    return res.status(500).json(err.message);
                });
        });

        this.authRouter.post('/logout', (req, res) => {
            const refreshToken = req.body.refreshToken;
            if (refreshToken in refreshTokens) {
                delete refreshTokens[refreshToken];
            }
            res.sendStatus(204);
        });

        this.authRouter.post('/renewtoken', (req, res) => {
            const authorization = req.headers.authorization;
            const auth = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET, {ignoreExpiration: true});
            // console.log(auth);
            const refreshAble = (auth.exp + this.pwdgrc) > Date.now();
            let refreshToken = req.body.refreshToken;
            // if (username && username === auth.username) {
            if ((refreshToken in refreshTokens) && refreshAble) {
                const username = refreshTokens[refreshToken];
                if (username === auth.username) {
                    const payload = {
                        userid: auth.userid,
                        username: auth.username,
                        userrole: auth.userrole
                    };
                    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: this.pwdexp }); /// expired in 15minutes
                    // console.log(`refreshToken: ${refreshTokens[refreshToken]} exists.`);
                    delete refreshTokens[refreshToken];
                    refreshToken = this.config.uuidv4();
                    refreshTokens[refreshToken] = auth.username;
                    // console.log(`New refreshToken: ${refreshTokens[refreshToken]}.`);
                    res.status(200).send({
                        jwtToken: jwtToken,
                        role: payload.userrole,
                        lastRead: Date.now(),
                        refreshToken: refreshToken
                    });
                } else {
                    delete refreshTokens[refreshToken];
                    res.status(401).json('Your session is expired.');
                }
            } else {
                res.status(401).json('Your session is expired.');
            }
        });

        //  Need to use Async to make sure the authentication and change password is  completed.
        this.authRouter.post('/changepassword', async (req, res) => {
            const { userName, oldPassword, newPassword } = req.body;
            const encryptedNewPassword = `${this.bcrypt.hashSync(newPassword, 10)}`;
            // console.log(`username: ${userName}, oldPassword: ${oldPassword}, newPassword: ${encryptedNewPassword}`);
            try {
                const chgPwdResult = await this.authDataService.changePassword(userName, oldPassword, encryptedNewPassword);
                // console.log(chgPwdResult);
                return res.status(200).json(chgPwdResult);
            } catch (err) {
                // console.log(err);
                this.log.levels('dcvnpslog', this.logLevel.ERROR);
                this.log.error({ id: req.id, err: err }, 'Error changin user password');
                return res.status(500).json(err);
            }
        });
    }
}
export default new AuthenticationRouter().authRouter;
