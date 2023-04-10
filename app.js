'use strict'

// Core's Modules
const path = require('path');

// Package's Modules
const morgan = require('morgan');
const mysql = require('mysql');
const express = require('express');
const multer = require('multer');
const moment = require('moment');
const session = require('express-session');
const mysqlsession = require('express-mysql-session');

// File's Modules
const config = require('./config');
const index = require('./routes/index');
const user = require('./routes/user');
const application = require('./routes/application');
const DAOUsuario = require('./DAOs/DAOUser');
const DAOApplication = require('./DAOs/DAOApplicaton');

const multerFactory = multer( { storage : multer.memoryStorage() });

// Create pool connection to database
const pool = mysql.createPool(config.mysqlConfig);

// Create daoUsuario 
const daoUsuario = new DAOUsuario(pool);
const daoApplication = new DAOApplication(pool);

// ----------- Middleware Session -----------
const MYSQLStore = mysqlsession(session);
const sessionStore = new MYSQLStore(config.mysqlConfig);

const middlewareSession = session( {
    saveUninitialized: false,
    secret: 'SummerPet',
    resave: false,
    store: sessionStore
});

// Create server
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(middlewareSession);
app.use(express.urlencoded( { extended : true } ));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(morgan('dev'));

app.use('/', index.router);
app.use('/user', user.router);
app.use('/application', application.router);

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