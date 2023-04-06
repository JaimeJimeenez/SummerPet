'use strict'

// Core's Modules
const path = require('path');

// Package's Modules
const morgan = require('morgan');
const mysql = require('mysql');
const express = require('express');
const multer = require('multer');
const moment = require('moment');

// File's Modules
const config = require('./config');
const index = require('./routes/index');
const DAOUsuario = require('./DAOs/DAOUser');
const DAOApplication = require('./DAOs/DAOApplicaton');

const multerFactory = multer( { storage : multer.memoryStorage() });

// Create pool connection to database
const pool = mysql.createPool(config.mysqlConfig);

// Create daoUsuario 
const daoUsuario = new DAOUsuario(pool);
const daoApplication = new DAOApplication(pool);

// Create server
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded( { extended : true } ));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(morgan('dev'));

app.use('/', index.router);

app.get('/profile', (request, response) => {
    let id = Number(request.query.id);
    if(isNaN(id)) {
        response.status(400);
        response.end('Incorrect petition');
    } else daoUsuario.getUser(id, (err, user) => {
        if (err) console.log(err);
        else {
            daoApplication.hasAcceptedApplication(2, id, (err, hasAcceptedApplication) => {
                if (err) console.log(err);
                else {
                    user.hasAcceptedApplication = hasAcceptedApplication;
                    response.render('profile', { usuario : user });
                }
            });
            
        } 
    });
});

app.get('/profilePhoto/:id', (request, response) => {
    let id = Number(request.params.id);
    if (isNaN(id)) {
        response.status(400);
        response.end('Incorrect petition');
    } else daoUsuario.getProfilePhoto(id, (err, photo) => {
        if (err) console.log(err);
        else response.end(photo);
    });
});

app.get('/picturesLocation', (request, response) => {
    let id = Number(request.query.id);

    if (isNaN(id)) {
        response.status(400);
        response.end('Incorrect petition');
    } else {
        daoUsuario.havePhotosLocation(id, (err, havePhotos) => {
            if (err) console.log(err);
            else if (havePhotos) {
                daoUsuario.getPhotosLocation(id, (err, rows) => {
                    if (err) console.log(err);
                    else daoApplication.hasAcceptedApplication(2, id, (err, hasAcceptedApplication) => {
                        if (err) console.log(err);
                        else {
                            let photos = [];
                            rows.forEach((user) => photos.push(user.IdPhoto));
                            let user = {
                                Id: rows[0].Id,
                                Photo: rows[0].Photo,
                                Name: rows[0].Name,
                                Direction: rows[0].Direction,
                                Phone: rows[0].Phone,
                                Email: rows[0].Email,
                                Photos: photos,
                                hasAcceptedApplication: hasAcceptedApplication
                            };
                            console.log(user);
                            response.render('locationPhotos', { usuario : user });
                        }  
                    });
                });
            } else {
                daoUsuario.getUser(id, (err, user) => {
                    if (err) console.log(err);
                    else daoApplication.hasAcceptedApplication(2, id, (err, hasAcceptedApplication) => {
                        if (err) console.log(err);
                        else {
                            user.hasAcceptedApplication = hasAcceptedApplication;
                            response.render('locationPhotos', { usuario : user });    
                        }
                    }); 
                });
            }
        });
    }
});

app.get('/photosLocation/:id', (request, response) => {
    let id = Number(request.params.id);

    if (isNaN(id)) {
        request.response(400);
        response.end('Incorrect petition');
    } else daoUsuario.getPhotoLocation(id, (err, photo) => {
        if (err) console.log(err);
        else response.end(photo);
    });
});

app.post('/sendApplication', (request, response) => {
    let idDogWatcher = request.body.idDogWatcher;
    let startDate = request.body.startDate;
    let endDate = request.body.endDate;

    daoApplication.newApplication(idDogWatcher, new Date(startDate), new Date(endDate), (err) => {
        if (err) console.log(err);
        else daoUsuario.getUser(idDogWatcher, (err, user) => {
            if (err) console.log(err);
            else response.render('profile', { usuario : user });
        });
    });
});

app.get('/specialty', (request, response) => {
    let id = Number(request.query.id);

    if (isNaN(id)) {
        request.response(400);
        response.end('Incorrect petition');
    } else daoUsuario.getSpecialties(id, (err, specialties) => {
        if (err) console.log(err)
        else daoApplication.hasAcceptedApplication(2, id, (err, hasAcceptedApplication) => {
            if (err) console.log(err);
            else if (specialties.length === 0) {
                daoUsuario.getUser(id, (err, user) => {
                    if (err) console.log(err);
                    else {
                        user.hasAcceptedApplication = hasAcceptedApplication;
                        response.render('specialties', { usuario : user });
                    }
                });
            } else {
                let breeds = []; 
                specialties.forEach((breed) => {
                    if (breeds.indexOf(breed.BreedName) === -1) breeds.push(breed.BreedName);
                });

                let dogSizes = [];
                specialties.forEach((dogSize) => {
                    if (dogSizes.indexOf(dogSize.Size) === -1) dogSizes.push(dogSize.Size);
                });

                let user = {
                    Id: specialties[0].Id,
                    Name: specialties[0].Name,
                    Direction: specialties[0].Direction,
                    Photo: specialties[0].Photo,
                    Email: specialties[0].Email,
                    Phone: specialties[0].Phone,
                    Breeds: breeds,
                    Sizes: dogSizes,
                    hasAcceptedApplication : hasAcceptedApplication
                };

                if (err) console.log(err);
                else response.render('specialties', { usuario : user });
            }
        });
    });

});

app.post("/enviarImagen", multerFactory.single('foto'), function(request, response) {
    if (request.file) console.log(request.file);
    daoUsuario.enviarImagen(request.file.buffer, (err) => {
        if (err) console.log(err);
        else response.redirect('/');
    });
});

app.get('/applications', (request, response) => {
    let id = Number(request.query.id);

    if (isNaN(id)) {
        request.response(400);
        response.end('Incorrect petition');
    } else daoUsuario.getUser(id, (err, user) => {
        if (err) console.log(err);
        else daoApplication.hasAcceptedApplication(2, id, (err, hasAcceptedApplication) => {
            if (err) console.log(err);
            else {
                user.hasAcceptedApplication = hasAcceptedApplication;
                daoApplication.listApplications(id, (err, applications) => {
                    if (err) console.log(err);
                    else {
                        user.applications = applications;
                        console.log(user);
                        response.render('applications', { usuario : user });
                    }
                });
            }
        }); 
    });
});

app.get('/getApplication/:id', (request, response, next) => {
    response.status(200);
    let id = Number(request.params.id);

    console.log(id);
    if (!isNaN(id) && id >= 0) {
        daoApplication.getApplication(id, (err, application) => {
            if (err) next(err);
            else {
                response.json( { application : application });
            }
        });
    } else {
        response.status(400);
        response.end();
    }
});

app.get('/acceptApplication/:id', (request, response) => {
    response.status(200);
    let id = Number(request.params.id);

    console.log(id);
    console.log('Estoy en accept application');
    if (!isNaN(id) && id >= 0) {
        daoApplication.acceptApplication(id, (err) => {
            if (err) console.log(err);
            else response.json({ });
        });
    } else {
        response.status(400);
        response.end();
    }
});


app.listen(config.port, () => {
    console.log('Server listening at port: ' + config.port);
});

/*app.listen(process.env.PORT, () => {
    console.log('Server listening at port: ' + config.port);
});*/