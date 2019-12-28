const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkJwt = require('express-jwt');
const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
const serverRoot = path.normalize(__dirname);

function isAdmin(req) {
    const auth = req.auth;
    if (auth.userrole !== "SITEADM") {
       return false;
    }
    return true;
}

function apiRouter(express, database, logger) {
    const galleryBaseDir = path.join(serverRoot, "galleries");
    const router = express.Router();
    const {log, logResponse, logLevel} = logger;

    log.levels('dcvnpslog',logLevel.ERROR);
    // This code is good for application that require login from begining.
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
        this.log.levels('dcvnpslog',logLevel.ERROR);
        this.log.error('Error');
        if (err.name === 'UnauthorizedError') {
            return res.status(401).json({ error: err.message });
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

    router.get('/uuid', (req, res) => {
        database.uuid().then(data => { return res.json(data) })
            .catch(err => { 
                log.levels('dcvnpslog',logLevel.ERROR)
                log.error({id: req.id, err: err},'Error getting uuid');
                return res.status(500).json({ error: err.message }); 
            });
    });

    // router.get('/contacts', (req, res) => {
    //     database.getContacts()
    //         .then((contacts) => { return res.json(contacts); })
    //         .catch((err) => { return res.status(500).json({ error: err.message }); });
    // });

    // router.post('/contacts', (req, res) => {
    //     const contact = req.body;
    //     database.insertContacts(contact)
    //         .then((row) => { return res.status(200).json(row); })
    //         .catch((error) => { return res.status(500).json({ error: 'Error Inserting new record.' }); });
    // });

    // router.put('/contacts', (req, res) => {
    //     const _contact = req.body;
    //     if (_contact) {
    //         _contact.updatedDate = new Date();
    //         database.updateContact(_contact)
    //             .then(() => { return res.status(200).json('Update Contact success.'); })
    //             .catch((err) => { return res.status(500).json('Update Contact failed.'); });
    //     } else {
    //         return res.status(500).json('No contact to udpate.');
    //     }
    // });

    router.get('/galleries/:galleryId?', (req, res) => {
        const galleryId = req.params.galleryId || null;
        database.getGalleries(galleryId)
            .then((data) => {
                return res.json(data);
            })
            .catch((err) => {
                log.levels('dcvnpslog',logLevel.ERROR)
                log.error({id: req.id, err: err},`Error getting gallery ${galleryId}`);
                return res.status(500);
            });
    });

    // Method to insert a gallery into galleries
    router.post('/galleries', (req, res) => {
        const gallery = req.body;
        if (gallery) {
            gallery.createdDate = new Date();
            gallery.updatedDate = new Date();
            database.insertGallery({ gallery })
                .then(() => { return res.status(200).json('Gallery inserted'); })
                .catch((err) => { 
                    log.levels('dcvnpslog',logLevel.ERROR)
                    log.error({id: req.id, err: err},'Error inserting Galleries');
                    return res.status(500).json('Geller insert failed.'); 
                });
        } else {
            return res.status(500).json('No gallery to insert.');
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
            database.insertGalleryPhoto(gUuid, galleryId, fileName, JSON.parse(portrait), author, upldYear, updateUser, createdDate, updatedDate)
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

    // Get photo of a gallery by a galleryId
    router.get('/galleryphotosbyid/:galleryId', (req, res) => {
        const galleryId = req.params.galleryId;
        // log.info({id:req.id, galleryId: galleryId},'request');
         database.getPhotoByGalleryId(galleryId)
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
    router.get('/galleryphotosbyname/:gallery/:year?/:author?', (req, res) => {
        const gallery = req.params.gallery;
        const year = req.params.year || null;
        const author = req.params.author || null;
        // log.info({id:req.id, gallery: gallery, year:year, author:author},'request');
        database.getPhotoByGalleryName(gallery, year, author)
            .then((data) => {
                return res.json(data);
            })
            .catch((err) => {
                log.levels('dcvnpslog',logLevel.ERROR);
                log.error({id:req.id, err: err},'Error get gallery photos by name');
                return res.status(500).json({ error: err.message });
            })

    });

    router.post('/authenticate', (req, res) => {
        const user = req.body;
        // console.log(user);
        database.authenticate({ username: user.username, password: user.password })
            .then((result) => {
                if (result.success) {
                    const roleCode = result.authuser.roleCode;
                    const admRole = roleCode.match(/ADM$/g);
                    const payload = {
                        userid: result.authuser.userId,
                        username: result.authuser.userName,
                        userrole: result.authuser.roleCode,
                        admin: `${(!admRole) ? false : admRole[0] === "ADM"}`
                    };

                    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
                    // const token = jwt.sign(payload, process.env.JWT_SECRET);
                    // console.log(token);
                    return res.json({
                        message: 'successfully authenticated',
                        token: token,
                        role: result.authuser.roleCode
                    });
                } else {
                    return res.status(result.status).json({error:result.authmsg});
                }
            })
            .catch((err) => { 
                log.levels('dcvnpslog',logLevel.ERROR)
                log.error({id: req.id, err: err},'Error authenticate');
               return res.status(err.status).json({ error: err.message }); 
            })
    });

    router.get('/boardmembers', (req, res) => {
        fs.readFile(`${serverRoot}/data/director-board.json`, (err, data) => {
            if (err) {
                // console.log(err);
                log.levels('dcvnpslog',logLevel.ERROR)
                log.error({id: req.id, err: err},'Error getting board memebers');
                return res.status(500).json(err);
            }
            const boardMembers = JSON.parse(data);
            // console.log(boardMembers);
            return res.status(200).json(boardMembers);
        });
    });

    router.get('/programs', (req, res) => {
        let programData = [];
        try {
            let rawData = fs.readFileSync(path.join(serverRoot, '/data/level1.json'));
            programData.push(JSON.parse(rawData));
            rawData = fs.readFileSync(path.join(serverRoot, '/data/level2.json'));
            programData.push(JSON.parse(rawData));
            rawData = fs.readFileSync(path.join(serverRoot, '/data/level3.json'));
            programData.push(JSON.parse(rawData));
            return res.status(200).json(programData);
            // console.log(programData);
        } catch (err) {
            log.levels('dcvnpslog',logLevel.ERROR)
            log.error({id: req.id, err: err},'Error getting program');
           res.status(500).json(err);
        }
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
            database.deletePhoto(photoId)
                .then(resp => {
                    console.log(resp); gallery
                    return res.status(200).json(`Photo ${imgsrc} has been deleted.`);
                })
                .catch(exp => {
                    throw exp;
                });
        }
        catch (error) {
            // console.log(error);
            // console.log(`Resote file ${filePath}`);
            // Failure to remove photo entry in database, restore file.
            log.levels('dcvnpslog',logLevel.ERROR)
            log.error({id: req.id, err: err},'Error deleting photo');
            fs.writeFileSync(filePath, file);
            return res.status(500).json(`Error verifying delete file ${imgsrc} ---- ${error.message}`);
        }
    });

    router.get('/announcements/:announceId?', (req, res) => {
        // console.log(req.auth);
        const announceId = req.params.announceId || null;
        return database.readAnnouncements(announceId)
            .then(data => {
                const jData = JSON.parse(data);
                return res.status(200).send(jData);
            })
            .catch(err => {
                log.levels('dcvnpslog',logLevel.ERROR)
                log.error({id: req.id, err: err},'Error getting announcements');
                   return res.status(500).json(err.message);
            })
    });

    router.post('/announcements', async (req, res) => {
        try {
            // const ancmntuuid = uuidv4();
            let ancmnt = req.body;
            ancmnt.announcementId = uuidv4();
            ancmnt.postedUserId = req.auth.userid;
            ancmnt.postedDate = new Date();
            ancmnt.updatedUserId = req.auth.userid;
            ancmnt.updatedDate = new Date();
            const result = await database.createAnnouncements(ancmnt);
            const jData = JSON.parse(result);
            // console.log(jData);
            return res.status(200).json(jData[0]);
        }
        catch (error) {
            // console.log(error);
            log.levels('dcvnpslog',logLevel.ERROR)
            log.error({id: req.id, err: err},'Error creating announcement');
           return res.status(500).json(error.message);
        }
    });

    router.put('/announcements', async (req, res) => {
        try {
            const ancmnt = req.body;
            ancmnt.updatedUserId = req.auth.userid;
            ancmnt.updatedDate = new Date();
            // console.log(ancmnt);
            const result = await database.updateAnnouncements(ancmnt);
            return res.status(200).json(ancmnt);
        }
        catch (error) {
            // console.log(error);
            log.levels('dcvnpslog',logLevel.ERROR)
            log.error({id: req.id, err: err},'Error updating announcement');
           return res.status(500).json(error.message);
        }
    });

    router.delete('/announcements/:announceId', async (req, res) => {
        const announceId = req.params.announceId || null;
        console.log(`delete announcement with id ${announceId}`);
        try {
            if (announceId) {
                const result = await database.deleteAnnouncements(announceId);
                return res.status(200).json(`${result} row(s) deleted.`);
            } else {
                return res.status(500).json('announceId is not null');
            }
        }
        catch (err) {
            log.levels('dcvnpslog',logLevel.ERROR)
            log.error({id: req.id, err: err},'Error deleting announcement');
            return res.status(500).json(err.message);
        }
    });
    router.get('/photoclassmenu', (req, res) =>{
        // console.log('calling getPhotoClassMenu');
        return database.getPhotoClassMenu()
        .then( data =>{
            // console.log({'classMenu': data});
            return res.status(200).json(data);
        })
        .catch(err =>{
            log.levels('dcvnpslog',logLevel.ERROR)
            log.error({id: req.id, err: err},'Error deleting announcement');
            return res.status(500).json(err.message);
        }) ;
    });
    router.get('/classes/bylevel/:classlevel?', (req, res) => {
        const classlevel = req.params.classlevel || null;
        console.log(`classs level ${classlevel? classlevel: 'NULL'}`);
        return database.readClassesByLevel(classlevel)
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                log.levels('dcvnpslog',logLevel.ERROR)
                log.error({id: req.id, err: err},`Error getting class of level ${classlevel}`);
                   return res.status(500).json(err.message);
            })
    });

    router.get('/classes/byid/:classid?', (req, res) => {
        const classid = req.params.classid || null;
        // console.log(`classs level ${classid? classid: 'NULL'}`);
        return database.readClassesById(classid)
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                log.levels('dcvnpslog',logLevel.ERROR)
                log.error({id: req.id, err: err},`Error getting class with id ${classid}`);
                   return res.status(500).json(err.message);
            })
    });

    router.post('/classes', async (req, res) => {
        try {
            // const ancmntuuid = uuidv4();photoclass
            let photoclass = req.body;
            if(!photoclass.photoClassId){
                photoclass.photoClassId = uuidv4();
            }
            photoclass.postedUserId = req.auth.userid;
            photoclass.postedDate = new Date();
            photoclass.updatedUserId = req.auth.userid;
            photoclass.updatedDate = new Date();
            const result = await database.createPhotoClasses(photoclass);
            const jData = JSON.parse(result);
            // console.log(jData);
            return res.status(200).json(jData[0]);
        }
        catch (error) {
            // console.log(error);
            log.levels('dcvnpslog',logLevel.ERROR)
            log.error({id: req.id, err: err},'Error creating announcement');
           return res.status(500).json(error.message);
        }
    });

    router.put('/classes', async (req, res) => {
        try {
            const photoclass = req.body;
            photoclass.updatedUserId = req.auth.userid;
            photoclass.updatedDate = new Date();
            // console.log(photoclass);
            const result = await database.updatePhotoClasses(photoclass);
            return res.status(200).json(photoclass);
        }
        catch (err) {
            // console.log(error);
            log.levels('dcvnpslog',logLevel.ERROR)
            log.error({id: req.id, err: err},'Error updating announcement');
           return res.status(500).json(error.message);
        }
    });

    router.delete('/classes/byid/:classid', async (req, res) => {
        const classid = req.params.classid || null;
        console.log(`delete announcement with id ${announceId}`);
        try {
            if (classid) {
                const result = await database.deleteClassesById(classid);
                return res.status(200).json(`${result} row(s) deleted.`);
            } else {
                return res.status(500).json('classid is not null');
            }
        }
        catch (err) {
            log.levels('dcvnpslog',logLevel.ERROR)
            log.error({id: req.id, err: err},'Error deleting announcement');
            return res.status(500).json(err.message);
        }
    });

    router.delete('/classes/bylevel/:classlevel', async (req, res) => {
        const classlevel = req.params.classlevel || null;
        console.log(`delete announcement with id ${classlevel}`);
        try {
            if (classid) {
                const result = await database.deleteClassesByLevel(classlevel);
                return res.status(200).json(`${result} row(s) deleted.`);
            } else {
                return res.status(500).json('classid is not null');
            }
        }
        catch (err) {
            log.levels('dcvnpslog',logLevel.ERROR)
            log.error({id: req.id, err: err},'Error deleting announcement');
            return res.status(500).json(err.message);
        }
    });

    router.get('/roles', (req, res) => {
        return database.getRoles()
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
             log.levels('dcvnpslog',logLevel.ERROR)
            log.error({id: req.id, err: err},'Error getting roles');
            return res.status(500).json(err.message);
            });
    });

    router.post('/users', async (req, res) => {
        // const auth = req.auth;
        // console.log(auth);
        // if (auth.userrole !== "SITEADM") {
        //     return res.status(401).json(`user ${auth.username} is not authorized to create new application user`);
        // }
        if(!isAdmin(req)){
            return res.status(401).json(`user ${auth.username} is not authorized to create new application user`);
        }
        const user = req.body;
        // console.log(user);
        try {
            // const userid = await database.uuid();
            user.userId = uuidv4();
            user.password = `${bcrypt.hashSync(user.password, 10)}`
            user.createdUserId = auth.userid;
            user.createdDate = new Date();
            user.updatedUserId = auth.userid;
            user.updatedDate = new Date();
            console.log(user);
            const result = await database.createUser(user);
            return res.status(200).json(result);
        } catch (err) {
            log.levels('dcvnpslog',logLevel.ERROR)
            log.error({id: req.id, err: err},'Error creating user');
           return res.status(500).json(err.message);
        }
    });

    router.get('/users/:userId?', (req, res) => {
        console.log('get users', req.auth);
        if(!isAdmin(req)){
            return res.status(401).json(`user ${req.auth.username} is not authorized to create new application user`);
        }

    });

    //  Need to use Async to make sure the authentication and change password is  completed.
    router.post('/changepassword', async (req, res) => {
        const {userName,oldPassword, newPassword} = req.body;
        const encryptedNewPassword = `${bcrypt.hashSync(newPassword, 10)}`;
        // console.log(`username: ${userName}, oldPassword: ${oldPassword}, newPassword: ${encryptedNewPassword}`);
        try{
            const chgPwdResult = await database.changePassword(userName, oldPassword, encryptedNewPassword);
            // console.log(chgPwdResult);
            return res.status(200).json(chgPwdResult);
        } catch( err ){
            // console.log(err);
            log.levels('dcvnpslog',logLevel.ERROR)
            log.error({id: req.id, err: err},'Error changin user password');
            return res.status(500).json(err);
        }
    });

    router.post('/paypaltransactioncomplete', async (req, res) =>{
        let orderItems = [];
        let payments = [];
        const paypalTran = req.body;
        const payer = {
            payerId: paypalTran.payer.payer_id,
            emailAddress: paypalTran.payer.email_address,
            surname: paypalTran.payer.name.surname,
            givenName: paypalTran.payer.name.given_name,
            countryCode: paypalTran.payer.address.country_code,
            createdDate: new Date(paypalTran.create_time),
            updatedUserId: req.auth.userid,
            updatedDate: new Date(paypalTran.update_time)
        }
        const order = {
            orderId: paypalTran.id,
            payerId: paypalTran.payer.payer_id,
            createdDate: new Date(paypalTran.create_time),
            updatedUserId: req.auth.userid,
            updatedDate: new Date(paypalTran.update_time)
        }
        // setting up payees ,payments
        paypalTran.purchase_units.forEach(purchase => {
            // payees setup
            let orderItem = {
                orderItemId: uuidv4(),
                orderId: paypalTran.id,
                amount: purchase.amount.value,
                currencyCode: purchase.amount.currency_code,
                description: purchase.description,
                merchantId: purchase.payee.merchant_id,
                merchantEmailAddress: purchase.payee.email_address,
                createdDate: new Date(paypalTran.create_time),
                updatedUserId: req.auth.userid,
                updatedDate: new Date(paypalTran.update_time)
            }
            orderItems.push(orderItem);
            // payments setup
            purchase.payments.captures.forEach( capture => {
                let payment = {
                    paymentId: capture.id,
                    orderId: paypalTran.id,
                    amount: capture.amount.value,
                    currencyCode: capture.amount.currency_code,
                    paymentStatus: capture.status,
                    createdDate: new Date(paypalTran.create_time),
                    updatedUserId: req.auth.userid,
                    updatedDate: new Date(paypalTran.update_time)
                        }
                payments.push(payment);
            });
        });
        // console.log({"payer": payer,  "order": order, "orderItems": orderItems,"payments":payments});
        // call  database to save transaction data.
        try{
            const result = await database.processPayPal({"payer": payer,  "order": order, "orderItems": orderItems,"payments":payments});
            return res.status(200).json(result);    
        }
        catch(err){
            log.levels('dcvnpslog',logLevel.ERROR)
            log.error({id: req.id, err: err},'Error insert payal data');
            return res.status(500).send(err);
        };
    });

    router.get('/states', (req, res) =>{
        return database.getStates()
        .then( (data) =>{
            // console.log(JSON.parse(data));
            return res.status(200).send(JSON.parse(data));
        })
        .catch( err =>{
            log.levels('dcvnpslog',logLevel.ERROR)
            log.error({id: req.id, err: err},'Error get states list');
            return res.status(500).send(err.message);
        });
    });
    return router;
}

module.exports =  apiRouter;
