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

test('Searching for Madrid', done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }

        let result = [];
        data.forEach((row) => {
            result.push({ Nombre: row.Nombre, Telefono: row.Telefono, Email: row.Email, Direccion: row.Direccion });
        });
        
        try {
            expect(result).toStrictEqual([
                {
                    Nombre: 'David',
                    Telefono: '698754312',
                    Email: 'david@email.com',
                    Direccion: 'Madrid'
                },
                {
                    Nombre: 'Lucia',
                    Telefono: '654312987',
                    Email: 'lucia@email.com',
                    Direccion: 'Madrid'
                }
            ]);    
            done();
        } catch (error) {
            done(error);
        }
    }

    daoUsuario.searchByKeyWord('Madrid', callback);
});

test('Searching for Lucia', done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }

        let result = [];
        data.forEach((row) => {
            result.push({ Nombre: row.Nombre, Telefono: row.Telefono, Email: row.Email, Direccion: row.Direccion });
        });
        try {
            expect(result).toStrictEqual([
                {
                    Nombre: 'Lucia',
                    Telefono: '654312987',
                    Email: 'lucia@email.com',
                    Direccion: 'Madrid'
                }]
                );
            done();
        } catch (error) {
            done(error);
        }
    }

    daoUsuario.searchByKeyWord('Lucia', callback);
});

test('Searching error', done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }

        let result = [];
        data.forEach((row) => {
            result.push({ Nombre: row.Nombre, Telefono: row.Telefono, Email: row.Email, Direccion: row.Direccion });
        });
        try {
            expect(result).toStrictEqual([
                {
                    Nombre: 'Davis',
                    Telefono: '123456789',
                    Email: 'david@email.com',
                    Direccion: 'Barcelona'
                }
            ]);
            done();
        } catch (error) {
            done(error);
        }
    }

    daoUsuario.searchByKeyWord('David', callback);
});