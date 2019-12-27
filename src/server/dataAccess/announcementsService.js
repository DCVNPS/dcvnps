module.exports = (config) => {

    if (!config) {
        throw new Error('commonService missing config object.')
    }
    const bcrypt = config.bcrypt;
    const mySQL = config.mySQL;
    return {
        createAnnouncements(ancmnt) {
            // console.log(ancmnt);
            return mySQL('announcements')
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
        },
        updateAnnouncements(ancmnt) {
            // console.log(`update announcement ID: ${ancmnt.announcementId}`);
            return mySQL('announcements')
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
        },
        readAnnouncements(ancmntId) {
            // console.log(`readAnnouncement ${ancmntId}`);
            // const sqlstm = mySQL({ a: 'announcements' })
            // .select({
            //     announcementId: 'a.announcementId',
            //     title: 'a.title',
            //     content: 'a.content',
            //     userId: 'a.userId',
            //     postedBy: mySQL.raw('(select `u`.`username` from `dcvnps`.`users` as `u` where `u`.`userId` = `a`.`userId`)'),
            //     postedDate: 'a.createdDate',
            //     updatedDate: 'a.updatedDate'
            // })
            // .whereRaw('`a`.`announcementId` = IFNULL(?,`a`.`announcementId`)', [ancmntId])
            // .toQuery();
            // console.log(sqlstm);
            // console.log(`Read announcement Id: ${ancmntId}`);
            return mySQL({ a: 'announcements' })
                .select({
                    announcementId: 'a.announcementId',
                    title: 'a.title',
                    content: 'a.content',
                    postedUserId: 'a.postedUserId',
                    postedBy: mySQL.raw('(select concat_ws(\' \',`u`.`userGivenName`,`u`.`userSurname`) from `dcvnps`.`users` as `u` where `u`.`userId` = `a`.`postedUserId`)'),
                    postedDate: 'a.createdDate',
                    updatedUserId: 'a.updatedUserId',
                    updatedBy: mySQL.raw('(select concat_ws(\' \',`u`.`userGivenName`,`u`.`userSurname`) from `dcvnps`.`users` as `u` where `u`.`userId` = `a`.`updatedUserId`)'),
                    updatedDate: 'a.updatedDate'
                })
                .whereRaw('`a`.`announcementId` = IFNULL(?,`a`.`announcementId`)', [ancmntId])
                .orderBy('postedDate','desc')
                .then(data => {
                    return JSON.stringify(data);
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
        },
        deleteAnnouncements(ancmntId) {
            return mySQL('announcements')
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
}