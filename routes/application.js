'use strict'

// File's Modules
const config = require('../config');
const DAOUser = require('../DAOs/DAOUser');
const DAOApplication = require('../DAOs/DAOApplication');

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
    response.status(200);

    let dates = request.body.datesDisponibility.split('-');
    let dateStart = dates[0].split('/');
    let dateEnd = dates[1].split('/');
    let start = new Date(dateStart[2], dateStart[1] - 1, dateStart[0]);
    let end = new Date(dateEnd[2], dateEnd[1] - 1, dateEnd[0]);

    daoApplication.newApplication(request.body.idDogWatcher, start, end, (err) => {
        if (err) console.log(err);
        else daoUser.getUser(request.body.idDogWatcher, (err, user) => {
            if (err) console.log(err);
            else daoApplication.hasAcceptedApplication(request.session.user.Id, request.body.idDogWatcher, (err, accepted) => {
                if (err) console.log(err);
                else response.render('profile', { usuario : user, accepted : accepted });
            });
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
        else daoApplication.hasAcceptedApplication(request.session.user.Id, id, (err, accepted) => {
            if (err) console.log(err);
            else daoApplication.listApplications(id, (err, applications) => {
                console.log(applications);
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
    console.log(id);

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