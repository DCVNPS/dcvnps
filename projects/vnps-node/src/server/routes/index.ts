#!/usr/bin/env node

// Dependencies
const path = require('path');
const envPath = path.normalize(__dirname + '/../../../.env');
require('dotenv').config({ path: envPath });
import * as express from 'express';
import * as checkJwt from 'express-jwt';
import * as process from 'process';
import { Config } from '../config';
import commonRouter from './commons';
import announcementRouter from './announcements';
import boardMembersRouter from './admin/boardmembers';
import usersRouter from './admin/users';
import authRouter from './admin/authentication';
import galleryPhotosRouter from './galleryphotos';
import classesRouter from './vnpsclasses';
import galleryRouter from './galleries';

class RouteHandler {
    public routeHandler = express.Router();
    private jwt_secret: string ;
    private config = new Config();
    private log = this.config.logger;
    constructor() {
        this.jwt_secret = process.env.JWT_SECRET;
        this.configRoute();
    }

    private configRoute() {
        // User expresss json web token check express-jwt to guard the angular routes
        this.routeHandler.use(
            checkJwt({ secret: this.jwt_secret, requestProperty: 'auth' })
            .unless( {
                path: [
                    '/api/auth/login',
                    '/api/auth/logout',
                    '/api/auth/renewtoken'
                ]})
        );

        this.routeHandler.use((err, req, res, next) => {
            const log = this.log.child({ src: true, id: req.id, err: err }, true);
            log.levels('dcvnpslog', this.config.logLevel.ERROR);
            log.error('Error');
            if (err.name === 'UnauthorizedError') {
                return res.status(500).json(err.message);
            }
        });
        this.routeHandler.use('/commons', commonRouter);
        this.routeHandler.use('/announcements', announcementRouter);
        this.routeHandler.use('/boardmembers', boardMembersRouter);
        this.routeHandler.use('/galleryphotos', galleryPhotosRouter);
        this.routeHandler.use('/galleries', galleryRouter);
        this.routeHandler.use('/vnpsclasses', classesRouter);
        this.routeHandler.use('/users', usersRouter);
        this.routeHandler.use('/auth', authRouter);
    }
}

export default new RouteHandler().routeHandler;
