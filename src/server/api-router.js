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
        .then((contacts)=>{ return res.json(contacts);})
        .catch((err) => { return res.status(500).json({error: err.message});});
    });

    router.post('/contacts', checkJwt({ secret: process.env.JWT_SECRET }), (req, res) => {
        const contact = req.body;
        database.saveContacts(contact)
        .then((row)=>{ return res.status(200).json(row);})
        .catch((error) => { return res.status(500).json({error: 'Error Inserting new record.'});});
    });

    router.get('/galleries', (req, res) => {
        database.getGalleries()
            .then((data) => {
                return res.json(data);
            })
            .catch((err)=>{return res.status(500).json({error: err.message});})
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
                if (result.succes) {
                    const payload = {
                        userid: result.authuser.userId,
                        username: result.authuser.userName,
                        admin: result.authuser.roleCode
                    };

                    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

                    return res.json({
                        message: 'successfully authenticated',
                        token: token
                    })
                } else {
                    return res.status(result.status).json({error: result.authmessage});
                }
            })
    });
    return router;
}

module.exports = apiRouter;