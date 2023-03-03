'use strict'

// Core's Modules
const path = require('path');

// Package's Modules
const mysql = require('mysql');
const express = require('express');

// File's Modules
const config = require('./config.js');
const DAOUsuario = require('./DAOs/DAOUsuario');

// Create server
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Create pool's connection to the database
const pool = mysql.createPool(config.mysqlConfig);

// Create daoUser for the prototype
const daoUsuario = new DAOUsuario(pool);

app.get('/', (request, response) => {
    daoUsuario.getCuidadores((err, rows) => {
        console.log(rows);
        if (err) console.log(err);
        else response.render('index', { usuarios : rows } );
    });
});

app.listen(config.port, () => {
    console.log('Server listening at port: ' + config.port);
});