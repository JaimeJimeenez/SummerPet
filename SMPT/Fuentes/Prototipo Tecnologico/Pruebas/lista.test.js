'use strict'

const mysql = require('mysql');
const config = require('../Src/config');

const DAOUsuario = require('../Src/DAOs/DAOUsuario');

const pool = mysql.createPool(config.mysqlConfig);
const daoUsuario = new DAOUsuario(pool);

test('Searching for no one', done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }
        try {
            expect(data).toStrictEqual([]); // Not toBe, pending to review this
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