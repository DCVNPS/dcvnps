const path = require('path');
const express= require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressRequestId = require('express-request-id');

// Application dependencies
const routeHandler = require('./routes');

module.exports = (config) =>{
    if(!config){
        throw new Error('app.js missing config object');
    }
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(fileUpload(
        {
            limits: {fileSize: 2*1024*1024},
            createParentPath: true
        }
    ));
    // config all static resource paths
    app.use(express.static(path.join(__dirname,'public')));
    // app.use('/profiles', express.static(path.join(__dirname, 'profiles')));
    app.use('/galleries', express.static(path.join(__dirname, 'galleries')));
    app.use('/images', express.static(path.join(__dirname, 'images')));
    // inject a request id 
    app.use(expressRequestId());
    // configure api router
    app.use('/api',routeHandler(express, config));
    // This routing part is to let Angular handles the client side routing.
    app.use('*', (req, res) => {
        return res.sendFile(path.join(__dirname, 'public/index.html'));
    });
    return app;

}
