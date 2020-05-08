import * as express from 'express';
import { Config } from '../../config';
import { VnpsClassesDataService } from '../../dataaccess/vnpsclasses.service';

class VnpsClassesRouter {
    public classesRouter = express.Router();
    private config: Config = new Config();
    private log: any;
    private logLevel: any;
    private uuidv4: any;
    private vnpsClassesDataService: VnpsClassesDataService;

    constructor() {
        this.vnpsClassesDataService = new VnpsClassesDataService();
        this.log = this.config.logger;
        this.logLevel = this.config.logLevel;
        this.uuidv4 = this.config.uuidv4;
        this.classesRouter = express.Router();
        this.configVnpsClassesRoute();
    }

    private configVnpsClassesRoute() {
        this.classesRouter.get('/bylevel/:classlevel?', (req, res) => {
            const classlevel = req.params.classlevel || null;
            // console.log(`classs level: ${classlevel? classlevel: 'NULL'}`);
            return this.vnpsClassesDataService.readClassesByLevel(classlevel)
                .then(data => {
                    return res.status(200).json(data);
                })
                .catch(err => {
                    this.log.levels('dcvnpslog', this.logLevel.ERROR);
                    this.log.error({id: req.id, err: err}, `Error getting class of level ${classlevel}`);
                       return res.status(500).json(err.message);
                });
        });

        this.classesRouter.get('/byid/:classid?', (req, res) => {
            const classid = req.params.classid || null;
            // console.log(`classs level ${classid? classid: 'NULL'}`);
            return this.vnpsClassesDataService.readClassesById(classid)
                .then(data => {
                    return res.status(200).json(data);
                })
                .catch(err => {
                    this.log.levels('dcvnpslog', this.logLevel.ERROR);
                    this.log.error({id: req.id, err: err}, `Error getting class with id ${classid}`);
                       return res.status(500).json(err.message);
                });
        });

        this.classesRouter.get('/:classId?', (req, res) => {
            const classId = req.params.classId || null;
            // console.log(`classs level ${classId? classId: 'NULL'}`);
            return this.vnpsClassesDataService.readVnpsClasses(classId)
                .then(data => {
                    return res.status(200).json(data);
                })
                .catch(err => {
                    this.log.levels('dcvnpslog', this.logLevel.ERROR);
                    this.log.error({ id: req.id, err: err }, 'Error getting class level');
                    return res.status(500).json(err.message);
                });
        });

        this.classesRouter.post('/', async (req, res) => {
            try {
                // const ancmntuuid = uuidv4();photoclass
                const vnpsclass = req.body;
                if (!vnpsclass.classId) {
                    vnpsclass.classId = this.uuidv4();
                }
                vnpsclass.postedUserId = req.auth.userid;
                vnpsclass.postedDate = new Date();
                vnpsclass.updatedUserId = req.auth.userid;
                vnpsclass.updatedDate = new Date();
                const result = await this.vnpsClassesDataService.createVnpsClasses(vnpsclass);
                return res.status(200).json(result);
            } catch (err) {
                // console.log(error);
                this.log.levels('dcvnpslog', this.logLevel.ERROR);
                this.log.error({id: req.id, err: err}, 'Error creating vnpsclass');
               return res.status(500).json(err.message);
            }
        });

        this.classesRouter.put('/', async (req, res) => {
            try {
                const vnpsclass = req.body;
                vnpsclass.updatedUserId = req.auth.userid;
                vnpsclass.updatedDate = new Date();
                // console.log(photoclass);
                const result = await this.vnpsClassesDataService.updateVnpsClasses(vnpsclass);
                return res.status(200).json(vnpsclass);
            } catch (err) {
                // console.log(error);
                this.log.levels('dcvnpslog', this.logLevel.ERROR);
                this.log.error({ id: req.id, err: err }, 'Error updating announcement');
                return res.status(500).json(err.message);
            }
        });

        this.classesRouter.delete('/:classid', async (req, res) => {
            const classid = req.params.classid || null;
            console.log(`delete vnpsclass with id ${classid}`);
            try {
                if (classid) {
                    const result = await this.vnpsClassesDataService.deleteVnpsClasses(classid);
                    return res.status(200).json(`${result} row(s) deleted.`);
                } else {
                    return res.status(500).json('classid is not null');
                }
            } catch (err) {
                this.log.levels('dcvnpslog', this.logLevel.ERROR);
                this.log.error({ id: req.id, err: err }, 'Error deleting announcement');
                return res.status(500).json(err.message);
            }
        });
        }

}
export default new VnpsClassesRouter().classesRouter;
