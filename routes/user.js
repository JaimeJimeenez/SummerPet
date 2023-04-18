'use strict'

// File's modules
const config = require('../config');
const { validateSignUp, validationMiddleware } = require('../validators/signUp');
const DAOUser = require('../DAOs/DAOUser');
const DAOApplication = require('../DAOs/DAOApplication');

// Package's modules
const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const moment = require('moment');
const { validationResult } = require('express-validator');

const multerFactory = multer({storage : multer.memoryStorage() });
const router = express.Router();
const pool = mysql.createPool(config.mysqlConfig);

// DAO's instances
const daoUser = new DAOUser(pool);
const daoApplication = new DAOApplication(pool);

/*
// ----------- Middlewares -----------
const alreadyLogIn = (request, response, next) => {
    if (request.session.user) response.redirect('/');
    else next();
};

const yetLogIn = (request, response, next) => {
    if (!request.session.user) response.redirect('/user/login');
    else next();
};
*/

// --------------------------
router.get('/signUp', (request, response) => {
    response.status(200);
    response.render('signUp', { errors : [], exists : false });
});

router.post('/signUp', multerFactory.single('image'), validateSignUp, validationMiddleware, (request, response) => {
    response.status(200);

    daoUser.userExists(request.body.email, (err, exists) => {
        if (err) console.log(err);
        else {
            if (exists) response.render('signUp', { errors : [], exists : true });
            let photo = request.file === undefined ? null : request.file.buffer;
            let isDogWatcher = request.body.isDogWatcher === 'yes' ? 1 : 0;
            let description = request.body.description === '' ? null : request.body.description;
            let phone = request.body.phone === '' ? null : request.body.phone; 

            daoUser.signUp(request.body.username, request.body.email, request.body.password, request.body.direction, phone, description, photo, isDogWatcher, (err) => {
                if (err) console.log(err);
                else response.redirect('/');
            });
        }
    });
});

router.get('/signIn', (request, response) => {
    response.status(200);
    response.render('signIn', { signError : false });
});

router.post('/signIn', (request, response) => {
    response.status(200);

    daoUser.signIn(request.body.email, request.body.password, (err, user) => {
        console.log(user);
        if (err) console.log(err);
        else if (!user) response.render('signIn', { signError : true });
        else {
            request.session.user = user;
            console.log(user);
            response.render('/');
        }
    });
});

router.get('/profile', (request, response) => {
    let id = Number(request.query.id);
    
    if (isNaN(id)) {
        response.status(400);
        response.end('Incorrect petition');
    } else daoUser.getUser(id, (err, user) => {
        if (err) console.log(err);
        else daoApplication.hasAcceptedApplication(2, id, (err, accepted) => {
            if (err) console.log(err);
            else response.render('profile', { usuario : user, accepted : accepted });
        });
    });
});

router.get('/profilePhoto/:id', (request, response) => {
    let id = Number(request.params.id);

    if (isNaN(id)) {
        response.status(400);
        response.end('Incorrect petition');
    } else daoUser.getProfilePhoto(id, (err, photo) => {
        if (err) console.log(err);
        else response.end(photo);
    });
});

router.get('/picturesLocation', (request, response) => {
    let id = Number(request.query.id);

    if (isNaN(id)) {
        response.status(400);
        response.end('Incorrect petition');
    } else daoUser.getUser(id, (err, user) => {
        if (err) console.log(err);
        else daoApplication.hasAcceptedApplication(2, id, (err, accepted) => {
            if (err) console.log(err);
            else daoUser.getPhotosLocation(id, (err, photos) => {
                if (err) console.log(err);
                else response.render('locationPhotos', { usuario : user, photos : photos, accepted : accepted });
            });
        });
    });
});

router.get('/photosLocation/:id', (request, response) => {
    let id = Number(request.params.id);

    if (isNaN(id)) {
        response.status(400);
        response.end('Incorrect petition');
    } else daoUser.getPhotoLocation(id, (err, photo) => {
        if (err) console.log(err);
        else response.end(photo);
    });
});

router.get('/specialties', (request, response) => {
    let id = Number(request.query.id);

    if (isNaN(id)) {
        request.response(400);
        response.end('Incorrect petition');
    } else daoUser.getUser(id, (err, user) => {
        if (err) console.log(err);
        else daoApplication.hasAcceptedApplication(2, id, (err, accepted) => {
            if (err) console.log(err);
            else daoUser.getDogSizes(id, (err, dogSizes) => {
                if (err) console.log(err);
                else daoUser.getDogBreeds(id, (err, breeds) => {
                    if (err) console.log(err);
                    else response.render('specialties', { usuario : user, breeds : breeds, dogSizes : dogSizes, accepted : accepted });
                });
            });
        });
    });
});

router.post('/establishDisponibility', (request, response) => {
    response.status(200);
    
    console.log(request.body);

    let dates = request.body.date.split('-');
    let dateStart = dates[0].split('/');
    let dateEnd = dates[1].split('/');
    let start = new Date(dateStart[2], dateStart[1] - 1, dateStart[0]);
    let end = new Date(dateEnd[2], dateEnd[1] - 1, dateEnd[0]);
    
    if (!isNaN(Date.parse(start)) && !isNaN(Date.parse(end))) daoUser.insertDisponibility(request.body.id, start, end, (err) => {
        if (err) {
            response.status(400);
            response.end();
        } else response.json({});
    });
    else {
        response.status(400);
        response.end();
    }
});

module.exports = { router, pool };