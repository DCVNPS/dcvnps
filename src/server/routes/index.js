const checkJwt = require('express-jwt');
const userRouter = require('./admin/user')
const commonRouter = require('./commons');
const ancmntRouter = require('./announcements');

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

    const log = config.logger;
    const router = express.Router();

    // User expresss json web token check express-jwt to guard the angular routes
    router.use(
        checkJwt({ secret: process.env.JWT_SECRET, requestProperty: 'auth' })
        //     .unless({
        //         path:
        //             [
        //                 '/api/authenticate',
        //                 '/api/boardmembers',
        //                 '/api/programs',
        //                 { url: /^\/api\/galleries.*/i, methods: ['GET'] },
        //                 { url: /^\/api\/galleryphotosbyid\/.*/i, methods: ['GET'] },
        //                 { url: /^\/api\/galleryphotosbyname\/.*/i, methods: ['GET'] }
        //             ]
        //     })
    );

    router.use((err, req, res, next) => {
        this.log = log.child({src:true, id: req.id, err:err},true);
        this.log.levels('dcvnpslog',config.logLevel.ERROR);
        this.log.error('Error');
        if (err.name === 'UnauthorizedError') {
            return res.status(err.status).json({ error: err });
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
    router.use('/commons', commonRouter(express, config));
    router.use('/announcements', ancmntRouter(express, config));
    // url:/api/
    return router;
}