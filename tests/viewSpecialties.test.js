'use strict'

const mysql = require('mysql');
const config = require('../config');

const DAOUser = require('../DAOs/DAOUser');

const pool = mysql.createPool(config.mysqlConfig);
const daoUser = new DAOUser(pool);

test('No dog breeds', done => {
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

    daoUser.getDogBreeds(3, callback);
});

test('No dog sizes', done => {
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

    daoUser.getDogSizes(3, callback);
});

test('Multipe dog breeds', done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }
        
        try {
            var resultado = Object.assign({}, data);
            var index = 0;
            while(index < data.length) {
                resultado[index] = Object.assign({}, resultado[index]);
                index++;
            };
            
            expect(resultado).toEqual({"0" : {"Name": "labrador"}, "1": {"Name": "Golden Retriever"} });
            done();
        } catch (error) {
            done(error);
        }
    }

    daoUser.getDogBreeds(2, callback);
});

test('Multipe dog sizes', done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }

        try {
            var resultado = Object.assign({}, data);
            var index = 0;
            while(index < data.length) {
                resultado[index] = Object.assign({}, resultado[index]);
                index++;
            };
            expect(resultado).toEqual({"0": {"Size": "Grande"}, "1": {"Size": "Mediano"}, "2": {"Size": "pequeño"}});    
            done();
        } catch (error) {
            done(error);
        }
    }

    daoUser.getDogSizes(2, callback);
});