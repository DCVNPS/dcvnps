import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { Config } from '../../config';
import { GalleryDataService } from '../../dataaccess/gallery.service';
import { RemoveDirSync } from '../../lib/rd-sync';

class GalleryRouter {
    public galleryRouter = express.Router();
    private config: Config = new Config();
    private log: any;
    private logLevel: any;
    private uuidv4: any;
    private galleryBaseDir: string;
    private galleryDataService = new GalleryDataService();
    private removeDirSync = new RemoveDirSync();
    constructor() {
        this.log = this.config.logger;
        this.logLevel = this.config.logLevel;
        this.uuidv4 = this.config.uuidv4;
        this.galleryBaseDir = path.join(this.config.rootdir, '../galleries');
        this.configGalleryRouter();
    }

    private configGalleryRouter() {
        // GET gallery by gallery id.
        // Called by: GalleriesPhotosResolve, EditGalleryResolve
        this.galleryRouter.get('/:galleryid?/:activeind?', (req, res) => {
            const galleryId = req.params.galleryid || null;
            const activeInd = req.params.activeind || null;
            // log.info({id:req.id, gallery: gallery, year:year, author:author},'request');
            this.galleryDataService.readGalleries(galleryId, activeInd)
                .then((data) => {
                    return res.status(200).json(data);
                })
                .catch((err) => {
                    this.log.levels('dcvnpslog', this.logLevel.ERROR);
                    this.log.error({ id: req.id, err: err }, 'Error get gallery photos by name');
                    return res.status(500).json({ error: err.message });
                });
        });

        // GET photo of gallery by gallery name.
        // Called by: GalleryPhotosResolve, EditGalleryResolve
        this.galleryRouter.get('/name/:gallery?/:activeind?', (req, res) => {
            const gallery = req.params.gallery || null;
            const activeInd = req.params.activeind || null;
            const author = req.params.author || null;
            // log.info({id:req.id, gallery: gallery, year:year, author:author},'request');
            this.galleryDataService.readGalleriesByName(gallery, activeInd)
                .then((data) => {
                    return res.status(200).json(data);
                })
                .catch((err) => {
                    this.log.levels('dcvnpslog', this.logLevel.ERROR);
                    this.log.error({ id: req.id, err: err }, 'Error get gallery photos by name');
                    return res.status(500).json({ error: err.message });
                });

        });

        this.galleryRouter.delete('/', async (req, res) => {
            const { galleryId, gallery, galImgSrc } = req.body;
            // const photoFilePath = path.join(this.config.rootdir, '../', galImgSrc);
            const galleryDir = path.join(this.galleryBaseDir, gallery.replace(' ', '_'));
            const tempGalDir = path.join(this.galleryBaseDir, `temp_${gallery.replace(' ', '_')}`);
            // Save the gallery content in case delete from database fail
            // we can use that to restore the file.
            if (fs.existsSync(galleryDir)) {
                try {
                    fs.renameSync(galleryDir, tempGalDir);
                    // Successfully backup gallery content, delete entry in database.
                    const result = await this.galleryDataService.deleteGallery(galleryId);
                    if (result) {
                        // Delete database success, remove the backup directory
                        await this.removeDirSync.rmDirSync(tempGalDir);
                        return res.status(200).json(`Gallery ${gallery} has been deleted.`);
                    }
                } catch (err) {
                    console.log(`Delete Gallery ${gallery} failed. ${err.message}`);
                }
            }
            try {
            } catch (err) {
                // console.log(error);
                // console.log(`Resote file ${filePath}`);
                // Failure to remove photo entry in database, restore files.
                if (fs.existsSync(tempGalDir)) {
                    fs.renameSync(tempGalDir, galleryDir);
                }
                this.log.levels('dcvnpslog', this.logLevel.ERROR);
                this.log.error({ id: req.id, err: err }, 'Error deleting photo');
                return res.status(500).json(`Error delete gallery ${gallery} ---- ${err.message}`);
            }
        });

        // Create a new gallery
        this.galleryRouter.post('/', async (req, res) => {
            const photoFile = req.files.photoFile;
            const galleryData = req.body;
            galleryData.galleryId = this.uuidv4();
            galleryData.createdDate = new Date();
            galleryData.updatedDate = new Date();
            galleryData.updatedUserId = req.auth.userid;
            const destFile = this.imgFilePath(galleryData.gallery, galleryData.profilePhoto);
            try {
                const instResult = await this.galleryDataService.createGallery(galleryData);
                if (instResult.success) {
                    photoFile.mv(destFile, error => {
                        if (error) {
                            this.log.levels('dcvnpslog', this.logLevel.ERROR);
                            this.log.error({ id: req.id, err: error }, 'Error Creating Galleries');
                            throw error;
                        }
                    });
                    return res.status(200).json({ success: true, gallery: galleryData });
                }
            } catch (err) {
                console.log(`insert galleries error: ${err}\nRemove file from server `);
                this.log.levels('dcvnpslog', this.logLevel.ERROR);
                this.log.error({ id: req.id, err: err }, 'Error Creating Galleries');
                return res.status(500).json(err.message);
            }
        });

        // Update a gallery
        this.galleryRouter.put('/', async (req, res) => {
            let newImgPath: string;
            let curImgPath: string;
            let bkCurImgPath: string;
            const galleryData = req.body;

            if (req.files) {
                const photoFile = req.files.photoFile;
                // console.log({ galleryData, photoFile });
                newImgPath = this.imgFilePath(galleryData.gallery, photoFile.name.toLocaleLowerCase());
                curImgPath = this.imgFilePath(galleryData.gallery, galleryData.profilePhoto);
                bkCurImgPath = this.imgFilePath(galleryData.gallery, `bk_${galleryData.profilePhoto}`);
                // console.log({ curImgPath, bkCurImgPath, newImgPath });
                // backup current Image
                try {
                    if (fs.existsSync(curImgPath)) {
                        fs.renameSync(curImgPath, bkCurImgPath);
                    }
                    photoFile.mv(newImgPath, error => {
                        if (error) {
                            this.log.levels('dcvnpslog', this.logLevel.ERROR);
                            this.log.error({ id: req.id, err: error }, 'Error Creating Galleries');
                            throw error;
                        }
                    });
                    galleryData.profilePhoto = photoFile.name.toLocaleLowerCase();
                } catch (err) {
                    // restore the image.
                    if (fs.existsSync(bkCurImgPath)) {
                        fs.renameSync(bkCurImgPath, curImgPath);
                    }
                    return res.status(500).json(err.message);
                }
            }
            if (galleryData.oldGalleryName) {
                // console.log(`Old Gallery Name: ${galleryData.oldGalleryName}`);
                const curGalleryDir = path.join(this.galleryBaseDir, galleryData.oldGalleryName.replace(' ', '_'));
                const newGalleryDir = path.join(this.galleryBaseDir, galleryData.gallery.replace(' ', '_'));
                try {
                    fs.renameSync(curGalleryDir, newGalleryDir);
                } catch (err) {
                    return res.status(500).json(err.message);
                }
            }

            return this.galleryDataService.updateGallery(galleryData)
                .then(result => {
                    // successful update, remove the backup image.
                    if (fs.existsSync(bkCurImgPath)) {
                        fs.unlinkSync(bkCurImgPath);
                    }
                    return res.status(200).json(`Gallery ${galleryData.gallery} updated.`);
                })
                .catch(err => {
                    // restore the image.
                    if (fs.existsSync(bkCurImgPath)) {
                        fs.renameSync(bkCurImgPath, curImgPath);
                    }
                    return res.status(500).json(err.message);
                });
        });

    }

    private imgFilePath(gallery: string, fileName: string): string {
        return path.join(this.galleryBaseDir, gallery.replace(' ', '_'), 'profile', fileName);
    }
}

export default new GalleryRouter().galleryRouter;
