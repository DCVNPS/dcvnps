const VnpsClassesService = require('../../dataAccess/vnpsClassesService');
module.exports = (express, config) => {
    if (!config) {
        throw new Error('admin user missing config object');
    }
    const vnpsClassesService = VnpsClassesService(config);
    // const bcrypt = config.bcrypt;
    const log = config.logger;
    const logLevel = config.logLevel;
    const uuidv4 = config.uuidv4;
    const router = express.Router();
    router.get('/:classId?', (req, res) => {
        const classId = req.params.classId || null;
        // console.log(`classs level ${classId? classId: 'NULL'}`);
        return vnpsClassesService.readVnpsClasses(classId)
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                log.levels('dcvnpslog', logLevel.ERROR)
                log.error({ id: req.id, err: err }, 'Error getting class level');
                return res.status(500).json(err.message);
            })
    });

    router.post('/', async (req, res) => {
        try {
            // const ancmntuuid = uuidv4();photoclass
            let vnpsclass = req.body;
            if(!vnpsclass.classId){
                vnpsclass.classId = uuidv4();
            }
            vnpsclass.postedUserId = req.auth.userid;
            vnpsclass.postedDate = new Date();
            vnpsclass.updatedUserId = req.auth.userid;
            vnpsclass.updatedDate = new Date();
            const result = await vnpsClassesService.createVnpsClasses(vnpsclass);
            return res.status(200).json(result);
        }
        catch (err) {
            // console.log(error);
            log.levels('dcvnpslog',logLevel.ERROR)
            log.error({id: req.id, err: err},'Error creating vnpsclass');
           return res.status(500).json(err.message);
        }
    });

    router.put('/', async (req, res) => {
        try {
            const vnpsclass = req.body;
            vnpsclass.updatedUserId = req.auth.userid;
            vnpsclass.updatedDate = new Date();
            // console.log(photoclass);
            const result = await vnpsClassesService.updateVnpsClasses(vnpsclass);
            return res.status(200).json(vnpsclass);
        }
        catch (err) {
            // console.log(error);
            log.levels('dcvnpslog', logLevel.ERROR)
            log.error({ id: req.id, err: err }, 'Error updating announcement');
            return res.status(500).json(error.message);
        }
    });

    router.delete('/:classid', async (req, res) => {
        const classid = req.params.classid || null;
        console.log(`delete vnpsclass with id ${classid}`);
        try {
            if (classid) {
                const result = await vnpsClassesService.deleteVnpsClasses(classid);
                return res.status(200).json(`${result} row(s) deleted.`);
            } else {
                return res.status(500).json('classid is not null');
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