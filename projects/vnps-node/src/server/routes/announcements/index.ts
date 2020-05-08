import * as express from 'express';
import { Config } from '../../config';
import { AnnouncementDataService } from '../../dataaccess/announcement.service';

class AnnouncementRouter {
    public announcementRouter = express.Router();
    private config: Config = new Config();
    private log: any;
    private logLevel: any;
    private uuidv4;
    private announcementDataService: AnnouncementDataService;
    constructor() {
        this.announcementDataService = new AnnouncementDataService();
        this.log = this.config.logger;
        this.uuidv4  = this.config.uuidv4;
        this.logLevel = this.config.logLevel;
        this.configAnnouncementRoute();
    }
    configAnnouncementRoute() {
        this.announcementRouter.get('/:announceId?', (req, res) => {
            // console.log(req.auth);
            const announceId = req.params.announceId || null;
            return this.announcementDataService.readAnnouncements(announceId)
                .then(data => {
                    const jData = JSON.parse(data);
                    return res.status(200).send(jData);
                })
                .catch(err => {
                    this.log.levels('dcvnpslog', this.logLevel.ERROR);
                    this.log.error({ id: req.id, err: err }, 'Error getting announcements');
                    return res.status(500).json(err.message);
                });
        });

        this.announcementRouter.post('/', async (req, res) => {
            try {
                const ancmnt = req.body;
                if (!ancmnt.announcementId) {
                    ancmnt.announcementId = this.uuidv4();
                }
                ancmnt.postedUserId = req.auth.userid;
                ancmnt.postedDate = new Date();
                ancmnt.updatedUserId = req.auth.userid;
                ancmnt.updatedDate = new Date();
                const result = await this.announcementDataService.createAnnouncements(ancmnt);
                const jData = JSON.parse(result);
                // console.log(jData);
                return res.status(200).json(jData[0]);
            } catch (err) {
                // console.log(error);
                this.log.levels('dcvnpslog', this.logLevel.ERROR);
                this.log.error({ id: req.id, err: err }, 'Error creating announcement');
                return res.status(500).json(err.message);
            }
        });

        this.announcementRouter.put('/', async (req, res) => {
            try {
                const ancmnt = req.body;
                ancmnt.updatedUserId = req.auth.userid;
                ancmnt.updatedDate = new Date();
                // console.log(ancmnt);
                const result = await this.announcementDataService.updateAnnouncements(ancmnt);
                return res.status(200).json(ancmnt);
            } catch (err) {
                // console.log(error);
                this.log.levels('dcvnpslog', this.logLevel.ERROR);
                this.log.error({ id: req.id, err: err }, 'Error updating announcement');
                return res.status(500).json(err.message);
            }
        });

        this.announcementRouter.delete('/:announceId', async (req, res) => {
            const announceId = req.params.announceId || null;
            console.log(`delete announcement with id ${announceId}`);
            try {
                if (announceId) {
                    const result = await this.announcementDataService.deleteAnnouncements(announceId);
                    return res.status(200).json(`${result} row(s) deleted.`);
                } else {
                    return res.status(500).json('announceId is required to delete an announcement');
                }
            } catch (err) {
                this.log.levels('dcvnpslog', this.logLevel.ERROR);
                this.log.error({ id: req.id, err: err }, 'Error deleting announcement');
                return res.status(500).json(err.message);
            }
        });
    }
}

export default new AnnouncementRouter().announcementRouter;
