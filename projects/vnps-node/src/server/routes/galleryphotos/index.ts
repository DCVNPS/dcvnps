import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { Config } from '../../config';
import { GalleryPhotosDataService } from '../../dataaccess/galleryphotos.service';

class GalleryPhotosRouter {
    public galleryPhotosRouter = express.Router();
    private config: Config = new Config();
    private log: any;
    private logLevel: any;
    private uuidv4: any;
    private galleryBaseDir: string;
    private galleryPhotosDataService = new GalleryPhotosDataService();

    constructor() {
        this.log = this.config.logger;
        this.logLevel = this.config.logLevel;
        this.uuidv4 = this.config.uuidv4;
        this.galleryBaseDir = path.join(this.config.rootdir, '../', 'galleries');
        this.configGalleryPhotosRouter();
    }

    private configGalleryPhotosRouter() {
        // GET photo of gallery by gallery name.
        this.galleryPhotosRouter.get('/name/:gallery?/:year?/:author?', (req, res) => {
            const gallery = req.params.gallery || null;
            const year = req.params.year || null;
            const author = req.params.author || null;
            // log.info({id:req.id, gallery: gallery, year:year, author:author},'request');
            this.galleryPhotosDataService.getPhotoByGalleryName(gallery, year, author)
                .then((data) => {
                    return res.status(200).json(data);
                })
                .catch((err) => {
                    this.log.levels('dcvnpslog', this.logLevel.ERROR);
                    this.log.error({ id: req.id, err: err }, 'Error get gallery photos by name');
                    return res.status(500).json({ error: err.message });
                });

        });

        // GET photo of gallery by gallery id.
        // Called by: GalleriesPhotosResolve, EditGalleryResolve
        this.galleryPhotosRouter.get('/:gid?/:year?/:author?', (req, res) => {
            const galleryid = req.params.gid || null;
            const year = req.params.year || null;
            const author = req.params.author || null;
            // log.info({id:req.id, gallery: gallery, year:year, author:author},'request');
            this.galleryPhotosDataService.getPhotoByGalleryId(galleryid, year, author)
                .then((data) => {
                    return res.status(200).json(data);
                })
                .catch((err) => {
                    this.log.levels('dcvnpslog', this.logLevel.ERROR);
                    this.log.error({ id: req.id, err: err }, 'Error get gallery photos by name');
                    return res.status(500).json({ error: err.message });
                });
        });

        this.galleryPhotosRouter.delete('/', (req, res) => {
            const { photoId, imgsrc } = req.body;
            const filePath = path.join(this.galleryBaseDir, imgsrc.replace('/galleries', ''));
            // console.log(`read file ${filePath}`);
            // Save the file content in case delete from database fail
            // we can use that to restore the file.
            const file = fs.readFileSync(filePath);
            try {
                fs.unlinkSync(filePath);
                // console.log(`file ${filePath} removed.`);
                // Success removing file from server, delete entry in database.
                this.galleryPhotosDataService.deletePhoto(photoId)
                    .then(resp => {
                        console.log(resp);
                        return res.status(200).json(`Photo ${imgsrc} has been deleted.`);
                    })
                    .catch(exp => {
                        throw exp;
                    });
            } catch (err) {
                // console.log(error);
                // console.log(`Resote file ${filePath}`);
                // Failure to remove photo entry in database, restore file.
                this.log.levels('dcvnpslog', this.logLevel.ERROR);
                this.log.error({ id: req.id, err: err }, 'Error deleting photo');
                if ( file ) {
                    fs.writeFileSync(filePath, file);
                }
                return res.status(500).json(`Error verifying delete file ${imgsrc} ---- ${err.message}`);
            }
        });

        // Upload a photo to a gallery
        this.galleryPhotosRouter.post('/', async (req, res) => {
            if (!req.files) {
                return res.status(400).send('No file uploaded');
            }
            const { galleryId, gallery, year, fileName, author, portrait } = req.body;
            console.log({ 'galleryId': galleryId, 'gallery': gallery, 'year': year, 'portrait': portrait, 'author': author, 'fileName': fileName });
            const file = req.files.file;
            const updatedUserId = req.auth.userid;
            const createdDate = new Date();
            const updatedDate = new Date();
            const gUuid = this.uuidv4();
            const destFileName = `${gUuid}_${fileName}`;
            const destFile = path.join(this.galleryBaseDir, gallery.replace(' ', '_'), year, destFileName);
            // try {
            //     fs.mkdirSync(path.join(this.galleryBaseDir, `${upldGallery}/${upldYear}`), { recursive: true });
            // } catch (err) {
            //     console.log(err.message);
            // }
            // console.log(`${destFileName} -- ${fileName}`);
            file.mv(destFile, err => {
                if (err) {
                    // console.log('photoupload-Move file', err.message)
                    this.log.levels('dcvnpslog', this.logLevel.ERROR);
                    this.log.error({ id: req.id, err: err }, 'Error photoupload-Move files');
                    return res.status(500).send(`Failed Upload Image ${file.name} --\n ${err.message}`);
                }
                this.galleryPhotosDataService.insertGalleryPhoto(gUuid, galleryId, fileName, JSON.parse(portrait), author.toLowerCase(), year, updatedUserId, createdDate, updatedDate)
                    .then(result => {
                        const photo = {
                            photoId: gUuid,
                            galleryId: galleryId,
                            gallery: gallery,
                            imgalt: fileName,
                            imgsrc: `/galleries/${gallery.replace(' ', '_')}/${year}/${destFileName}`,
                            portrait: portrait,
                            hidden: 'false'
                        };
                        result.photo = photo;
                        // console.log(result);
                        return res.status(200).json(result);
                    })
                    // tslint:disable-next-line: no-shadowed-variable
                    .catch( err => {
                        // console.log(`insert galleryPhotos error: ${err}\nRemove file from server `);
                        this.log.levels('dcvnpslog', this.logLevel.ERROR);
                        this.log.error({ id: req.id, err: err }, 'Error Insertting GalleryPhotos');
                        fs.unlinkSync(destFile);
                        return res.status(500).json(err.message);
                    });
            });
        });
    }
}

export default new GalleryPhotosRouter().galleryPhotosRouter;
