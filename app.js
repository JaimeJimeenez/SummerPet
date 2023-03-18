'use strict'

// Core's Modules
const path = require('path');

// Package's Modules
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

app.get('/', (request, response) => {
    response.render('index.ejs');
});

app.get('/searchKeyWord', (request, response) => {
    daoUsuario.searchByKeyWord(request.query.keyword, (err, rows) => {
        if (err) console.log(err);
        else response.render('search.ejs', { usuarios : rows });
    });
});

app.get('/profile', (request, response) => {
    let id = Number(request.query.id);
    if(isNaN(id)) {
        response.status(400);
        response.end('Incorrect petition');
    } else daoUsuario.getUser(id, (err, user) => {
        console.log(user);
        if (err) console.log(err);
        else response.render('profile', { usuario : user });
    });
});

app.get('/image/:id', (request, response) => {
    let id = Number(request.params.id);
    if (isNaN(id)) {
        response.status(400);
        response.end('Incorrect petition');
    } else daoUsuario.getImage(id, (err, image) => {
        console.log(image);
        if (err) console.log(err);
        else response.end(image);
    });
});

/*
app.post("/enviarImagen", multerFactory.single('foto'), function(request, response) {
    if (request.file) console.log(request.file);
    daoUsuario.enviarImagen(request.file.buffer, (err) => {
        if (err) console.log(err);
        else console.log('Todo ok');
    });
});
*/

app.listen(config.port, () => {
    console.log('Server listening at port: ' + config.port);
});