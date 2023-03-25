'use strict'

// Core's Modules
const path = require('path');

// Package's Modules
const morgan = require('morgan');
const mysql = require('mysql');
const express = require('express');
const multer = require('multer');

// File's Modules
const config = require('./config');
const DAOUsuario = require('./DAOs/DAOUsuario');

const multerFactory = multer( { storage : multer.memoryStorage() });

// Create pool connection to database
const pool = mysql.createPool(config.mysqlConfig);

// Create daoUsuario 
const daoUsuario = new DAOUsuario(pool);

// Create server
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded( { extended : true } ));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.get('/', (request, response) => {
    response.render('index.ejs');
});

app.get('/searchKeyWord', (request, response) => {
    daoUsuario.searchByKeyWord(request.query.keyword, (err, rows) => {
        if (err) console.log(err);
        else response.render('search', { usuarios : rows });
    });
});

app.get('/profile', (request, response) => {
    let id = Number(request.query.id);
    if(isNaN(id)) {
        response.status(400);
        response.end('Incorrect petition');
    } else daoUsuario.getUser(id, (err, user) => {
        if (err) console.log(err);
        else response.render('profile', { usuario : user });
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
                    else {
                        let photos = [];
                        rows.forEach((user) => photos.push(user.IdPhoto));
                        let user = {
                            Id: rows[0].Id,
                            Photo: rows[0].Photo,
                            Name: rows[0].Name,
                            Direction: rows[0].Direction,
                            Photos: photos
                        };
                        response.render('locationPhotos', { usuario : user });
                    }
                });
            } else {
                daoUsuario.getUser(id, (err, user) => {
                    if (err) console.log(err);
                    else response.render('locationPhotos', { usuario : user });
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

app.get('/specialty', (request, response) => {
    let id = Number(request.query.id);

    if (isNaN(id)) {
        request.response(400);
        response.end('Incorrect petition');
    } else daoUsuario.getSpecialties(id, (err, specialties) => {
        if (specialties.length === 0) {
            daoUsuario.getUser(id, (err, user) => {
                console.log(user);
                if (err) console.log(err);
                else response.render('specialties', { usuario : user });
            });
        }
        else {
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
                Breeds: breeds,
                Sizes: dogSizes
            };

            if (err) console.log(err);
            else response.render('specialties', { usuario : user });
        }
    });

});

app.post("/enviarImagen", multerFactory.single('foto'), function(request, response) {
    if (request.file) console.log(request.file);
    daoUsuario.enviarImagen(request.file.buffer, (err) => {
        if (err) console.log(err);
        else response.redirect('/');
    });
});

app.listen(config.port, () => {
    console.log('Server listening at port: ' + config.port);
});

/*app.listen(process.env.PORT, () => {
    console.log('Server listening at port: ' + config.port);
});*/