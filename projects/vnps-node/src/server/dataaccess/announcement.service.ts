import { Config } from "../config";

export class AnnouncementDataService {
    private config: Config = new Config();
    private mySQL: any;
    constructor() {
        this.mySQL = this.config.mySQL;
    }
    public createAnnouncements(ancmnt) {
        // console.log(ancmnt);
        return this.mySQL('announcements')
            .insert({
                announcementId: ancmnt.announcementId,
                title: ancmnt.title,
                content: ancmnt.content,
                postedUserId: ancmnt.postedUserId,
                createdDate: ancmnt.postedDate,
                updatedUserId: ancmnt.updatedUserId,
                updatedDate: ancmnt.updatedDate
            })
            .then(result => {
                return this.readAnnouncements(ancmnt.announcementId)
                    .then(rec => {
                        // console.log(rec);
                        return rec;
                    })
                    .catch(exp => {
                        throw exp;
                    });
            })
            .catch(err => {
                throw err;
            })
    }
    public updateAnnouncements(ancmnt) {
        // console.log(`update announcement ID: ${ancmnt.announcementId}`);
        return this.mySQL('announcements')
            .update({
                title: ancmnt.title,
                content: ancmnt.content,
                updatedUserId: ancmnt.updatedUserId,
                createdDate: new Date(ancmnt.postedDate),
                updatedDate: new Date(ancmnt.updatedDate)
            })
            .where({ announcementId: ancmnt.announcementId })
            .then(result => {
                return result;
            })
            .catch(err => {
                throw err;
            })
    }
    public readAnnouncements(ancmntId) {
        return this.mySQL({ a: 'announcements' })
            .select({
                announcementId: 'a.announcementId',
                title: 'a.title',
                content: 'a.content',
                postedUserId: 'a.postedUserId',
                postedBy: this.mySQL.raw('(select concat_ws(\' \',`u`.`userGivenName`,`u`.`userSurname`) from `users` as `u` where `u`.`userId` = `a`.`postedUserId`)'),
                postedDate: 'a.createdDate',
                updatedUserId: 'a.updatedUserId',
                updatedBy: this.mySQL.raw('(select concat_ws(\' \',`u`.`userGivenName`,`u`.`userSurname`) from `users` as `u` where `u`.`userId` = `a`.`updatedUserId`)'),
                updatedDate: 'a.updatedDate'
            })
            .whereRaw('`a`.`announcementId` = IFNULL(?,`a`.`announcementId`)', [ancmntId])
            .orderBy('postedDate', 'desc')
            .then(data => {
                return JSON.stringify(data);
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }
    public deleteAnnouncements(ancmntId) {
        return this.mySQL('announcements')
            .whereRaw('announcementId = ?', [ancmntId])
            .delete()
            .then(roweffected => {
                return roweffected
            })
            .catch(err => {
                throw err;
            });
    }
}