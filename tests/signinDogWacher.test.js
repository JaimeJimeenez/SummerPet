'use strict'

const mysql = require('mysql');
const config = require('../config');

const DAOUser = require('../DAOs/DAOUser');

const pool = mysql.createPool(config.mysqlConfig);
const daoUser = new DAOUser(pool);

test('Invalid email and password', done => {
    let wrong_email = "Nolaura@ucm.www";
    let wrong_passwd = "Nolauraucm";
    function callback(error, data) {
        if(data) done(new Error());
        else done();
    }

    daoUser.signIn(wrong_email, wrong_passwd, callback);
});

test('Existing email, wrong password', done => {
    let correct_email = "laura@ucm.es";
    let wrong_passwd = "Nolauraucm";

    function callback(error, data) {
        if(data) done(new Error());
        else done();
    }

    daoUser.signIn(correct_email, wrong_passwd, callback);
});

test('Existing email and correct password', done => {
    let correct_email = "laura@ucm.es";
    let wrong_passwd = "lauraucm";
    let expected_id = 9;

    function callback(error, data) {
        if(data.Id == 9 && data.isDogWatcher) done();
        else done(new Error());
    }

    daoUser.signIn(correct_email, wrong_passwd, callback);
});