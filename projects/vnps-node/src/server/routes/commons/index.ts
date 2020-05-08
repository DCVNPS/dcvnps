import * as express from 'express';
import { Config } from '../../config';
import { CommonDataService } from '../../dataaccess/common.service';

class CommonRouter {
    public commonRouter = express.Router();
    private config: Config = new Config();
    private log: any;
    private logLevel: any;
    private commonDataService: CommonDataService;

    constructor() {
        this.commonDataService = new CommonDataService();
        this.log = this.config.logger;
        this.logLevel = this.config.logLevel;
        this.commonRouter = express.Router();
        this.configCommonRoute();
    }

    private configCommonRoute() {
        this.commonRouter.get('/', (req, res) => {
              res.json({
                message: 'Hello World! from common service.'
              });
            });

        this.commonRouter.get('/uuid', (req, res) => {
            this.commonDataService.uuid().then(data => {
                return res.status(200).json(data);
            })
                .catch(err => {
                    this.log.levels('dcvnpslog', this.config.logLevel.ERROR);
                    this.log.error({ id: req.id, err: err }, 'Error getting uuid');
                    return res.status(500).json({ error: err.message });
                });
        });
        this.commonRouter.get('/roles', (req, res) => {
            return this.commonDataService.getRoles()
                .then(data => {
                    return res.status(200).json(data);
                })
                .catch(err => {
                 this.log.levels('dcvnpslog', this.logLevel.ERROR);
                this.log.error({id: req.id, err: err}, 'Error getting roles');
                return res.status(500).json(err.message);
                });
        });
        this.commonRouter.get('/states', (req, res) => {
            this.commonDataService.getStates()
            .then( data => {
                // console.log(data);
                return res.status(200).json(data);
            })
            .catch(err => {
                this.log.levels('dcvnpslog', this.config.logLevel.ERROR);
                this.log.error({ id: req.id, err: err }, 'Error getting uuid');
                return res.status(500).json({ error: err.message });
            });
        });
        this.commonRouter.get('/vnpsclassmenu', (req, res) => {
            // console.log('calling getPhotoClassMenu');
            return this.commonDataService.getVnpsClassMenu()
            .then( data => {
                // console.log({'classMenu': data});
                return res.status(200).json(data);
            })
            .catch(err => {
                this.log.levels('dcvnpslog', this.logLevel.ERROR);
                this.log.error({id: req.id, err: err}, 'Error deleting announcement');
                return res.status(500).json(err.message);
            })        ;
        });
        this.commonRouter.get('/galleries/:galleryId?', (req, res) => {
            const galleryId = req.params.galleryId || null;
            this.commonDataService.readGalleries(galleryId, 'Y')
                .then((data) => {
                    // console.log(data);
                    return res.status(200).json(data);
                })
                .catch((err) => {
                    this.log.levels('dcvnpslog', this.logLevel.ERROR);
                    this.log.error({ id: req.id, err: err }, `Error getting gallery ${galleryId}`);
                    return res.status(500).json(err.message);
                });
        });
        this.commonRouter.get('/adminlevel/:level?', (req, res) => {
            const level = req.params.level || null;
            return this.commonDataService.getAdminLevel(level)
                .then(data => {
                    return res.json(data);
                })
                .catch(err => {
                    this.log.levels('dcvnpslog', this.logLevel.ERROR);
                    this.log.error({ id: req.id, err: err }, 'Error Selecting AdminLevel');
                    return res.status(500).json(err.message);
                });
        });
    }
}
export default new CommonRouter().commonRouter;
