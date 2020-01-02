const fs = require('fs');
const GalleriesService = require('../../dataAccess/galleriesService');
module.exports = (express, config) => {
    if (!config) {
        throw new Error('admin user missing config object');
    }
    const galleriesService = GalleriesService(config);
    // const bcrypt = config.bcrypt;
    const log = config.logger;
    const logLevel = config.logLevel;
    const uuidv4 = config.uuidv4;
    const galleryBaseDir = `${config.rootdir}/galleries`;
    const router = express.Router();

    router.get('/:galleryId?', (req, res) => {
        const galleryId = req.params.galleryId || null;
        galleriesService.readGalleries(galleryId)
            .then((data) => {
                // console.log(data);
                return res.status(200).json(data);
            })
            .catch((err) => {
                log.levels('dcvnpslog',logLevel.ERROR)
                log.error({id: req.id, err: err},`Error getting gallery ${galleryId}`);
                return res.status(500).json(err.message);
            });
    });
    // Get photo of a gallery by a galleryId
    router.get('/photosbyid/:galleryId', (req, res) => {
        const galleryId = req.params.galleryId;
        // log.info({id:req.id, galleryId: galleryId},'request');
        galleriesService.getPhotoByGalleryId(galleryId)
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((err) => {
                log.levels('dcvnpslog',logLevel.ERROR);
                log.error({id:req.id, err: err},'response');               
                return res.status(500).json({ error: err.message });
            })
    });

    // GET photo of gallery by gallery name.
    // Called by: GalleryPhotosResolve, EditGalleryResolve
    router.get('/photosbyname/:gallery/:year?/:author?', (req, res) => {
        const gallery = req.params.gallery;
        const year = req.params.year || null;
        const author = req.params.author || null;
        // log.info({id:req.id, gallery: gallery, year:year, author:author},'request');
        galleriesService.getPhotoByGalleryName(gallery, year, author)
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((err) => {
                log.levels('dcvnpslog',logLevel.ERROR);
                log.error({id:req.id, err: err},'Error get gallery photos by name');
                return res.status(500).json({ error: err.message });
            })

    });

    router.delete('/deletephoto', (req, res) => {
        const { photoId, galleryId, gallery, imgalt, imgsrc, portrait, hidden } = req.body;
        // console.log({ photoId, galleryId, gallery, imgalt, imgsrc, portrait, hidden });
        const filePath = path.join(galleryBaseDir, imgsrc.replace('/galleries', ''));
        // console.log(`read file ${filePath}`);
        // Save the file content in case delete from database fail
        // we can use that to restore the file. 
        const file = fs.readFileSync(filePath);
        try {
            fs.unlinkSync(filePath);
            // console.log(`file ${filePath} removed.`);
            // Success removing file from server, delete entry in database.
            galleriesService.deletePhoto(photoId)
                .then(resp => {
                    console.log(resp); gallery
                    return res.status(200).json(`Photo ${imgsrc} has been deleted.`);
                })
                .catch(exp => {
                    throw exp;
                });
        }
        catch (err) {
            // console.log(error);
            // console.log(`Resote file ${filePath}`);
            // Failure to remove photo entry in database, restore file.
            log.levels('dcvnpslog',logLevel.ERROR)
            log.error({id: req.id, err: err},'Error deleting photo');
            fs.writeFileSync(filePath, file);
            return res.status(500).json(`Error verifying delete file ${imgsrc} ---- ${err.message}`);
        }
    });
    
    // Upload a photo to a gallery
    router.post('/upload/:gallery/:year', async (req, res) => {
        const upldGallery = req.params['gallery'];
        const upldYear = req.params['year'];
        const { galleryId, fileName, author, size, portrait } = req.body;
        if (!req.files) {
            return res.status(400).send('No file uploaded');
        }
        // console.log({ "galleryId": galleryId, "gallery": upldGallery, "year": upldYear, "portrait": portrait, "author": author, "fileName": fileName });
        const file = req.files.file;
        const updateUser = 'Temporary';
        const createdDate = new Date();
        const updatedDate = new Date();
        const gUuid = uuidv4();
        const destFileName = `${gUuid}_${fileName}`;
        const destFile = path.join(galleryBaseDir, `${upldGallery}/${upldYear}/${destFileName}`);
        // console.log(`${destFileName} -- ${fileName}`);
        file.mv(destFile, err => {
            if (err) {
                // console.log('photoupload-Move file', err.message)
                log.levels('dcvnpslog',logLevel.ERROR)
                log.error({id: req.id, err: err},'Error photoupload-Move files');
               return res.status(500).send(`Failed Upload Image ${file.name} --\n ${err.message}`);
            }
            galleriesService.insertGalleryPhoto(gUuid, galleryId, fileName, JSON.parse(portrait), author.toLowerCase(), upldYear, updateUser, createdDate, updatedDate)
                .then(result => {
                    const photo = {
                        photoId: gUuid,
                        galleryId: galleryId,
                        gallery: upldGallery,
                        imgalt: fileName,
                        imgsrc: `/galleries/${upldGallery}/${upldYear}/${destFileName}`,
                        portrait: portrait,
                        hidden: 'false'
                    }
                    result.photo = photo;
                    // console.log(result);
                    return res.status(200).json(result);
                })
                .catch(err => {
                    // console.log(`insert gallery error: ${err}\nRemove file from server `);
                    log.levels('dcvnpslog',logLevel.ERROR)
                    log.error({id: req.id, err: err},'Error Insertting GalleryPhotos');
                    fs.unlink(destFile);
                    return res.status(err.status).json(err.message);
                });
        });
    });

    return router;
}