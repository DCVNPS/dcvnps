module.exports = (config) => {

    if (!config) {
        throw new Error('commonService missing config object.')
    }
    const bcrypt = config.bcrypt;
    const mySQL = config.mySQL;
    function createVnpsClasses(aclass) {
        // console.log(mySQL('vnpsclasses')
        // .insert({
        //     classId: aclass.classId,
        //     classLevel: aclass.classLevel,
        //     classLevelDesc: aclass.classLevelDesc,
        //     classOrder: aclass.classOrder,
        //     classDescription: aclass.classDescription,
        //     prerequisite: aclass.prerequisite,
        //     curriculum: aclass.curriculum,
        //     instructors: aclass.instructors,
        //     postedUserId: aclass.postedUserId,
        //     createdDate: aclass.postedDate,
        //     updatedUserId: aclass.updatedUserId,
        //     updatedDate: aclass.updatedDate
        // }).toString());
        return mySQL('vnpsclasses')
            .insert({
                classId: aclass.classId,
                classLevel: aclass.classLevel,
                classLevelDesc: aclass.classLevelDesc,
                classOrder: aclass.classOrder,
                classDescription: aclass.classDescription,
                prerequisite: aclass.prerequisite,
                curriculum: aclass.curriculum,
                instructors: aclass.instructors,
                postedUserId: aclass.postedUserId,
                createdDate: aclass.postedDate,
                updatedUserId: aclass.updatedUserId,
                updatedDate: aclass.updatedDate
            })
            .then( result => {
                return this.readVnpsClasses(aclass.classId)
                    .then(data => {
                        // console.log(rec);
                        return data;
                    })
                    .catch(exp => {
                        throw exp;
                    });
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }
    function updateVnpsClasses(aclass) {
        // console.log(`update announcement ID: ${ancmnt.announcementId}`);
        return mySQL('vnpsclasses')
            .update({
                classLevel: aclass.classLevel,
                classLevelDesc: aclass.classLevelDesc,
                classOrder: aclass.aclass,
                classDescription: aclass.classDescription,
                prerequisite: aclass.prerequisite,
                curriculum: aclass.curriculum,
                instructors: aclass.instructors,
                updatedUserId: aclass.updatedUserId,
                updatedDate: aclass.updatedDate
            })
            .where({ classId: aclass.classId })
            .then(result => {
                return result;
            })
            .catch(err => {
                throw err;
            })
    }
    function readVnpsClasses(classId) {
        return mySQL({ a: 'vnpsclasses' })
            .select({
                classId: 'a.classId',
                classLevel: 'a.classLevel',
                classLevelDesc: 'a.classLevelDesc',
                classOrder: 'a.classOrder',
                classDescription: 'a.classDescription',
                prerequisite:'a.prerequisite',
                curriculum:'a.curriculum',
                instructors:'a.instructors',
                postedUserId: 'a.postedUserId',
                postedBy: mySQL.raw('(select concat_ws(\' \',`u`.`userGivenName`,`u`.`userSurname`) from `dcvnps`.`users` as `u` where `u`.`userId` = `a`.`postedUserId`)'),
                postedDate: 'a.createdDate',
                updatedUserId: 'a.updatedUserId',
                updatedBy: mySQL.raw('(select concat_ws(\' \',`u`.`userGivenName`,`u`.`userSurname`) from `dcvnps`.`users` as `u` where `u`.`userId` = `a`.`updatedUserId`)'),
                updatedDate: 'a.updatedDate'
            })
            .whereRaw('`a`.`classId` = IFNULL(?,`a`.`classId`)', [classId])
            .orderBy('classOrder')
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }
    function deleteVnpsClasses(classId) {
        return mySQL('vnpsclasses')
            .whereRaw('classId = ?', [classId])
            .delete()
            .then(roweffected => {
                return roweffected
            })
            .catch(err => {
                throw err;
            });
    }
    return{
        createVnpsClasses,
        updateVnpsClasses,
        readVnpsClasses,
        deleteVnpsClasses
    }
}