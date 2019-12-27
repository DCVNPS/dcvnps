const uuidv4 = require('uuid/v4');
const AnnouncementsService = require('../../dataAccess/announcementsService');

module.exports = (express, config) => {
    if (!config) {
        throw new Error('admin user missing config object');
    }
    const announcementsService = AnnouncementsService(config);
    const bcrypt = config.bcrypt;
    const log = config.logger;
    const logLevel = config.logLevel;
    const router = express.Router();
    router.get('/:announceId?', (req, res) => {
        // console.log(req.auth);
        const announceId = req.params.announceId || null;
        return announcementsService.readAnnouncements(announceId)
            .then(data => {
                const jData = JSON.parse(data);
                return res.status(200).send(jData);
            })
            .catch(err => {
                log.levels('dcvnpslog', logLevel.ERROR)
                log.error({ id: req.id, err: err }, 'Error getting announcements');
                return res.status(500).json(err.message);
            })
    });

    router.post('/', async (req, res) => {
        try {
            // const ancmntuuid = uuidv4();
            let ancmnt = req.body;
            ancmnt.announcementId = uuidv4();
            ancmnt.postedUserId = req.auth.userid;
            ancmnt.postedDate = new Date();
            ancmnt.updatedUserId = req.auth.userid;
            ancmnt.updatedDate = new Date();
            const result = await announcementsService.createAnnouncements(ancmnt);
            const jData = JSON.parse(result);
            // console.log(jData);
            return res.status(200).json(jData[0]);
        }
        catch (error) {
            // console.log(error);
            log.levels('dcvnpslog', logLevel.ERROR)
            log.error({ id: req.id, err: err }, 'Error creating announcement');
            return res.status(500).json(error.message);
        }
    });

    router.put('/', async (req, res) => {
        try {
            const ancmnt = req.body;
            ancmnt.updatedUserId = req.auth.userid;
            ancmnt.updatedDate = new Date();
            // console.log(ancmnt);
            const result = await announcementsService.updateAnnouncements(ancmnt);
            return res.status(200).json(ancmnt);
        }
        catch (error) {
            // console.log(error);
            log.levels('dcvnpslog', logLevel.ERROR)
            log.error({ id: req.id, err: err }, 'Error updating announcement');
            return res.status(500).json(error.message);
        }
    });

    router.delete('/:announceId', async (req, res) => {
        const announceId = req.params.announceId || null;
        console.log(`delete announcement with id ${announceId}`);
        try {
            if (announceId) {
                const result = await announcementsService.deleteAnnouncements(announceId);
                return res.status(200).json(`${result} row(s) deleted.`);
            } else {
                return res.status(500).json('announceId is required to delete an announcement');
            }
        }
        catch (err) {
            log.levels('dcvnpslog', logLevel.ERROR)
            log.error({ id: req.id, err: err }, 'Error deleting announcement');
            return res.status(500).json(err.message);
        }
    });
    return router;
}