// commonService.js
// Common service provides functions for general operations

module.exports = (config) => {

    if (!config) {
        throw new Error('commonService missing config object.')
    }
    const bcrypt = config.bcrypt;
    const mySQL = config.mySQL;

    function authenticate({ email, password }) {
        let response = undefined;
        return mySQL('users')
            .whereRaw('email=?', [email])
            .first('userId', 'email', 'password', 'roleCode')
            .then((user) => {
                if (!user) {
                    return response = {
                        success: false,
                        code: 1329, // no data found
                        authmsg: 'Invalid username/ password.',
                        authuser: undefined
                    };
                }
                // console.log(user);
                const pwdMatch = bcrypt.compareSync(password, user.password);
                // console.log({match: pwdMatch,   userpwd: user.password, inpwd:password});
                if (pwdMatch) {
                    return response = {
                        success: true,
                        code: 0,
                        authmsg: 'Authenticate Success',
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

    function changePassword(email, oldPassword, encryptedNewPassword) {
        // console.log(`changePassword DB ${userName}  -- ${oldPassword} -- ${encryptedNewPassword}`);
        return authenticate({ email: email, password: oldPassword })
            .then(res => {
                if (res.success) {
                    // console.log('chagne password authentication success');
                    // console.log(res);
                    const authuser = res.authuser;
                    return mySQL('users')
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
    function getVnpsClassMenu(){
        return mySQL('vnpsclasses')
        .select({id:'classId', level: 'classLevel', description: 'classLevelDesc'})
        .orderBy('classOrder')
        .then( result => {
            return result;
        })
        .catch( err =>{
            throw err;
        })
    }
    async function uuid(){
        try {
            const data = await mySQL.raw('select uuid() as uuid');
            const jsonString = JSON.stringify(data);
            const jsonValue = JSON.parse(jsonString);
            return jsonValue[0][0];
        }
        catch (error) {
            console.log(error);
            throw error;
        };
    }
    function getRoles() {
        return mySQL('roles')
            .select({ roleCode: 'roleCode', roleDescription: 'roleDescription' })
            .then(data => { return data; })
            .catch(err => {
                throw err;
            });
    }
    function getStates(){
        return mySQL('states')
        .select('stateCode','description')
        .orderBy('description')
        .then((data)=>{
            // console.log(data);
            return data;
        })
        .catch( err =>{
            throw err;
        })
    }
    return {
        uuid,
        getRoles,
        getStates,
        getVnpsClassMenu, 
        authenticate,
        changePassword
    }
}