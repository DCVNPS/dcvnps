import { Config } from '../config';

export class GalleryPhotosDataService {
    private config: Config = new Config();
    private mySQL: any;

    constructor() {
        this.mySQL = this.config.mySQL;
    }

    public async insertGalleryPhoto(galleryPhotoId, galleryId, photo, portrait, author, year, updatedUserId, createdDate, updatedDate) {
        let response;
        return this.mySQL('galleryphotos').insert({
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

    public async getPhotoByGalleryId(galleryId, year, author) {
        return this.mySQL({ gp: 'galleryphotos', g: 'galleries' })
            .select({
                galleryPhotoId: 'gp.galleryPhotoId',
                galleryId: 'gp.galleryId',
                gallery: 'g.gallery',
                imgalt: 'gp.photo',
                imgsrc: this.mySQL.raw('concat_ws(\'/\',\'/galleries\', replace(g.gallery,\' \',\'_\'), gp.year, concat_ws(\'_\',gp.galleryPhotoId, gp.photo))'),
                author: 'gp.author',
                year: 'gp.year',
                portrait: 'gp.portrait'
            })
            .orderBy([{ column: 'year', order: 'desc' }, 'author'])
            .whereRaw('?? = ??', ['gp.galleryId', 'g.galleryId'])
            .whereRaw('?? = IFNULL(?, ??) and ?? = IFNULL(?, ??) and ?? = IFNULL(?, ??)', ['g.galleryId', galleryId, 'g.galleryId', 'gp.year', year, 'gp.year', 'gp.author', author, 'gp.author'])
            .then((data) => {
                const result = [];
                data.forEach((item) => {
                    const sr = result.find((y) => y.year === item.year);
                    if (!sr) {
                        // a new year value, there should not be any author or photo in the set
                        const jsonEl = { 'year': item.year, 'authorData': [] };
                        const anAuthor = { 'author': item.author, 'year': item.year, 'photos': [] };
                        anAuthor.photos.push({
                            'photoId': item.galleryPhotoId,
                            'galleryId': item.galleryId,
                            'gallery': item.gallery,
                            'imgalt': item.imgalt,
                            'imgsrc': item.imgsrc,
                            'portrait': item.portrait,
                            'hidden': true
                        });
                        jsonEl.authorData.push(anAuthor);
                        result.push(jsonEl);
                    } else {
                        // a year exists in the array
                        // find the author that comes along with item result of current year
                        let thisAuthor = sr.authorData.find((a) => a.author === item.author);
                        if (!thisAuthor) {
                            // new author to the list
                            thisAuthor = { 'author': item.author, 'year': item.year, 'gallery': galleryId, 'photos': [] };
                            thisAuthor.photos.push({
                                'photoId': item.galleryPhotoId,
                                'galleryId': item.galleryId,
                                'gallery': item.gallery,
                                'imgalt': item.imgalt,
                                'imgsrc': item.imgsrc,
                                'portrait': item.portrait,
                                'hidden': true
                            });
                            sr.authorData.push(thisAuthor);
                        } else {
                            // existing author
                            thisAuthor.photos.push({
                                'photoId': item.galleryPhotoId,
                                'galleryId': item.galleryId,
                                'gallery': item.gallery,
                                'imgalt': item.imgalt,
                                'imgsrc': item.imgsrc,
                                'portrait': item.portrait,
                                'hidden': true
                            });
                        }
                    }
                });
                return result;
                // return data;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

    public getPhotoByGalleryName(gallery, year, author) {
        return this.mySQL({ gp: 'galleryphotos', g: 'galleries' })
            .select(
                {
                    galleryPhotoId: 'gp.galleryPhotoId',
                    galleryId: 'gp.galleryId',
                    gallery: 'g.gallery',
                    imgalt: 'gp.photo',
                    imgsrc: this.mySQL.raw('concat_ws(\'/\',\'/galleries\', replace(g.gallery,\' \',\'_\'), gp.year, concat_ws(\'_\',gp.galleryPhotoId, gp.photo))'),
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
                const result = [];
                data.forEach((item) => {
                    const sr = result.find((y) => y.year === item.year);
                    if (!sr) {
                        // a new year value, there should not be any author or photo in the set
                        const jsonEl = { 'year': item.year, 'authorData': [] };
                        const anAuthor = { 'author': item.author, 'year': item.year, 'gallery': gallery, 'photos': [] };
                        anAuthor.photos.push({
                            'photoId': item.galleryPhotoId,
                            'galleryId': item.galleryId,
                            'gallery': item.gallery,
                            'imgalt': item.imgalt,
                            'imgsrc': item.imgsrc,
                            'portrait': item.portrait,
                            'hidden': true
                        });
                        jsonEl.authorData.push(anAuthor);
                        result.push(jsonEl);
                    } else {
                        // a year exists in the array
                        // find the author that comes along item result of current year
                        let thisAuthor = sr.authorData.find((a) => a.author === item.author);
                        if (!thisAuthor) {
                            // new author to the list
                            thisAuthor = { 'author': item.author, 'year': item.year, 'photos': [] };
                            thisAuthor.photos.push({
                                'photoId': item.galleryPhotoId,
                                'galleryId': item.galleryId,
                                'gallery': item.gallery,
                                'imgalt': item.imgalt,
                                'imgsrc': item.imgsrc,
                                'portrait': item.portrait,
                                'hidden': true
                            });
                            sr.authorData.push(thisAuthor);
                        } else {
                            // existing author
                            thisAuthor.photos.push({
                                'photoId': item.galleryPhotoId,
                                'galleryId': item.galleryId,
                                'gallery': item.gallery,
                                'imgalt': item.imgalt,
                                'imgsrc': item.imgsrc,
                                'portrait': item.portrait,
                                'hidden': true
                            });
                        }
                    }
                });
                return result;
                // return data;
            })
            .catch((error) => { console.log(error); throw error; });
    }

    public getPhoto(photoId) {
        return this.mySQL({ gp: 'galleryphotos', g: 'galleries' })
            .select(
                {
                    photoId: 'gp.galleryPhotoId',
                    galleryId: 'gp.galleryId',
                    gallery: 'g.gallery',
                    imgalt: 'gp.photo',
                    imgsrc: this.mySQL.raw('concat_ws(\'/\',\'/galleries\', g.gallery, gp.year, concat_ws(\'_\',gp.galleryPhotoId, gp.photo))'),
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
                throw err;
            });
    }

    public deletePhoto(photoId) {
        return this.mySQL('galleryphotos')
            .whereRaw('galleryPhotoId = ?', [photoId])
            .delete()
            .then(resp => {
                return resp;
            })
            .catch(err => {
                throw err;
            });
    }
}
