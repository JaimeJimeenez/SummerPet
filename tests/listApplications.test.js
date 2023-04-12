'use strict'

const mysql = require('mysql');
const config = require('../config');

const DAOApplication = require('../DAOs/DAOApplication');

const pool = mysql.createPool(config.mysqlConfig);
const daoApplication = new DAOApplication(pool);

test('List none applications', done => {
    function callback1(error, data) {
        if (error) {
            done(error);
            return;
        }
        try {

            done();
        } catch(error) {
            done(error);
        }
    }

    daoApplication.listApplications(3, callback1);
});

test('List applications', done => {
    function callback1(error, data) {
        if (error) {
            done(error);
            return;
        }
        try {
            let result = [];
            console.log(data);

            data.forEach((application) => {
                let elem = {
                    Id: application.Id,
                    Name: application.Name,
                    Direction: application.Direction,
                };

                let startDate = application.StartDate; 
                let endDate = application.FinalDate;

                let year = startDate.getFullYear();
                let month = (startDate.getMonth() + 1).toString().padStart(2, '0'); 
                let day = (startDate.getDate()).toString().padStart(2, '0');

                let formattedStart = `${year}-${month}-${day}`;
            
                year = endDate.getFullYear();
                month = (endDate.getMonth() + 1).toString().padStart(2, '0'); 
                day = (endDate.getDate()).toString().padStart(2, '0');
            
                let formattedEnd = `${year}-${month}-${day}`;
                
                elem.StartDate = formattedStart;
                elem.FinalDate = formattedEnd;

                result.push(elem);
            });
            
            expect(result).toStrictEqual([
                {
                    Id: 4,
                    Name: 'Maria',
                    Direction: 'Madrid',
                    StartDate: '2023-04-10',
                    FinalDate: '2023-04-11',
                }
            ]);  

            done();
        } catch(error) {
            done(error);
        }
    }

    daoApplication.listApplications(5, callback1);
});
