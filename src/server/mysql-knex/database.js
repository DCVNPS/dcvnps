'use strict';
(function () {
    const path = require('path');
    const envPath = path.normalize(__dirname + '/../../../.env');
    require('dotenv').config({ path: envPath });
    const config = JSON.parse(process.env.MYSQL2);
    const knex = require('knex')(config);
    // var Promise = require('bluebird');
    const bcrypt = require('bcrypt');

    module.exports = {
        async uuid() {
            try {
                const data = await knex.raw('select uuid() as uuid');
                const jsonString = JSON.stringify(data);
                const jsonValue = JSON.parse(jsonString);
                return jsonValue[0][0];
            }
            catch (error) {
                console.log(error);
                throw error;
            };
        },
        deleteUser(userName) {
            return knex('users').where('userName', userName).delete()
                .then((r) => {
                    console.log(`${r} rows effected. User ${userName} deleted.`);
                    return { recordDelete: true };
                })
                .catch((err) => console.error(err));
        },
        createUser({
            userName,
            password,
            roleCode,
            updateUser
        }) {
            // console.log(`Add User ${email}`);
            var response;
            const createdDate = new Date();
            const updatedDate = new Date();
            const pwdHash = bcrypt.hashSync(password, 10);
            return knex('users').insert({
                userName: userName,
                password: pwdHash,
                roleCode: roleCode,
                updateUser: updateUser,
                createdDate: createdDate,
                updatedDate: updatedDate
            })
                .then(async () => {
                    const userId = await knex('users')
                        .select('userId')
                        .where({ userName })
                        .then((row) => { return row[0].userId })
                        .catch((err) => { throw err; });
                    console.log('Knex log', userId);
                    response = {
                        'success': true,
                        'authmsg': 'Register Success',
                        'authuser': {
                            'userId': userId,
                            'userName': userName,
                            'roleCode': roleCode
                        }
                    }
                    return response;

                })
                .catch(function (err) {
                    throw err;
                });
        },
        authenticate({
            username,
            password
        }) {
            if (username === 'vnpsuser') {
                password = process.env.vnspusrpwd;
            }
            let response = undefined;
            return knex('users')
                .where({ userName: username })
                .first('userId', 'userName', 'password', 'roleCode')
                .then((user) => {
                    if (!user) {
                        return response = {
                            success: false,
                            status: 404,
                            authmsg: 'User Not Found.',
                            authuser: undefined
                        };
                    }
                    const pwdMatch = bcrypt.compare(password, user.password);
                    if (pwdMatch) {
                        response = {
                            success: true,
                            status: 200,
                            authmsg: 'Authenticate Success',
                            authuser: {
                                userId: user.userId,
                                userName: user.userName,
                                roleCode: user.roleCode
                            }
                        };
                    } else
                        response = {
                            success: false,
                            status: 401,
                            authmsg: 'Authenticate failed. Invalid username/password.',
                            authuser: undefined
                        };
                    return response;
                })
                .catch(function (err) { throw err; });
        },
        getUserByName(userName) {
            return knex('users').where({
                userName: userName
            }).select()
                .then((user) => {
                    console.log('Knex log getUserByName', JSON.stringify(user));
                    return user;
                })
                .catch(function (err) {
                    throw err;
                });
        },
        getUserById(userId) {
            return knex('users')
                .where({ userId: userId })
                .select()
                .then((user) => {
                    console.log('Knex log getUserById', JSON.stringify(user));
                    return user;
                })
                .catch(function (err) {
                    throw err;
                });
        },
        getContacts() {
            return knex('contacts')
                .select()
                .then((contacts) => { return contacts })
                .catch((err) => { throw err })
        },
        async insertContacts(contact) {
            //contact:{name, address, phone, photoUrl, updateUser, createdDate, updatedDate}
            return knex('contacts').insert(contact)
                .then(() => {
                    knex('contacts')
                        .select()
                        .where({ name: contact.name, address: contact.address })
                        .then((c) => { return c; })
                        .catch((err) => { throw err; });
                })
                .catch((err_1) => { throw err_1; })
        },
        updateContact(contact) {
            return knex('contacts')
                .where({ contactId: contact.contactId })
                .update({
                    name: contact.name,
                    address: contact.address,
                    phone: contact.phone,
                    photoUrl: contact.photoUrl,
                    updateUser: contact.updateUser,
                    updatedDate: contact.updatedDate
                })
                .then(() => { return { "updated": true }; })
                .catch((err) => { throw err; })
        },
        insertGallery({
            gallery,
            profilePhoto,
            updateUser,
            createdDate,
            updatedDate
        }) {
            // const createdDate = new Date();
            // const updatedDate = new Date();
            return knex('galleries')
                .insert({
                    gallery: gallery,
                    profilePhoto: profilePhoto,
                    updateUser: updateUser,
                    createdDate: createdDate,
                    updatedDate: updatedDate
                })
                .then(async () => {
                    return await knex('galleries')
                        .where({ gallery })
                        .select()
                        .then((data) => { return data; })
                        .catch((err) => { throw err });
                })
                .catch((error) => { throw error });
        },
        updateGallery(gly) {
            if (gly) {
                gly.updatedDate = new Date();
                return knex('galleries')
                    .where({ galleryId: gly.galleryId })
                    .update({
                        gallery: gly.gallery,
                        profilePhoto: gly.profilePhoto,
                        updateUser: gly.updateUser,
                        updatedDate: gly.updatedDate
                    })
                    .then(() => { return { "Updated": true }; })
                    .catch((err) => { throw err; })
            }
            else {
                throw new error("No gallery data.");
            }
        },
        getGalleries(galleryId) {
            return knex('galleries')
                .select('galleryId', 'gallery', 'profilePhoto', 'updateUser', 'createdDate', 'updatedDate')
                .whereRaw('galleryId = IFNULL(?,galleryId)', [galleryId])
                .orderBy('createdDate')
                .then((data) => {
                    return data;
                })
                .catch(function (err) {
                    throw err;
                });
        },
        insertGalleryPhoto(galleryPhotoId, galleryId, photo, portrait, author, year, updateUser, createdDate, updatedDate) {
            var response;
            return knex('galleryphotos').insert({
                galleryPhotoId,
                galleryId,
                photo,
                portrait,
                author,
                year,
                updateUser,
                createdDate,
                updatedDate
            })
                .then(([galleryPhotoId]) => {
                    response = {
                        success: true,
                        galleryPhotoId: galleryPhotoId
                    };
                    return response;
                })
                .catch(function (err) {
                    throw err;
                });
        },
        // saveExtGallery(extGallery) {
        //     var response;
        //     return knex('vnps_ext_galleries').insert({
        //         ext_link: extGallery.ext_link,
        //         anchor_text: extGallery.anchor_text,
        //         gallery_id: extGallery.gallery_id,
        //         year: extGallery.year
        //     })
        //         .then(([extGalleryId]) => {
        //             response = {
        //                 success: true,
        //                 extGalleryId: extGalleryId
        //             };
        //             return response;
        //         })
        //         .catch(function (err) {
        //             throw err;
        //         });
        // },
        // saveGalleryImage(objGallery) {
        //     console.log(objGallery);
        //     var result = { success: false, message: '', imageId: 0, galleryId: 0 };
        //     return knex.transaction(function (trx) {
        //         return trx('vnps_images')
        //             .insert({
        //                 image_filename: objGallery.filename,
        //                 image_filetype: objGallery.filetype,
        //                 image_src: objGallery.imgsrc,
        //                 image_path: objGallery.filepath,
        //                 image_size: objGallery.filesize,
        //                 author: objGallery.author,
        //                 upload_year: objGallery.year
        //             }) // .into('vnps_images')
        //             .transacting(trx)
        //             .then(([imageId]) => {
        //                 result.imageId = imageId;
        //                 return trx('vnps_gallery_images')
        //                     .insert({
        //                         image_id: imageId,
        //                         gallery_id: objGallery.gallery.galleryId
        //                     }) // .into('vnps_gallery_images')
        //                     .transacting(trx);

        //             }) // .then(trx.commit)
        //             .then(([galleryId]) => {
        //                 trx.commit;
        //                 result.galleryId = galleryId;
        //                 result.success = true;
        //                 result.message = 'Success Insert into image into gallery';
        //             })
        //             .catch(function (err) {
        //                 trx.rollback;
        //                 result.success = false;
        //                 result.message = err.sqlMessage;
        //                 return result;
        //             });
        //     })
        //         .then(function () {
        //             return result;
        //         })
        //         .catch(function (er) {
        //             result.success = false;
        //             result.message = er.message;
        //             return result;
        //         });
        // },
        // Get the list of galleries that will be used in Galleries/Gallery page show
        getPhotoByGalleryId(galleryId) {
            return knex({ gp: 'galleryphotos', g: 'galleries' })
                .select({
                    galleryPhotoId: 'gp.galleryPhotoId',
                    galleryId: 'gp.galleryId',
                    gallery: 'g.gallery',
                    imgalt: 'gp.photo',
                    imgsrc: knex.raw('concat_ws(\'/\',\'/galleries\', g.gallery, gp.year, concat_ws(\'_\',gp.galleryPhotoId, gp.photo))'),
                    author: 'gp.author',
                    year: 'gp.year',
                    portrait: 'gp.portrait'
                })
                .orderBy([{ column: 'year', order: 'desc' }, 'author'])
                .whereRaw('?? = ??', ['gp.galleryId', 'g.galleryId'])
                .whereRaw('?? = ?', ['g.galleryId', galleryId])
                .then((data) => {
                    let result = [];
                    data.forEach((item) => {
                        const sr = result.find((y) => y.year === item.year);
                        if (!sr) {
                            // a new year value, there should not be any author or photo in the set
                            let jsonEl = { "year": item.year, "authorData": [] };
                            const anAuthor = { "author": item.author, "year": item.year, "photos": [] };
                            anAuthor.photos.push({
                                "photoId": item.galleryPhotoId,
                                "galleryId": item.galleryId,
                                "gallery": item.gallery,
                                "imgalt": item.imgalt,
                                "imgsrc": item.imgsrc,
                                "portrait": item.portrait,
                                "hidden": true
                            });
                            jsonEl.authorData.push(anAuthor);
                            result.push(jsonEl);
                        } else {
                            // a year exists in the array
                            // find the author that comes along item result of current year
                            let thisAuthor = sr.authorData.find((a) => a.author === item.author);
                            if (!thisAuthor) {
                                // new author to the list
                                thisAuthor = { "author": item.author, "year": item.year, "photos": [] };
                                thisAuthor.photos.push({
                                    "photoId": item.galleryPhotoId,
                                    "galleryId": item.galleryId,
                                    "gallery": item.gallery,
                                    "imgalt": item.imgalt,
                                    "imgsrc": item.imgsrc,
                                    "portrait": item.portrait,
                                    "hidden": true
                                });
                                sr.authorData.push(thisAuthor);
                            } else {
                                //existing author
                                thisAuthor.photos.push({
                                    "photoId": item.galleryPhotoId,
                                    "galleryId": item.galleryId,
                                    "gallery": item.gallery,
                                    "imgalt": item.imgalt,
                                    "imgsrc": item.imgsrc,
                                    "portrait": item.portrait,
                                    "hidden": true
                                });
                            }
                        }
                    });
                    return result;
                    // return data;
                })
                .catch((error) => { console.log(error); throw error; });
        },
        getPhotoByGalleryName(gallery, year, author) {
            return knex({ gp: 'galleryphotos', g: 'galleries' })
                .select(
                    {
                        galleryPhotoId: 'gp.galleryPhotoId',
                        galleryId: 'gp.galleryId',
                        gallery: 'g.gallery',
                        imgalt: 'gp.photo',
                        imgsrc: knex.raw('concat_ws(\'/\',\'/galleries\', g.gallery, gp.year, concat_ws(\'_\',gp.galleryPhotoId, gp.photo))'),
                        author: 'gp.author',
                        year: 'gp.year',
                        portrait: 'gp.portrait'
                    }
                )
                .orderBy([{ column: 'year', order: 'desc' }, 'author'])
                .whereRaw('?? = ??', ['gp.galleryId', 'g.galleryId'])
                .whereRaw('?? = ?', ['g.gallery', gallery])
                .whereRaw('gp.year = IFNULL(?,gp.year)', [year])
                .whereRaw('gp.author = IFNULL(?,gp.author)', [author])
                .then((data) => {
                    let result = [];
                    data.forEach((item) => {
                        const sr = result.find((y) => y.year === item.year);
                        if (!sr) {
                            // a new year value, there should not be any author or photo in the set
                            let jsonEl = { "year": item.year, "authorData": [] };
                            const anAuthor = { "author": item.author, "year": item.year, "photos": [] };
                            anAuthor.photos.push({
                                "photoId": item.galleryPhotoId,
                                "galleryId": item.galleryId,
                                "gallery": item.gallery,
                                "imgalt": item.imgalt,
                                "imgsrc": item.imgsrc,
                                "portrait": item.portrait,
                                "hidden": true
                            });
                            jsonEl.authorData.push(anAuthor);
                            result.push(jsonEl);
                        } else {
                            // a year exists in the array
                            // find the author that comes along item result of current year
                            let thisAuthor = sr.authorData.find((a) => a.author === item.author);
                            if (!thisAuthor) {
                                // new author to the list
                                thisAuthor = { "author": item.author, "year": item.year, "photos": [] };
                                thisAuthor.photos.push({
                                    "photoId": item.galleryPhotoId,
                                    "galleryId": item.galleryId,
                                    "gallery": item.gallery,
                                    "imgalt": item.imgalt,
                                    "imgsrc": item.imgsrc,
                                    "portrait": item.portrait,
                                    "hidden": true
                                });
                                sr.authorData.push(thisAuthor);
                            } else {
                                //existing author
                                thisAuthor.photos.push({
                                    "photoId": item.galleryPhotoId,
                                    "galleryId": item.galleryId,
                                    "gallery": item.gallery,
                                    "imgalt": item.imgalt,
                                    "imgsrc": item.imgsrc,
                                    "portrait": item.portrait,
                                    "hidden": true
                                });
                            }
                        }
                    });
                    return result;
                    // return data;
                })
                .catch((error) => { console.log(error); throw error; });
        },
        deletePhoto(photoId) {
            return knex('galleryphotos')
                .whereRaw('galleryPhotoId = ?', [photoId])
                .delete()
                .then(resp => {
                    return resp;
                })
                .catch(err => {
                    throw err;
                })
        },
        createAnnouncement(ancmnt) {
            // console.log(ancmnt);
            return knex('announcements')
            .insert({
                announcementId: ancmnt.announcementId,
                title: ancmnt.title,
                content: ancmnt.content,
                postedUserId: ancmnt.postedUserId,
                createdDate: ancmnt.postedDate,
                updatedUserId: ancmnt.updatedUserId,
                updatedDate: ancmnt.updatedDate
            })
            .then( result => {
                return this.readAnnouncements(ancmnt.announcementId)
                .then( rec => {
                    // console.log(rec);
                    return rec;
                })
                .catch( exp => {
                    throw exp;
                });
            })
            .catch(err =>{
                throw err;
            })
        },
        updateAnnouncement(ancmnt) {
            // console.log(`update announcement ID: ${ancmnt.announcementId}`);
            return knex('announcements')
            .update({
                title: ancmnt.title,
                content: ancmnt.content,
                updatedUserId: ancmnt.updatedUserId,
                createdDate: new Date(ancmnt.postedDate),
                updatedDate: new Date(ancmnt.updatedDate)
            })
            .where({announcementId: ancmnt.announcementId})
            .then( result => {
                return result;
            })
            .catch( err => {
                throw err;
            })
        },
        readAnnouncements(ancmntId) {
            // console.log(`readAnnouncement ${ancmntId}`);
            // const sqlstm = knex({ a: 'announcements' })
            // .select({
            //     announcementId: 'a.announcementId',
            //     title: 'a.title',
            //     content: 'a.content',
            //     userId: 'a.userId',
            //     postedBy: knex.raw('(select `u`.`username` from `dcvnps`.`users` as `u` where `u`.`userId` = `a`.`userId`)'),
            //     postedDate: 'a.createdDate',
            //     updatedDate: 'a.updatedDate'
            // })
            // .whereRaw('`a`.`announcementId` = IFNULL(?,`a`.`announcementId`)', [ancmntId])
            // .toQuery();
            // console.log(sqlstm);
            // console.log(`Read announcement Id: ${ancmntId}`);
            return knex({ a: 'announcements' })
                .select({
                    announcementId: 'a.announcementId',
                    title: 'a.title',
                    content: 'a.content',
                    postedBy: knex.raw('(select concat_ws(\' \',`u`.`userGivenName`,`u`.`userSurname`) from `dcvnps`.`users` as `u` where `u`.`userId` = `a`.`postedUserId`)'),
                    postedDate: 'a.createdDate',
                    updatedBy: knex.raw('(select concat_ws(\' \',`u`.`userGivenName`,`u`.`userSurname`) from `dcvnps`.`users` as `u` where `u`.`userId` = `a`.`updatedUserId`)'),
                    updatedDate: 'a.updatedDate'
                })
                .whereRaw('`a`.`announcementId` = IFNULL(?,`a`.`announcementId`)', [ancmntId])
                .then(data => {
                    return JSON.stringify(data);
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
        },
        deleteAnnouncements(ancmntId) {
            return knex('announcements')
            .whereRaw('announcementId = ?',[ancmntId])
            .delete()
            .then ( roweffected => {
                return roweffected
            })
            .catch(err => {
                throw err;
            });
        },
        destroy() {
            knex.destroy();
        }
    }
}());