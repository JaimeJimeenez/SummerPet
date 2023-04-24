'use strict';

const mysql = require('mysql');
const config = require('../config');


const DAOUser = require('../DAOs/DAOUser');


const pool = mysql.createPool(config.mysqlConfig);
const daoUser = new DAOUser(pool);



describe('PRUEBA PARA USUARIO QUE NO EXISTE juanito@email.com',()=>{
    test('No existe usuario con email juanito@email.com', done=> {
        function callback(error,data){
            if (error) {
                done(error);
                return error;
            }

            try {
                expect(data).toBe(false);
                done();
            }catch (error) {
                done(error);
            }

        }
        daoUser.userExists('juanito1@email.com',callback);
    });
    test('creacion del nuevo usuario con datos correctos',done=>{
        function callback(error,data){
            if (error) {
                done(error);
                return error;
            }

            try {
                expect(data).not.toBeNull();
                done();
            }catch (error) {
                done(error);
            }

        }
        daoUser.signUp('juanitoP','juanitoP@email.com','ABCDEFGH12','CALLE MUY LEJOS COOOOO','684119400','NO DESCRIPCION',null,1,callback);
    });

})
