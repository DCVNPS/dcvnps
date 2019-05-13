const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiRouter = require('./api-router');
const fileUpload = require('express-fileupload');

function createExpressApp(database) {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(fileUpload());
    app.use(express.static(path.join(__dirname,'public')));
    app.use('/profiles', express.static(path.join(__dirname, 'profiles')));
    app.use('/galleries', express.static(path.join(__dirname, 'galleries')));
    app.use('/images', express.static(path.join(__dirname, 'images')));
    app.use('/api',apiRouter(database));
    // This routing part is to let Angular handles the client side routing.
    app.use('*', (req, res) => {
        return res.sendFile(path.join(__dirname, 'public/index.html'));
    });
    return app;
}

module.exports = createExpressApp;