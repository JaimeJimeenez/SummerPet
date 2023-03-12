'use strict'

const mysql = require('mysql');
const config = require('../config');

const DAOUsuario = require('../DAOs/DAOUsuario');

const pool = mysql.createPool(config.mysqlConfig);
const daoUsuario = new DAOUsuario(pool);

test('Searching for no one', done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }
        try {
            expect(data).toStrictEqual([]);  
            done();
        } catch(error) {
            done(error);
        }
    }

    daoUsuario.searchByKeyWord('Madriz', callback);
});