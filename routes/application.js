'use strict'

// File's Modules
const config = require('../config');
const DAOUser = require('../DAOs/DAOUser');
const DAOApplication = require('../DAOs/DAOApplicaton');

// Package's modules
const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const moment = require('moment');

const router = express.Router();
const pool = mysql.createPool(config.mysqlConfig);

// DAO's instances
const daoUser = new DAOUser(pool);
const daoApplication = new DAOApplication(pool);

// --------------------------
router.post('/sendApplication', (request, response) => {
    daoApplication.newApplication(request.body.idDogWatcher, new Date(request.body.startDate), new Date(request.body.endDate), (err) => {
        if (err) console.log(err);
        else daoUser.getUser(request.body.idDogWatcher, (err, user) => {
            if (err) console.log(err);
            else response.render('profile', { usuario : user });
        });
    });
});

router.get('/applications', (request, response) => {
    let id = Number(request.query.id);

    if (isNaN(id)) {
        request.response(400);
        response.end('Incorrect petition');
    } else daoUser.getUser(id, (err, user) => {
        if (err) console.log(err);
        else daoApplication.hasAcceptedApplication(2, id, (err, accepted) => {
            if (err) console.log(err);
            else daoApplication.listApplications(id, (err, applications) => {
                if (err) console.log(err);
                else response.render('applications', { usuario : user, applications : applications, accepted : accepted });
            });
        });
    })
});

router.get('/getApplication/:id', (request, response, next) => {
    response.status(200);
    let id = Number(request.params.id);

    if (!isNaN(id) && id >= 0) daoApplication.getApplication(id, (err, application) => {
        if (err) next(err);
        else response.json({ application : application });
    });
    else {
        response.status(400);
        response.end();
    }
});


router.get('/acceptApplication/:id', (request, response) => {
    response.status(200);
    let id = Number(request.params.id);

    if (!isNaN(id) && id >= 0) daoApplication.acceptApplication(id, (err) => {
        if (err) console.log(err);
        else response.json({});
    });
    else {
        response.status(400);
        response.end();
    }
});

module.exports = { router, pool };