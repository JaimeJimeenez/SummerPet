'use strict'

const mysql = require('mysql');
const config = require('../config');

const DAOValoration = require('../DAOs/DAOValoration');

const pool = mysql.createPool(config.mysqlConfig);
const daoValoration = new DAOValoration(pool);

test('Establish valoration', done => {
    let idOwner = 2;
    let idDogWatcher = 1;
    let valoration = 4;
    let description = "Este es un test de la historia de usuario de Valoar cuidador.";

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
    daoValoration.insertValoration(idOwner, idDogWatcher, valoration, description, callback);
});