import { Config } from '../config';

export class GalleryDataService {
    private config: Config = new Config();
    private mySQL: any;

    constructor() {
        this.mySQL = this.config.mySQL;
    }

    public createGallery(galleryData) {
        let response;
        return this.mySQL('galleries').insert({
            galleryId: galleryData.galleryId,
            gallery: galleryData.gallery,
            activeInd: galleryData.activeInd,
            profilePhoto: galleryData.profilePhoto,
            updatedUserId: galleryData.updatedUserId,
            createdDate: galleryData.createdDate,
            updatedDate: galleryData.updatedDate
        })
            .then((result) => {
                response = {
                    success: true,
                    galleryId: galleryData.galleryId
                };
                return response;
            })
            .catch(function (err) {
                throw err;
            });
    }

    public updateGallery(galleryData) {
        let response;
        return this.mySQL('galleries')
        .where({galleryId: galleryData.galleryId})
        .update({
            gallery: galleryData.gallery,
            activeInd: galleryData.activeInd,
            profilePhoto: galleryData.profilePhoto,
            updatedUserId: galleryData.updatedUserId,
            updatedDate: galleryData.updatedDate
        })
            .then((result) => {
                response = {
                    success: true,
                    galleryId: galleryData.galleryId
                };
                return response;
            })
            .catch(function (err) {
                throw err;
            });
    }

    public readGalleries(galleryId, activeInd) {
        return this.mySQL('galleries')
            .select('galleryId', 'gallery', 'activeInd', 'profilePhoto', 'updatedUserId', 'createdDate', 'updatedDate')
            .whereRaw('`galleryId` = IFNULL(?,`galleryId`) and `activeInd` = IFNULL(?,`activeInd`)', [galleryId, activeInd])
            .orderBy('createdDate')
            .then((data) => {
                return data;
            })
            .catch(function (err) {
                throw err;
            });
    }

    public readGalleriesByName(gallery, activeInd) {
        return this.mySQL('galleries')
            .select('galleryId', 'gallery', 'activeInd', 'profilePhoto', 'updatedUserId', 'createdDate', 'updatedDate')
            .whereRaw('`gallery` = IFNULL(?,`gallery`) and `activeInd` = IFNULL(?,`activeInd`)', [gallery, activeInd])
            .orderBy('createdDate')
            .then((data) => {
                return data;
            })
            .catch(function (err) {
                throw err;
            });
    }

    public deleteGallery(galleryId) {
        return this.mySQL('galleries')
            .whereRaw('galleryId = ?', [galleryId])
            .delete()
            .then(resp => {
                return resp;
            })
            .catch(err => {
                throw err;
            });
    }
}
