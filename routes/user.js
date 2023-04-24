'use strict'

// File's modules
const config = require('../config');
const { validateSignUp, validationMiddleware } = require('../validators/signUp');
const DAOUser = require('../DAOs/DAOUser');
const DAOApplication = require('../DAOs/DAOApplication');
const DAOValoration = require('../DAOs/DAOValoration');

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
const daoValoration = new DAOValoration(pool);

// ----------- Middlewares -----------
const alreadyLogIn = (request, response, next) => {
    if (request.session.user) response.redirect('/');
    else next();
};

const yetLogIn = (request, response, next) => {
    if (!request.session.user) response.redirect('/user/signIn');
    else next();
};

// --------------------------
router.use((request, response, next) => {
    response.locals.user = request.session.user;
    next();
});

router.get('/signUp', alreadyLogIn, (request, response) => {
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

            daoUser.signUp(request.body.username, request.body.email, request.body.password, request.body.direction, phone, description, photo, isDogWatcher, (err, id) => {
                if (err) console.log(err);
                else {
                    let user = {
                        Id : id,
                        Name : request.body.username,
                        Email : request.body.email,
                        Password : request.body.password,
                        Direction : request.body.direction,
                        Phone : phone,
                        Photo : photo,
                        Description : description,
                        isDogWatcher : isDogWatcher
                    }     
                    
                    request.session.user = user;
                    response.locals.user = user;
                    response.render('index');
                }
            });
        }
    });
});

router.get('/signIn', alreadyLogIn, (request, response) => {
    response.status(200);
    response.render('signIn', { signError : false });
});

router.post('/signIn', (request, response) => {
    response.status(200);

    daoUser.signIn(request.body.email, request.body.password, (err, user) => {
        if (err) console.log(err);
        else if (!user) response.render('signIn', { signError : true });
        else {
            request.session.user = user;
            response.locals.user = user;
            response.render('index');
        }
    });
});

router.get('/logout', yetLogIn, (request, response) => {
    request.session.destroy();
    response.locals.user = undefined;
    response.render('index');
});

router.get('/profile', yetLogIn, (request, response) => {
    let id = Number(request.query.id);
    
    if (isNaN(id)) {
        response.status(400);
        response.end('Incorrect petition');
    } else daoUser.getUser(id, (err, user) => {
        if (err) console.log(err);
        else daoApplication.hasAcceptedApplication(request.session.user.Id, id, (err, accepted) => {
            if (err) console.log(err);
            else response.render('profile', { usuario : user, accepted : accepted });
           
        });
    });
});

router.get('/profilePhoto/:id', yetLogIn, (request, response) => {
    let id = Number(request.params.id);

    if (isNaN(id)) {
        response.status(400);
        response.end('Incorrect petition');
    } else daoUser.getProfilePhoto(id, (err, photo) => {
        if (err) console.log(err);
        else response.end(photo);
    });
});

router.get('/picturesLocation', yetLogIn, (request, response) => {
    let id = Number(request.query.id);

    if (isNaN(id)) {
        response.status(400);
        response.end('Incorrect petition');
    } else daoUser.getUser(id, (err, user) => {
        if (err) console.log(err);
        else daoApplication.hasAcceptedApplication(2, id, (err, accepted) => {
            if (err) console.log(err);
            else daoUser.getPhotos(id, (err, photos) => {
                if (err) console.log(err);
                else response.render('locationPhotos', { usuario : user, photos : photos, accepted : accepted });
            });
        });
    });
});

router.get('/photosLocation/:id', yetLogIn, (request, response) => {
    let id = Number(request.params.id);

    if (isNaN(id)) {
        response.status(400);
        response.end('Incorrect petition');
    } else daoUser.getPhotoLocation(id, (err, photo) => {
        if (err) console.log(err);
        else response.end(photo);
    });
});

router.get('/specialties', yetLogIn, (request, response) => {
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

router.get('/getDisponibility/:id', (request, response) => {
    let id = Number(request.params.id);
    
    if (isNaN(id)) {
        response.status(400);
        response.end('Incorrect petition');
    }
    else daoUser.getDisponibility(id,(err, disponibilities)=>{
        if(err) console.log(err);
        else response.json({ disponibilities : disponibilities });
    })
});

router.post('/establishDisponibility', (request, response) => {
    response.status(200);

    let dates = request.body.date.split('-');
    let dateStart = dates[0].split('/');
    let dateEnd = dates[1].split('/');
    let start = new Date(dateStart[2], dateStart[1] - 1, dateStart[0]);
    let end = new Date(dateEnd[2], dateEnd[1] - 1, dateEnd[0]);
    
    if (!isNaN(Date.parse(start)) && !isNaN(Date.parse(end))) 
        daoUser.insertDisponibility(request.body.id, start, end, (err) => {
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

router.get('/searchKeyword', (request, response) => {
    daoUser.searchByKeyWord(request.query.keyword, (err, users) => {
        if (err) console.log(err);
        else response.render('search', { usuarios : users });
    });
});

router.get('/getPhotos/:id', (request, response) => {
    let id = Number(request.params.id);

    if (isNaN(id)) {
        response.status(400);
        response.end('Incorrect petitions');
    } else daoUser.getPhotos(id, (err, photos) => {
        if (err) next(err);
        else response.json({ photos : photos.length });
    });
});

router.post('/insertPhotoLocation', multerFactory.single('photo'), (request, response) => {
    response.status(200);

    daoUser.insertPhotoLocation(request.query.id, request.file.buffer, (err) => {
        if (err) console.log(err);
        else response.render('index');
    })
});

router.get('/valorate/:id', (request, response) => {
    let id = Number(request.params.id);

    if (isNaN(id)) {
        response.status(400);
        response.end('Incorrect petition');
    } else daoApplication.getApplicationsByOwner(request.session.user.Id, id, (err, applications) => {
        if (err) next(err);
        else response.json({ applications : applications });
    });
});

router.get('/getValorations', (request, response) => {
    let id = Number(request.query.id);

    if (isNaN(id)) {
        response.status(400);
        response.end('Incorrect petition');
    } else daoUser.getUser(id, (err, user) => {
        if (err) console.log(err);
        else daoApplication.hasAcceptedApplication(request.session.user.Id, id, (err, accepted) => {
            if (err) console.log(err);
            else daoUser.getValorations(id, (err, valorations) => {
                if (err) console.log(err);
                else if (valorations.length !== 0) {
                    let note = 0;
        
                    valorations.forEach(valoration => note += valoration.Valoration );
                    if (note !== 0) note /= valorations.length;
                    valorations.half = Math.round(note);
                    response.render('valorations', { usuario : user, valorations : valorations, accepted : accepted });
                } else response.render('valorations', { usuario : user, valorations : valorations, accepted : accepted});
            });
        });
    }); 
});

router.post('/valorateUser', (request, response) => {
    response.status(200);

    let ids = request.body.ids.split('-');
    let idApplication = Number(ids[0]);
    let idDogWatcher = Number(ids[1]);

    console.log(idApplication);
    console.log(idDogWatcher);
    console.log(request.body);

    if (!isNaN(idApplication) && !isNaN(idDogWatcher)) 
        daoValoration.insertValoration(request.session.user.Id, idDogWatcher, request.body.valoration, request.body.description, (err) => {
            if (err) {
                response.status(400);
                response.end();
            }
            else daoApplication.deleteApplication(idApplication, (err) => {
                if (err) {
                    response.status(400);
                    response.end();
                } else response.json({});
            })
        });
    else {
        response.status(400);
        response.end('Incorrect petition');
    }

});

module.exports = { router, pool };