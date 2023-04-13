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
            var num_breeds = 5;
            var resultado = Object.assign({}, data);
            var index = 0;
            while(index < num_breeds) {
                resultado[index] = Object.assign({}, resultado[index]);
                index++;
            };
            
            expect(resultado).toEqual({"0" : {"Name": "Husky"}, "1": {"Name": "Golden Terrier"}, "2": {"Name": "Salchicha"}, "3": {"Name": "Golden Retriever"}, "4": {"Name": "Labrador"}});
            done();
        } catch (error) {
            done(error);
        }
    }

    daoUser.getDogBreeds(1, callback);
});

test('Multipe dog sizes', done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }

        try {
            var resultado = Object.assign({}, data);
            expect(resultado).toEqual({"0": {"Size": "pequenio"}, "1": {"Size": "grande"}, "2": {"Size": "mediano"}});    
            done();
        } catch (error) {
            done(error);
        }
    }

    daoUser.getDogSizes(1, callback);
});