'use strict';

const mysql = require('mysql');
const config = require('../config');

const DAOUser = require('../DAOs/DAOUser');
const {render,screen} = require('@testing-library/jest-dom')
const pool = mysql.createPool(config.mysqlConfig);
const daoUser = new DAOUser(pool);

describe('see carers accommodation for the pet test', () => {
  test('Displays 2 pictures uploaded by Jaime', done => {
    function callback(error, data) {
      if (error) {
        done(error);
        return;
      }
      try {
        
        expect(data).toBeDefined();
        expect(data.length).toBe(2);
        data.forEach(photo => {
          expect(photo.Id).toBe(1); // verificación del ID del usuario
        });
        done();
      } catch(error) {
        done(error);
      }
    }

    daoUsuario.getPhotosLocation(1,callback);
  });

 test('Displays an error message in Miguel profile', done => {
    function callback(error, data) {
      if (error) {
        done(error);
        return;
      }
      try {
        
        expect(data).toBeDefined();
        expect(data).toStrictEqual([]);
        const usuario = { nombre: 'Miguel' }; // Simula usuario sin Photos
        const mensajeError = 'No existen fotos de momento';
        expect(() => {
          // Función que verifica que se muestra el mensaje de error
          if (data.length === 0) throw new Error(mensajeError);
        }).toThrow(mensajeError);
        done();
       
      } catch(error) {
        done(error);
      }
    }

    daoUsuario.getPhotosLocation(2,callback);
  });

  
});