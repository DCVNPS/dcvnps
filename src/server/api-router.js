const express = require('express');
const jwt = require('jsonwebtoken');
const checkJwt = require('express-jwt');
const fs = require('fs');
const path = require('path');
const serverRoot = path.normalize(__dirname);


function apiRouter(database) {
    const galleryBaseDir = path.join(serverRoot, "galleries");
    const router = express.Router();
    // This code is good for application that require login from begining.
    router.use(
        checkJwt({ secret: process.env.JWT_SECRET, requestProperty: 'auth' })
        // .unless({
        //     path:
        //         [
        //             '/api/authenticate',
        //             '/api/boardmembers',
        //             '/api/programs',
        //             { url: /^\/api\/galleries.*/i, methods: ['GET'] },
        //             { url: /^\/api\/galleryphotosbyid\/.*/i, methods: ['GET'] },
        //             { url: /^\/api\/galleryphotosbyname\/.*/i, methods: ['GET'] }
        //         ]
        // })
    );

    router.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            return res.status(401).send({ error: err.message });
        }
    })

    router.get('/uuid', (req, res) => {
        database.uuid().then(data => { return res.json(data) })
            .catch(err => { return res.status(500).json({ error: err.message }); });
    });

    router.get('/contacts', (req, res) => {
        database.getContacts()
            .then((contacts) => { return res.json(contacts); })
            .catch((err) => { return res.status(500).json({ error: err.message }); });
    });

    router.post('/contacts', (req, res) => {
        const contact = req.body;
        database.insertContacts(contact)
            .then((row) => { return res.status(200).json(row); })
            .catch((error) => { return res.status(500).json({ error: 'Error Inserting new record.' }); });
    });

    router.put('/contacts', (req, res) => {
        const _contact = req.body;
        if (_contact) {
            _contact.updatedDate = new Date();
            database.updateContact(_contact)
                .then(() => { return res.status(200).json('Update Contact success.'); })
                .catch((err) => { return res.status(500).json('Update Contact failed.'); });
        } else {
            return res.status(500).json('No contact to udpate.');
        }
    });

    router.get('/galleries/:galleryId?', (req, res) => {
        const galleryId = req.params.galleryId || null;
        database.getGalleries(galleryId)
            .then((data) => {
                return res.json(data);
            })
            .catch((err) => {
                console.log(err)
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
                .catch((err) => { return res.status(500).json('Geller insert failed.'); });
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
        const gUuid = await database.uuid();
        const destFileName = `${gUuid.uuid}_${fileName}`;
        const destFile = path.join(galleryBaseDir, `${upldGallery}/${upldYear}/${destFileName}`);
        // console.log(`${destFileName} -- ${fileName}`);
        file.mv(destFile, err => {
            if (err) {
                console.log('photoupload-Move file', err.message)
                return res.status(500).send(`Failed Upload Image ${file.name} --\n ${err.message}`);
            }
            database.insertGalleryPhoto(gUuid.uuid, galleryId, fileName, JSON.parse(portrait), author, upldYear, updateUser, createdDate, updatedDate)
                .then(result => {
                    console.log(result);
                    return res.status(200).json('Upload reach server.');
                })
                .catch(err => {
                    console.log(`insert gallery error: ${err}\nRemove file from server `);
                    fs.unlink(destFile);
                    return res.status(err.status).json(err.message);
                });
        });
    });

    // Get photo of a gallery by a galleryId
    router.get('/galleryphotosbyid/:galleryId', (req, res) => {
        const galleryId = req.params.galleryId;
        database.getPhotoByGalleryId(galleryId)
            .then((data) => {
                return res.json(data);
            })
            .catch((err) => {
                return res.status(500).json({ error: err.message });
            })
    });

    // GET photo of gallery by gallery name.
    // Called by: GalleryPhotosResolve, EditGalleryResolve
    router.get('/galleryphotosbyname/:gallery/:year?/:author?', (req, res) => {
        const gallery = req.params.gallery;
        const year = req.params.year || null;
        const author = req.params.author || null;
        database.getPhotoByGalleryName(gallery, year, author)
            .then((data) => {
                // console.log(data);
                return res.json(data);
            })
            .catch((err) => {
                return res.status(500).json({ error: err.message });
            })

    });

    router.post('/authenticate', (req, res) => {
        const user = req.body;
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

                    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

                    return res.json({
                        message: 'successfully authenticated',
                        token: token,
                        role: result.authuser.roleCode
                    });
                } else {
                    return res.status(result.status).json(result.authmsg);
                }
            })
            .catch((err) => { return res.status(err.status).json({ error: err.message }); })
    });

    router.get('/boardmembers', (req, res) => {
        fs.readFile(`${serverRoot}/data/director-board.json`, (err, data) => {
            if (err) {
                console.log(err);
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
            res.status(500).json(err);
        }
    })
    router.delete('/deletephoto', (req, res) => {
        console.log({ 'photoId': req.params.photoId });
        const { photoId, galleryId, gallery, imgalt, imgsrc, portrait, hidden } = req.body;
        // console.log({ photoId, galleryId, gallery, imgalt, imgsrc, portrait, hidden });
        const filePath = path.join(galleryBaseDir, imgsrc.replace('/galleries', ''));
        console.log(`read file ${filePath}`);
        // Save the file content in case delete from database fail
        // we can use that to restore the file. 
        const file = fs.readFileSync(filePath);
        try {
            fs.unlinkSync(filePath);
            console.log(`file ${filePath} removed.`);
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
            console.log(error);
            console.log(`Resote file ${filePath}`);
            fs.writeFileSync(filePath, file);
            return res.status(500).json(`Error verifying delete file ${imgsrc} ---- ${error.message}`);
        }
    });

    router.get('/announcements/:announceId?', (req, res) => {
        // console.log(req.auth);
        const announceId = req.params.announceId || null;
        database.readAnnouncements(announceId)
            .then(data => {
                const jData = JSON.parse(data);
                return res.status(200).send(jData);
            })
            .catch(err => {
                return res.status(500).json(err.message);
            })
    });
    router.post('/announcements', async (req, res) => {
        try {
            const ancmntuuid = await database.uuid();
            let ancmnt = req.body;
            ancmnt.announcementId = ancmntuuid.uuid;
            ancmnt.userId = req.auth.userid;
            ancmnt.postedDate = new Date();
            ancmnt.updatedDate = new Date();
            ancmnt = await database.createAnnouncement(ancmnt);

            res.status(200).json(ancmnt);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    });

    router.put('/announcements', async (req, res) => {
        try {
            const ancmnt = req.body;
            const ancmentuuid = await database.uuid();
            console.log(ancmentuuid);
            ancmnt.announcementId = ancmentuuid.uuid;
            ancmnt.userId = req.auth.userid;
            ancmnt.postedDate = new Date();
            ancmnt.updatedDate = new Date();
            console.log(ancmnt);
            res.status(200).json(ancmnt);
        }
        catch (error) {
            res.status(500).json(error.message);
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
        catch( error ){
            return res.status(500).json(error.message);
        }
    });
    return router;
}

module.exports = apiRouter;