'use strict';
const supertest= require('supertest');
const mysql = require('mysql');
const config = require('../config');


const DAOUser = require('../DAOs/DAOUser');


const pool = mysql.createPool(config.mysqlConfig);
const daoUser = new DAOUser(pool);


test('No exist DogOwnwer juanito@email.com', done=> {
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
test('New DogOwner succesfully',done=>{
    function callback(error,data){
        if (error) {
            done(error);
            return error;
        }
        try {
            expect(data).not.toBeNull;
            done();
        }catch (error) {
            done(error);
        }
    }
    daoUser.signUp('juanito','juanito9@email.com','ABCDEFGH12','CALLE MUY LEJOS COOOOO','684119400','NO DESCRIPCION',null,0,callback);
});