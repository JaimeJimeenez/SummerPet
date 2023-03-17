'use strict'
const fs = require('fs');

module.exports = {

    mysqlConfig :{
        host: 'summerpet.mysql.database.azure.com',
        user: 'SMPT',
        password: 'SummerPet2023',
        database: 'summerpet',
        port: 3306,
        ssl: {ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")}
    },
    
    port: 3000
}