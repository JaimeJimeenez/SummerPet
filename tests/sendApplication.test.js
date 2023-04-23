'use strict'

const mysql = require('mysql');
const config = require('../config');

const DAOApplication = require('../DAOs/DAOApplication');

const pool = mysql.createPool(config.mysqlConfig);
const daoApplication = new DAOApplication(pool);

test('Send one application', done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }
        try {
            expect(data).toBe(true);
            done();
        } catch(error) {
            done(error);
        }
    }

    daoApplication.newApplication(2, new Date('2023-04-29'), new Date('2023-04-30'), callback);
});
