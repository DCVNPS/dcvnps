const express = require('express');
const jwt = require('jsonwebtoken');
const checkJwt = require('express-jwt');
const fs = require('fs');
const path = require('path');
const serverRoot = path.normalize(__dirname);


function apiRouter(database) {
    const galleryBaseDir = path.join(serverRoot,"galleries");
    const router = express.Router();
    // This code is good for application that require login from begining.
    router.use(
        checkJwt({ secret: process.env.JWT_SECRET, requestProperty: 'auth' })
            .unless({
                path:
                    [
                        '/api/authenticate',
                        {url: /^\/api\/galleries.*/i, methods:['GET'] },
                        { url: /^\/api\/galleryphotosbyid\/.*/i, methods: ['GET'] },
                        { url: /^\/api\/galleryphotosbyname\/.*/i, methods: ['GET'] }
                    ]
            })
    );

    router.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            return res.status(401).send({ error: err.message });
        }
    })

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
            .catch((err) => { return res.status(500).json({ error: err.message }); })
    });

    router.post('/galleries', (req, res) => {
        const _gallery = req.body;
        if (_gallery) {
            _gallery.createdDate = new Date();
            _gallery.updatedDate = new Date();
            database.insertGallery({ _gallery })
                .then(() => { return res.status(200).json('Gallery inserted'); })
                .catch((err) => { return res.status(500).json('Geller insert failed.'); });
        } else {
            return res.status(500).json('No gallery to insert.');
        }
    });

    router.post('/upload/:gallery/:year', (req, res) => {
        const upldGallery = req.params['gallery'];
        const upldYear = req.params['year'];
        const { galleryId, fileName, author, size, portrait } = req.body;
        if (!req.files) {
            return res.status(400).send('No file uploaded');
        }
        console.log({ "galleryId": galleryId, "gallery": upldGallery, "year": upldYear, "portrait": portrait, "author": author, "fileName": fileName });
        const file = req.files.file;
        const updateUser='Temporary';
        const createdDate = new Date();
        const updatedDate = new Date();
        // const fileName = file.name.split('_')[1];
        const destFile = path.join( galleryBaseDir,`${upldGallery}/${upldYear}/${fileName}`);
        console.log(req.auth);
        file.mv(destFile, err => {
            if (err) {
                console.log('photoupload-Move file', err.message)
                return res.status(500).send(`Failed Upload Image ${file.name} --\n ${err.message}`);
            }
            // insertGalleryPhoto(galleryId, photo, portrait, author, year, updateUser, createdDate, updatedDate)
            database.insertGalleryPhoto(galleryId, fileName, JSON.parse(portrait), author, upldYear, updateUser, createdDate, updatedDate)
            .then( result => {
                console.log(result);
                return res.status(200).json('Upload reach server.');
            })
            .catch( err => {
                console.log('insert gallery error ',err);
                return res.status(err.status).json(err.message);
            });
        });
    });

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

    router.get('/galleryphotosbyname/:gallery', (req, res) => {

        const gallery = req.params.gallery;
        database.getPhotoByGalleryName(gallery)
            .then((data) => {
                return res.json(data);
            })
            .catch((err) => {
                return res.status(500).json({ error: err.message });
            })

    });

    router.post('/authenticate', (req, res) => {
        const user = req.body;
        // console.log(user);
        if (user.username === 'default') {
            user.username = 'vnpsuser';
            user.password = null;
        }
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

    return router;
}

module.exports = apiRouter;