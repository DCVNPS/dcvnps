const uuidv4 = require('uuid/v4');
const checkJwt = require('express-jwt');
const userRouter = require('./admin/user');
const boardRouter = require('./admin/boardmembers');
const commonRouter = require('./commons');
const ancmntRouter = require('./announcements');
const vnpsClassesRouter = require('./vnpsclasses');
const gallriesRouter = require('./galleries');
const userClassRouter = require('./admin/userclass');
const galleryPhotosRouter = require('./galleryphotos');

function isAdmin(req) {
    const auth = req.auth;
    if (auth.userrole !== "SITEADM") {
       return false;
    }
    return true;
}

module.exports = (express, config) => {
    if(!express){
        throw new Error('Route Handler missing express object');
    }
    if(!config){
        throw new Error('Route Handler missing config object');
    }
    config.uuidv4 = uuidv4;
    const log = config.logger;
    const router = express.Router();

    // User expresss json web token check express-jwt to guard the angular routes
    router.use(
        checkJwt({ secret: process.env.JWT_SECRET, requestProperty: 'auth' })
    );

    router.use((err, req, res, next) => {
        this.log = log.child({src:true, id: req.id, err:err},true);
        this.log.levels('dcvnpslog',config.logLevel.ERROR);
        this.log.error('Error');
        if (err.name === 'UnauthorizedError') {
            return res.status(500).json(err.message);
        }
    });

    // router.use((req, res, next) => {
    //     this.log = log.child({
    //         id: req.id,
    //         body: req.body
    //     }, true);
    //     this.log.debug({src: true, req: req},'request');
    //     next();
    // });

    // router.use((req, res, next) => {
    //     logResponse(req.id,res);
    //     next();
    // });
   
    router.use('/admin/user', userRouter(express, config));
    router.use('/admin/boardmembers', boardRouter(express, config));
    router.use('/commons', commonRouter(express, config));
    router.use('/announcements', ancmntRouter(express, config));
    router.use('/vnpsclasses',vnpsClassesRouter(express, config));
    router.use('/galleries', gallriesRouter(express, config));
    router.use('/admin/userclass',userClassRouter(express, config));
    router.use('/galleryphotos', galleryPhotosRouter(express, config));
    // url:/api/
    return router;
}