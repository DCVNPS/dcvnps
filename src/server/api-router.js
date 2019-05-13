const express = require('express');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const checkJwt = require('express-jwt');

function apiRouter(database) {

    const router = express.Router();

    // This code is good for application that require login from begining.
    //     router.use(
    //         checkJwt({secret:process.env.JWT_SECRET})
    //         .unless( {path:
    //             [
    //                 '/api/authenticate',
    //                 '/api/galleries',
    //                 '/api/galleryphotos'
    //             ]
    //         })
    //     );

    router.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            return res.status(401).send({ error: err.message });
        }
    })

    router.get('/contacts', checkJwt({ secret: process.env.JWT_SECRET }), (req, res) => {
        database.getContacts()
            .then((contacts) => { return res.json(contacts); })
            .catch((err) => { return res.status(500).json({ error: err.message }); });
    });

    router.post('/contacts', checkJwt({ secret: process.env.JWT_SECRET }), (req, res) => {
        const contact = req.body;
        database.insertContacts(contact)
            .then((row) => { return res.status(200).json(row); })
            .catch((error) => { return res.status(500).json({ error: 'Error Inserting new record.' }); });
    });

    router.put('/contacts', checkJwt({ secret: process.env.JWT_SECRET }), (req, res) => {
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

    router.post('/galleries', checkJwt({ secret: process.env.JWT_SECRET }), (req, res) => {
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

    router.post('/upload/:gallery', (req, res) => {
        const gallery = req.params['gallery'];
        console.log(req.body);
        if (req.files) {
            const files = req.files;
            console.log(files);
        }
        return res.status(200).json('Upload reach server.');
    });

    router.get('/galleries', (req, res) => {
        database.getGalleries()
            .then((data) => {
                return res.json(data);
            })
            .catch((err) => { return res.status(500).json({ error: err.message }); })
    });

    router.get('/galleryphotosbyid/:galleryId', (req, res) => {

        database.getPhotoByGalleryId(galleryId)
            .then((data) => {
                return res.json(data);
            })
            .catch((err) => {
                return res.status(500).json({ error: err.message });
            })
    });

    router.get('/galleryphotosbyname/:gallery', async (req, res) => {

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
        database.authenticate({ userName: user.username, password: user.password })
            .then((result) => {
                if (result.success) {
                    const roleCode = result.authuser.roleCode;
                    const admRole = roleCode.match(/ADM$/g);
                    const payload = {
                        userid: result.authuser.userId,
                        username: result.authuser.userName,
                        admin: `${admRole[0] === "ADM"}`
                    };

                    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

                    return res.json({
                        message: 'successfully authenticated',
                        token: token
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