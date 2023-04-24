'use strict'
const fs = require('fs');

module.exports = {

    /*mysqlConfig :{
        host: 'summerpet.mysql.database.azure.com',
        user: 'SummerPet2023',
        password: 'SMPT2023!',
        database: 'summerpet',
        port: 3306,
        ssl: {
            rejectUnauthorized: true,
            ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem", 'utf-8')
        }
    },*/

    mysqlConfig : {
        host: 'summerpet.mysql.database.azure.com',
        user: 'SummerPet2023',
        password: 'SMPT2023!',
        database: 'SummerPet',
        port: 3306,
        ssl: {
            ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem", 'utf-8')
        }
    },

    /*
    mysqlConfig : {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'SummerPet'
    },*/
    
    port: 3000
}