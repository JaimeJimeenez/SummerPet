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

app.listen(process.env.PORT, () => {
    console.log('Server listening at port: ' + config.port);
});