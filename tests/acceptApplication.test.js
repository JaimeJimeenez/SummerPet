'use strict'

const mysql = require('mysql');
const config = require('../config');

const DAOApplication = require('../DAOs/DAOApplication');

const pool = mysql.createPool(config.mysqlConfig);
const daoApplication = new DAOApplication(pool);

test('Accepted one application', done => {
    function callback1(error, data) {
        if (error) {
            done(error);
            return;
        }
        try {
            function callback2(error, data) {
                if (error) {
                    done(error);
                    return;
                }
                try {
                    expect(data.Accepted).toBe(1);
                    done();
                } catch(error) {
                    done(error);
                }
            }

            daoApplication.getApplication(1, callback2);
            daoApplication.declineApplication(1, () => { done(); });
            done();
        } catch(error) {
            done(error);
        }
    }

    daoApplication.acceptApplication(1, callback1);
    
});
