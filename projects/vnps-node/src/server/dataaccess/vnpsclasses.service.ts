import { Config } from '../config';

export class VnpsClassesDataService {
    private config: Config = new Config();
    private mySQL: any;

    constructor() {
        this.mySQL = this.config.mySQL;
    }

    public createVnpsClasses(aclass) {
        // console.log(mySQL('vnpsclasses')
        return this.mySQL('vnpsclasses')
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
            .then(result => {
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
            });
    }
    public updateVnpsClasses(aclass) {
        // console.log(`update announcement ID: ${ancmnt.announcementId}`);
        return this.mySQL('vnpsclasses')
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
            });
    }
    public readVnpsClasses(classId) {
        return this.mySQL({ a: 'vnpsclasses' })
            .select({
                classId: 'a.classId',
                classLevel: 'a.classLevel',
                classLevelDesc: 'a.classLevelDesc',
                classOrder: 'a.classOrder',
                classDescription: 'a.classDescription',
                prerequisite: 'a.prerequisite',
                curriculum: 'a.curriculum',
                instructors: 'a.instructors',
                postedUserId: 'a.postedUserId',
                postedBy: this.mySQL.raw('(select concat_ws(\' \',`u`.`userGivenName`,`u`.`userSurname`) from `users` as `u` where `u`.`userId` = `a`.`postedUserId`)'),
                postedDate: 'a.createdDate',
                updatedUserId: 'a.updatedUserId',
                updatedBy: this.mySQL.raw('(select concat_ws(\' \',`u`.`userGivenName`,`u`.`userSurname`) from `users` as `u` where `u`.`userId` = `a`.`updatedUserId`)'),
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
    public readClassesById(classId) {
        return this.mySQL({ a: 'vnpsclasses' })
            .select({
                classId: 'a.classId',
                classLevel: 'a.classLevel',
                classLevelDesc: 'a.classLevelDesc',
                classOrder: 'a.classOrder',
                classDescription: 'a.classDescription',
                prerequisite: 'a.prerequisite',
                curriculum: 'a.curriculum',
                instructors: 'a.instructors',
                postedUserId: 'a.postedUserId',
                postedBy: this.mySQL.raw('(select concat_ws(\' \',`u`.`userGivenName`,`u`.`userSurname`) from `users` as `u` where `u`.`userId` = `a`.`postedUserId`)'),
                postedDate: 'a.createdDate',
                updatedUserId: 'a.updatedUserId',
                updatedBy: this.mySQL.raw('(select concat_ws(\' \',`u`.`userGivenName`,`u`.`userSurname`) from `users` as `u` where `u`.`userId` = `a`.`updatedUserId`)'),
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
    public readClassesByLevel(classlevel) {
        return this.mySQL({ a: 'vnpsclasses' })
            .select({
                classId: 'a.classId',
                classLevel: 'a.classLevel',
                classLevelDesc: 'a.classLevelDesc',
                classOrder: 'a.classOrder',
                classDescription: 'a.classDescription',
                prerequisite: 'a.prerequisite',
                curriculum: 'a.curriculum',
                instructors: 'a.instructors',
                postedUserId: 'a.postedUserId',
                postedBy: this.mySQL.raw('(select concat_ws(\' \',`u`.`userGivenName`,`u`.`userSurname`) from `users` as `u` where `u`.`userId` = `a`.`postedUserId`)'),
                postedDate: 'a.createdDate',
                updatedUserId: 'a.updatedUserId',
                updatedBy: this.mySQL.raw('(select concat_ws(\' \',`u`.`userGivenName`,`u`.`userSurname`) from `users` as `u` where `u`.`userId` = `a`.`updatedUserId`)'),
                updatedDate: 'a.updatedDate'
            })
            .whereRaw('`a`.`classLevel` = IFNULL(?,`a`.`classLevel`)', [classlevel])
            .orderBy('classOrder')
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }
    public deleteVnpsClasses(classId) {
        return this.mySQL('vnpsclasses')
            .whereRaw('classId = ?', [classId])
            .delete()
            .then(roweffected => {
                return roweffected;
            })
            .catch(err => {
                throw err;
            });
    }

}
