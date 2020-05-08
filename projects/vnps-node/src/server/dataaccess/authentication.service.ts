import { Config } from "../config";

//common.service.ts
// Common service provides functions for general operations

export class AuthenticationService {
    private config: Config = new Config();
    private bcrypt: any;
    private mySQL:any;
    constructor(){
        this.bcrypt = this.config.bcrypt;
        this.mySQL = this.config.mySQL;
    }
    public authenticate( email:string, password:string) {
        let response = undefined;
        return this.mySQL('users')
            .whereRaw('email=?', [email])
            .first('userId', 'email', 'password', 'roleCode')
            .then((user) => {
                if (!user) {
                    throw new Error('ERROR 1045 (28000): Invalid username/password.');
                }
                // console.log(user);
                const pwdMatch = this.bcrypt.compareSync(password, user.password);
                // console.log({match: pwdMatch,   userpwd: user.password, inpwd:password});
                if (pwdMatch) {
                    return response = {
                        success: true,
                        code: 0,
                        message: 'Authenticate Success',
                        authuser: {
                            userId: user.userId,
                            userName: user.email,
                            roleCode: user.roleCode
                        }
                    };
                } else{
                    throw new Error('ERROR 1045 (28000): Invalid username/password.')
                }
            })
            .catch((err) => {
                console.log(err);
                throw err; 
            });
    }

    public changePassword(email, oldPassword, encryptedNewPassword) {
        // console.log(`changePassword DB ${userName}  -- ${oldPassword} -- ${encryptedNewPassword}`);
        return this.authenticate( email, oldPassword )
            .then(res => {
                if (res.success) {
                    // console.log('chagne password authentication success');
                    // console.log(res);
                    const authuser = res.authuser;
                    return this.mySQL('users')
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

}