module.exports = (config) => {

    if (!config) {
        throw new Error('commonService missing config object.')
    }
    const mySQL = config.mySQL;

    async function insertGalleries(galleryData ) {
        var response;
        return mySQL('galleries').insert({
            galleryId: galleryData.galleryId,
            gallery: galleryData.gallery,
            profilePhoto: galleryData.profilePhoto,
            activeInd: galleryData.activeInd,
            updatedUserId: galleryData.updatedUserId,
            createdDate: galleryData.createdDate,
            updatedDate: galleryData.updatedDate
        })
            .then((result) => {
                response = {
                    success: true
                };
                return response;
            })
            .catch(function (err) {
                throw err;
            });
    }

    async function readGalleries(galleryId, activeInd) {
        return mySQL('galleries')
            .select('galleryId', 'gallery', 'profilePhoto', 'updatedUserId', 'createdDate', 'updatedDate')
            .whereRaw('`galleryId` = IFNULL(?,`galleryId`) and `activeInd` = IFNULL(?,`activeInd`)', [galleryId,activeInd])
            .orderBy('createdDate')
            .then((data) => {
                return data;
            })
            .catch(function (err) {
                throw err;
            });
    }

    async function deleteGalleries(galleryid){
        try{
            const resp = await mySQL('galleries').where({galleryId: galleryid}).delete();
            return resp;
        }
        catch( error ){
            throw error;
        }
    }

    async function insertGalleryPhoto(galleryPhotoId, galleryId, photo, portrait, author, year, updatedUserId, createdDate, updatedDate) {
        var response;
        return mySQL('galleryphotos').insert({
            galleryPhotoId,
            galleryId,
            photo,
            portrait,
            author,
            year,
            updatedUserId,
            createdDate,
            updatedDate
        })
            .then((result) => {
                response = {
                    success: true,
                    galleryPhotoId: galleryPhotoId
                };
                return response;
            })
            .catch(function (err) {
                throw err;
            });
    }

    async function getPhotoByGalleryId(galleryId, year, author) {
        return mySQL({ gp: 'galleryphotos', g: 'galleries' })
            .select({
                galleryPhotoId: 'gp.galleryPhotoId',
                galleryId: 'gp.galleryId',
                gallery: 'g.gallery',
                imgalt: 'gp.photo',
                imgsrc: mySQL.raw('concat_ws(\'/\',\'/galleries\', replace(g.gallery,\' \',\'_\'), gp.year, concat_ws(\'_\',gp.galleryPhotoId, gp.photo))'),
                author: 'gp.author',
                year: 'gp.year',
                portrait: 'gp.portrait'
            })
            .orderBy([{ column: 'year', order: 'desc' }, 'author'])
            .whereRaw('?? = ??', ['gp.galleryId', 'g.galleryId'])
            .whereRaw('?? = IFNULL(?, ??) and ?? = IFNULL(?, ??) and ?? = IFNULL(?, ??)', ['g.galleryId', galleryId, 'g.galleryId', 'gp.year', year, 'gp.year', 'gp.author', author, 'gp.author'])
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
            .catch((error) => { 
                console.log(error); 
                throw error; });
    }
    function getPhotoByGalleryName(gallery, year, author) {
        return mySQL({ gp: 'galleryphotos', g: 'galleries' })
            .select(
                {
                    galleryPhotoId: 'gp.galleryPhotoId',
                    galleryId: 'gp.galleryId',
                    gallery: 'g.gallery',
                    imgalt: 'gp.photo',
                    imgsrc: mySQL.raw('concat_ws(\'/\',\'/galleries\', g.gallery, gp.year, concat_ws(\'_\',gp.galleryPhotoId, gp.photo))'),
                    author: 'gp.author',
                    year: 'gp.year',
                    portrait: 'gp.portrait'
                }
            )
            .orderBy([{ column: 'year', order: 'desc' }, 'author'])
            .whereRaw('?? = ??', ['gp.galleryId', 'g.galleryId'])
            .whereRaw('?? = IFNULL(?, ??)', ['g.gallery', gallery, 'g.gallery'])
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
    }
    function getPhoto(photoId) {
        return mySQL({ gp: 'galleryphotos', g: 'galleries' })
            .select(
                {
                    photoId: 'gp.galleryPhotoId',
                    galleryId: 'gp.galleryId',
                    gallery: 'g.gallery',
                    imgalt: 'gp.photo',
                    imgsrc: mySQL.raw('concat_ws(\'/\',\'/galleries\', g.gallery, gp.year, concat_ws(\'_\',gp.galleryPhotoId, gp.photo))'),
                    author: 'gp.author',
                    portrait: 'gp.portrait',
                    hidden: 'false'
                }
            )
            .orderBy([{ column: 'year', order: 'desc' }, 'author'])
            .whereRaw('?? = ??', ['gp.galleryId', 'g.galleryId'])
            .whereRaw('gp.galleryPhotoId = ?', [photoId])
            .then((data) => {
                console.log(data);
                return JSON.stringify(data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    function deletePhoto(photoId) {
        return mySQL('galleryphotos')
            .whereRaw('galleryPhotoId = ?', [photoId])
            .delete()
            .then(resp => {
                return resp;
            })
            .catch(err => {
                throw err;
            })
    }

    return {
        insertGalleries,
        deleteGalleries,
        insertGalleryPhoto,
        readGalleries,
        getPhotoByGalleryId,
        getPhotoByGalleryName,
        getPhoto,
        deletePhoto
    }
}