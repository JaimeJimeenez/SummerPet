'use strict'

// File's modules
const config = require('../config');
const DAOUser = require('../DAOs/DAOUser');
const DAOApplication = require('../DAOs/DAOApplication');

// Package's modules
const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const moment = require('moment');

const multerFactory = multer({storage : multer.memoryStorage() });
const router = express.Router();
const pool = mysql.createPool(config.mysqlConfig);

// DAO's instances
const daoUser = new DAOUser(pool);
const daoApplication = new DAOApplication(pool);

// --------------------------
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
            else daoUser.getSpecialties(id, (err, specialties) => {
                if (err) console.log(err);
                else {
                    let breeds = [];
                    let dogSizes = [];

                    specialties.forEach((breed) => {
                        if (breeds.indexOf(breed.BreedName) === -1) breeds.push(breed.BreedName);
                    });

                    specialties.forEach((dogSize) => {
                        if (dogSizes.indexOf(dogSize.Size) === -1) dogSizes.push(dogSize.Size);
                    });

                    response.render('specialties', { usuario : user, breeds : breeds, dogSizes : dogSizes, accepted : accepted });
                }
            });
        });
    });
});

module.exports = { router, pool };