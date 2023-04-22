'use strict';

const mysql = require('mysql');
const config = require('../config');

const DAOUser = require('../DAOs/DAOUser');

const pool = mysql.createPool(config.mysqlConfig);
const daoUser = new DAOUser(pool);

describe('Show carer profile details', () => {
  test('Displays name, location, and profile pic for Jaime', done => {
    function callback(error, data) {
      if (error) {
        done(error);
        return;
      }
      try {
        const usuario = data.find(u => u.Name === 'Jaime');
        expect(usuario).toBeDefined();
        expect(usuario.Photo).not.toBe(null);
        expect(usuario.Direction).toBe('Madrid');
        done();
      } catch(error) {
        done(error);
      }
    }

    daoUsuario.searchByKeyWord('Jaime', callback);
  });

  test('Displays name, location, and generic pic for Maria, whos an owner', done => {
    function callback(error, data) {
      if (error) {
        done(error);
        return;
      }
      try {
        const usuario = data.find(u => u.Name === 'Maria');
        
        expect(data).toStrictEqual([]);
        done();
      } catch(error) {
        done(error);
      }
    }

    daoUsuario.searchByKeyWord('Maria', callback);
  });
});
