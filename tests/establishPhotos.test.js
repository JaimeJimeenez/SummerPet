'use strict'

const mysql = require('mysql');
const config = require('../config');

const DAOUser = require('../DAOs/DAOUser');

const pool = mysql.createPool(config.mysqlConfig);
const daoUser = new DAOUser(pool);

test("Pruebas's photos", done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }
        try {
            expect(data.length).toBe(3);
            done();
        } catch (error) {
            done(error);
        }
    }

    daoUser.getPhotos(2, callback);
});

test("Pruebas2's valorations", done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }
        try {
            expect(data.length).toBe(0);
            done();
        } catch (error) {
            done(error);
        }
    }

    daoUser.getPhotos(3, callback);
});