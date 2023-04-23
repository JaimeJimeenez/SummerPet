'use strict';

const mysql = require('mysql');
const config = require('../config');

const DAOUsuario = require('../DAOs/DAOUsuario');
const {render,screen} = require('@testing-library/jest-dom')
const pool = mysql.createPool(config.mysqlConfig);
const daoUsuario = new DAOUsuario(pool);

describe('see carers specialties test', () => {
    
  test('should retrieve specialties of Jaime id=1', done => {
    function callback(error, data) {
      if (error) {
        done(error);
        return;
      }
      try {
        expect(data).toBeDefined();
        const breeds=new Set();
        for (let dog of data) {
            breeds.add(dog["BreedName"]);
        }
        expect(breeds.size).toBe(5);
        const sizes=new Set();
        for (let dog of data) {
            sizes.add(dog["Size"]);
        }
        expect(sizes.size).toBe(3);
        done();
      } catch(error) {
        done(error);
      }
    }

    daoUsuario.getSpecialties(1,callback);
  });
  test('should retrieve specialties of Maria id=2', done => {
    function callback(error, data) {
      if (error) {
        done(error);
        return;
      }
      try {
        expect(data).toBeDefined();
        const breeds=new Set();
        for (let dog of data) {
            breeds.add(dog["BreedName"]);
        }
        expect(breeds.size).toBe(3);
        const sizes=new Set();
        for (let dog of data) {
            sizes.add(dog["Size"]);
        }
        expect(sizes.size).toBe(1);
        done();
      } catch(error) {
        done(error);
      }
    }

    daoUsuario.getSpecialties(2,callback);
  });

  test('should show an error in Miguels profile id=3', done => {
    function callback(error, data) {
      if (error) {
        done(error);
        return;
      }
      try {
        expect(data).toBeDefined();
        const breeds=new Set();
        for (let dog of data) {
            breeds.add(dog["BreedName"]);
        }
        expect(breeds.size).toBe(0);
        const sizes=new Set();
        for (let dog of data) {
            sizes.add(dog["BreedName"]);
        }
        expect(sizes.size).toBe(0);
        const mensajeError = 'no tiene preferencia en ninguna raza de perro';
        expect(() => {
          // Función que verifica que se muestra el mensaje de error
          if (data.length === 0) throw new Error(mensajeError);
        }).toThrow(mensajeError);
        const mensajeError2 = 'no tiene preferencia en el tamaño de los perros';
        expect(() => {
          // Función que verifica que se muestra el mensaje de error
          if (data.length === 0) throw new Error(mensajeError2);
        }).toThrow(mensajeError2);
        done();
      } catch(error) {
        done(error);
      }
    }

    daoUsuario.getSpecialties(3,callback);
  });

  
});