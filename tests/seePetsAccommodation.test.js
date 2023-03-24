'use strict';

const mysql = require('mysql');
const config = require('../config');

const DAOUsuario = require('../DAOs/DAOUsuario');

const pool = mysql.createPool(config.mysqlConfig);
const daoUsuario = new DAOUsuario(pool);

describe('see carers accommodation for the pet test', () => {
  /*test('Displays 2 pictures uploaded by Jaime', done => {
    function callback(error, data) {
      if (error) {
        done(error);
        return;
      }
      try {
        const usuario = data.find(u => u.Name === 'Jaime');
        expect(usuario).toBeDefined();
        console.log(data);
        done();
      } catch(error) {
        done(error);
      }
    }

    daoUsuario.getPhotosLocation(1,callback);
  });*/

  
});