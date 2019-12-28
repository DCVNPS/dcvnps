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
    const router = express.Router();

    router.get('/:galleryId?', (req, res) => {
        const galleryId = req.params.galleryId || null;
        galleriesService.readGalleries(galleryId)
            .then((data) => {
                return res.json(data);
            })
            .catch((err) => {
                log.levels('dcvnpslog',logLevel.ERROR)
                log.error({id: req.id, err: err},`Error getting gallery ${galleryId}`);
                return res.status(500);
            });
    });
    // Get photo of a gallery by a galleryId
    router.get('/photosbyid/:galleryId', (req, res) => {
        const galleryId = req.params.galleryId;
        // log.info({id:req.id, galleryId: galleryId},'request');
        galleriesService.getPhotoByGalleryId(galleryId)
            .then((data) => {
                return res.json(data);
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
                return res.json(data);
            })
            .catch((err) => {
                log.levels('dcvnpslog',logLevel.ERROR);
                log.error({id:req.id, err: err},'Error get gallery photos by name');
                return res.status(500).json({ error: err.message });
            })

    });

    return router;
}