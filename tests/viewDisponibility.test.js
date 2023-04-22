'use strict'

const mysql = require('mysql');
const config = require('../config');

const DAOUser = require('../DAOs/DAOUser');

const pool = mysql.createPool(config.mysqlConfig);
const daoUser = new DAOUser(pool);

test("Pruebas's disponibility", done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }
        try {
            let disponibilities = [];

            for (let i = 0; i < data.length; i++) {
                const startDate = data[i].StartDate; 
                const endDate = data[i].EndDate;

                let year = startDate.getFullYear();
                let month = (startDate.getMonth() + 1).toString().padStart(2, '0'); 
                let day = (startDate.getDate()).toString().padStart(2, '0');

                const formattedStart = `${year}-${month}-${day}`;
            
                year = endDate.getFullYear();
                month = (endDate.getMonth() + 1).toString().padStart(2, '0'); 
                day = (endDate.getDate()).toString().padStart(2, '0');
            
                const formattedEnd = `${year}-${month}-${day}`;

                let disponibility = {
                    StartDate : formattedStart,
                    EndDate : formattedEnd
                };

                disponibilities.push(disponibility);
            }
            

            expect(disponibilities).toStrictEqual( [
                {
                   StartDate : '2023-05-22',
                   EndDate : '2023-05-28'
                },
                {
                    StartDate : '2023-05-15',
                    EndDate : '2023-05-20'
                }
            ]);

            done();
        } catch (error) {
            done(error);
        }
    }

    daoUser.getDisponibility(2, callback);
});

test("Dates are valid", done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }
        try {

            for (let i = 0; i < data.length; i++) {
                const startDate = data[i].StartDate; 
                const endDate = data[i].EndDate;

                let year = startDate.getFullYear();
                let month = (startDate.getMonth() + 1).toString().padStart(2, '0'); 
                let day = (startDate.getDate()).toString().padStart(2, '0');

                const formattedStart = new Date (`${year}-${month}-${day}`);
            
                year = endDate.getFullYear();
                month = (endDate.getMonth() + 1).toString().padStart(2, '0'); 
                day = (endDate.getDate()).toString().padStart(2, '0');
            
                const formattedEnd = new Date(`${year}-${month}-${day}`);

                expect(formattedEnd.getTime()).toBeGreaterThanOrEqual(formattedStart.getTime());
            }

            done();
        } catch (error) {
            done(error);
        }
    }

    daoUser.getDisponibility(2, callback);
});

test("Pruebas2's disponibility", done => {
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

    daoUser.getDisponibility(3, callback);
});
