//userService.js
// User service provides functions for operation on user's information

module.exports = (config) => {

    if (!config) {
        throw new Error('userService missing config object.')
    }
    const bcrypt = config.bcrypt;
    const mySQL = config.mySQL;
    
    function selectUserClass(year, classId){
        // Fun with knex outer join.
        // return mySQL({u:'users'})
        // .leftOuterJoin({uc:'userclasses'}, 'u.userId', 'uc.userId')
        // .leftOuterJoin({c:'vnpsclasses'}, 'uc.classId','c.classId')
        // .whereRaw('ifnull(`uc`.`year`,1) = ifnull(?, ifnull(`uc`.`year`,1)) and ifnull(`uc`.`classId`,1) = ifnull(?, ifnull(`uc`.`classId`,1))',[year,classId])
        // .select({
        //     userId: 'u.userId',
        //     userName: mySQL.raw('concat_ws(" ", u.userGivenName, u.userSurname)'),
        //     role: 'roleCode',
        //     classId: 'c.classId',
        //     userClassId: 'uc.userClassId',
        //     year: 'uc.year',
        //     level: 'c.classLevel',
        //     levelDescription: 'c.classLevelDesc'
        // })
        // This can be make simple by creating a view in database.
        return mySQL('userRoleClasses')
        .whereRaw('ifnull(`year`,1) = ifnull(?, ifnull(`year`,1)) and ifnull(`classId`,1) = ifnull(?, ifnull(`classId`,1))',[year,classId])
        .select()
        .then( data =>{
            return data;
        })
        .catch( err => {
            throw err;
        })
    }
    return {
        selectUserClass
    }
}
