'use strict'

// Core's Modules
const path = require('path');

// Package's Modules
const morgan = require('morgan');
const express = require('express');
const session = require('express-session');
const mysqlSession = require('express-mysql-session');

// File's Modules
const config = require('./config');
const index = require('./routes/index');
const user = require('./routes/user');
const application = require('./routes/application');

// ----------- Middleware Session -----------
const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore(config.mysqlConfig);

const middlewareSession = session( {
    saveUninitialized: false,
    secret: 'UCM-SMPT',
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

app.listen(config.port, () => {
    console.log('Server listening at port: ' + config.port);
});

/*app.listen(process.env.PORT, () => {
    console.log('Server listening at port: ' + config.port);
});*/