const fs = require('fs');
const Path = require('path');

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
    const galleryBaseDir = Path.join(config.rootdir,'../galleries');
    const router = express.Router();

    router.get('/:galleryId?', (req, res) => {
        const galleryId = req.params.galleryId || null;
        galleriesService.readGalleries(galleryId, null)
            .then((data) => {
                // console.log(data);
                return res.status(200).json(data);
            })
            .catch((err) => {
                log.levels('dcvnpslog', logLevel.ERROR)
                log.error({ id: req.id, err: err }, `Error getting gallery ${galleryId}`);
                return res.status(500).json(err.message);
            });
    });

    // Upload a photo to a gallery
    router.post('/upload/:gallery', async (req, res) => {
        const galDirPart = req.params['gallery'];
        const upldGallery = req.body;
        if (!req.files) {
            return res.status(400).send('No file uploaded');
        }

        const file = req.files.file;
        upldGallery.updatedUserId = req.auth.userid;
        upldGallery.galleryId = uuidv4();
        upldGallery.profilePhoto = file.name;
        upldGallery.updatedUserid = req.auth.userid;
        upldGallery.createdDate = new Date();
        upldGallery.updatedDate = new Date();
        console.log(upldGallery);
        galleryProfileDir = path.join(galleryBaseDir, `${galDirPart}/profile`);
        const destFile = path.join(galleryProfileDir, upldGallery.profilePhoto);
        console.log(destFile);
        try {
            fs.mkdirSync(galleryProfileDir, { recursive: true });
            fs.unlinkSync(destFile);
        }
        catch (error) {
            console.log(error.message); // let it goes if there's no destination file.
        }
        file.mv(destFile, err => {
            if (err) {
                console.log('photoupload-Move file', err.message)
                log.levels('dcvnpslog', logLevel.ERROR)
                log.error({ id: req.id, err: err }, 'Error photoupload-Move files');
                return res.status(500).send(`Failed Upload Image ${file.name} --\n ${err.message}`);
            }
            galleriesService.insertGalleries(upldGallery)
                .then(result => {
                    result.gallery = upldGallery;
                    console.log(result);
                    return res.status(200).json(result);
                })
                .catch(err => {
                    // console.log(`insert galleries error: ${err}\nRemove file from server `);
                    log.levels('dcvnpslog', logLevel.ERROR)
                    log.error({ id: req.id, err: err }, 'Error Insertting Galleries');
                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(200).json({ success: true, gallery: upldGallery });
                    }
                    if (fs.existsSync(destFile)) {
                        fs.unlinkSync(destFile);
                    }
                    return res.status(500).json(err.message);
                });
        });
    });

    router.delete('/', async (req, res) => {
        const { galleryId, galDirPart } = req.body;
        console.log({ 'gallery': galleryId, 'galDirPart': galDirPart });
        const galleryDirPath = path.join(galleryBaseDir, galDirPart);
        //// function to remove NOEMPTY directory recursively
        const rmDirRecursive = function(dirPath) {
            if (fs.existsSync(dirPath)) {
                fs.readdirSync(dirPath).forEach((item, index) => {
                    const curPath = Path.join(dirPath, item);
                    if (fs.lstatSync(curPath).isDirectory()) {
                        rmDirRecursive(curPath);
                    }
                    else {
                        fs.unlinkSync(curPath);
                    }
                })
            }
            fs.rmdirSync(dirPath, { maxRetries: 3, recursive: true });
        }
        try {
            // Save the gallery record in case delete from database fail
            // we can use that to restore the gallery.
            const bkGallery = await galleriesService.readGalleries(galleryId, null);
            if (bkGallery) {
                try{
                    rmDirRecursive(galleryDirPath);
                }
                catch(err){
                    if(!err.code === "ENOENT"){
                        // squalow directory does not exists;
                        throw err;
                    }
                }
                const resp = await galleriesService.deleteGalleries(galleryId);
            }
            else {
                throw new Error("NO_DATA_FOUND");
            }
            // console.log(bkGallery);
            return res.status(200).json({ success: true });
        }
        catch (err) {
            // Failure to remove photo entry in database, restore file.
            log.levels('dcvnpslog', logLevel.ERROR)
            log.error({ id: req.id, err: err }, 'Error deleting gallery');
            return res.status(500).json(`Error Deleting Gallery ${galDirPart.replace('_', ' ')} ---- ${err.message}`);
        }
    });

    return router;
}