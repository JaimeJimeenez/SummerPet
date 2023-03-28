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

test('Searching for Barcelona', done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }

        let result = [];
        data.forEach((row) => {
            result.push({ Name: row.Name, Phone: row.Phone, Email: row.Email, Direction: row.Direction });
        });
        
        console.log(result);
        try {
            expect(result).toStrictEqual([
                {
                    Name: 'Miguel',
                    Phone: '601478529',
                    Email: 'miguelnose@email.com',
                    Direction: 'Barcelona'
                }
            ]);    
            done();
        } catch (error) {
            done(error);
        }
    }

    daoUsuario.searchByKeyWord('Barcelona', callback);
});

test('Searching for Patricia', done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }

        let result = [];
        data.forEach((row) => {
            result.push({ Name: row.Name, Phone: row.Phone, Email: row.Email, Direction: row.Direction });
        });
        try {
            expect(result).toStrictEqual([]);
            done();
        } catch (error) {
            done(error);
        }
    }

    daoUsuario.searchByKeyWord('Patricia', callback);
});