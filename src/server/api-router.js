const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
        if(err.name === 'UnauthorizedError'){
            return res.status(401).send({error: err.message});
        }
    })

    router.get('/contacts', checkJwt({secret:process.env.JWT_SECRET}), (req, res) => {
        const contactsCollection = database.collection('contacts');
        contactsCollection.find({}).toArray((err, docs) => {
            return res.json(docs);
        });
    });

    router.post('/contacts', checkJwt({secret:process.env.JWT_SECRET}), (req, res) => {
        const user = req.body;

        contactCollection = database.collection('contacts');

        contactCollection.insertOne(user, (err, rslt) => {
            if (err) {
                return res.status(500).json({ error: 'Error inserting new record' });
            }
            const newRecord = rslt.ops[0];

            return res.status(200).json(newRecord);
        })
    });

    router.get('/galleries', (req, res) => {
        const contactsCollection = database.collection('galleries');
        contactsCollection.find({gallery:{$ne: 'home'}},
            {_id: 1, gallery: 1, year: 1, profilePhoto: 1, createdDate: 1, updatedDate: 1}).toArray((err, docs) => {
            return res.json(docs);
        });
    });

    router.get('/galleryphotosbyid/:galleryId?/:year?', (req, res) => {
        const contactsCollection = database.collection('galleryphotos');
        const criteria = { };
        if (req.params.galleryId){
            criteria.galleryId = req.params.galleryId;
        }
        if(req.params.year){
            criteria.year = req.params.year;
        }
        contactsCollection.find(
            criteria,
            {galleryId: 1, gallery: 1, year: 1, photo: 1, portrait: 1 }).toArray((err, docs) => {
            return res.json(docs);
        });    
    });

    router.get('/galleryphotosbyname/:gallery?/:year?', async (req, res) => {
        const galleryCollection = database.collection('galleryphotos');
        const criteria = { };
        if (req.params.gallery){
            criteria.gallery = req.params.gallery;
        }
        if(req.params.year){
            criteria.year = req.params.year;
        }
        galleryCollection.find(
            criteria,
            {galleryId: 1, gallery: 1, year: 1, photo: 1, portrait: 1}).toArray(async (err, docs) => {
            return await res.json(docs);
        });    
    });

    router.post('/authenticate',(req, res) => {
        const user = req.body;

        const usersCollection = database.collection('users');

        usersCollection.findOne({username: user.username},async (err, result) => {
            if(err){
                return res.status(500).json({error: err.message});
            }
            if(!result){
                return res.status(404).json({error: 'user not found'});
            }

            const pwdMatch = await bcrypt.compare(user.password, result.password);

            if(!pwdMatch){
                return res.status(401).json({error:'incorrect password.'});
            }

            const payload = {
                username: result.username,
                admin: result.admin
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h'});

            return res.json({
                message: 'successfully authenticated',
                token: token
            })
        })
    });
    return router;
}

module.exports = apiRouter;