'use strict'

// Core's Modules
const path = require('path');

// Package's Modules
const mysql = require('mysql');
const express = require('express');

// File's Modules
const config = require('./config');
const DAOUsuario = require('./DAOs/DAOUsuario');

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
        response.status(404);
        response.end('Incorrect petition');
    } else daoUsuario.getUser(id, (err, user) => {
        console.log(user);
        if (err) console.log(err);
        else response.render('profile', { usuario : user });
    });
});

app.listen(config.port, () => {
    console.log('Server listening at port: ' + config.port);
});