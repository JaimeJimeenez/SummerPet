'use strict'

const mysql = require('mysql');
const config = require('../config');

const DAOApplication = require('../DAOs/DAOApplication');

const pool = mysql.createPool(config.mysqlConfig);
const daoApplication = new DAOApplication(pool);

test('Searching for one application accepted', done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }
        try {
            const startDate = data.StartDate; 
            const endDate = data.FinalDate;

            let year = startDate.getFullYear();
            let month = (startDate.getMonth() + 1).toString().padStart(2, '0'); 
            let day = (startDate.getDate()).toString().padStart(2, '0');

            const formattedStart = `${year}-${month}-${day}`;
            
            year = endDate.getFullYear();
            month = (endDate.getMonth() + 1).toString().padStart(2, '0'); 
            day = (endDate.getDate()).toString().padStart(2, '0');
            
            const formattedEnd = `${year}-${month}-${day}`;

            let application = {
                Id: data.Id,
                StartDate: formattedStart,
                FinalDate: formattedEnd,
                Accepted: data.Accepted,
                Active: data.Active
            }

            expect(application).toStrictEqual( {
                Id: 3,
                StartDate: '2023-04-07',
                FinalDate: '2023-04-08',
                Accepted: 1,
                Active: 1
            });  
            done();
        } catch(error) {
            done(error);
        }
    }

    daoApplication.getApplication(3, callback);
});

test('Searching for one application that is not accepted', done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }
        try {
            const startDate = data.StartDate; 
            const endDate = data.FinalDate;

            let year = startDate.getFullYear();
            let month = (startDate.getMonth() + 1).toString().padStart(2, '0'); 
            let day = (startDate.getDate()).toString().padStart(2, '0');

            const formattedStart = `${year}-${month}-${day}`;
            
            year = endDate.getFullYear();
            month = (endDate.getMonth() + 1).toString().padStart(2, '0'); 
            day = (endDate.getDate()).toString().padStart(2, '0');
            
            const formattedEnd = `${year}-${month}-${day}`;

            let application = {
                Id: data.Id,
                StartDate: formattedStart,
                FinalDate: formattedEnd,
                Accepted: data.Accepted,
                Active: data.Active
            }

            expect(application).toStrictEqual( {
                Id: 4,
                StartDate: '2023-04-10',
                FinalDate: '2023-04-11',
                Accepted: 0,
                Active: 1
            });  
            done();
        } catch(error) {
            done(error);
        }
    }

    daoApplication.getApplication(4, callback);
});
