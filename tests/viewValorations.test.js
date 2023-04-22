'use strict'

const mysql = require('mysql');
const config = require('../config');

const DAOUser = require('../DAOs/DAOUser');

const pool = mysql.createPool(config.mysqlConfig);
const daoUser = new DAOUser(pool);

test("Pruebas's valorations", done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }
        try {

            let valoration = {
                Id : data[0].Id,
                IdOwner : data[0].IdOwner,
                IdDogWatcher : data[0].IdDogWatcher,
                Description : data[0].Description,
                Valoration : data[0].Valoration
            };

            expect(valoration).toStrictEqual( {
            
                Id : 4,
                IdOwner: 4,
                IdDogWatcher: 2,
                Valoration: 4,
                Description: 'Esta es una prueba para las valoraciones'

            });

            done();
        } catch (error) {
            done(error);
        }
    }

    daoUser.getValorations(2, callback);
});

test("Pruebas2's valorations", done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }
        try {
            expect(data).toStrictEqual([]);

            done();
        } catch (error) {
            done(error);
        }
    }

    daoUser.getValorations(3, callback);
});