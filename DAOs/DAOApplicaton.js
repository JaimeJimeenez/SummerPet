'use strict'

class DAOApplication {
    
    constructor(pool) { this.pool = pool; }

    newApplication(id, startDate, endDate, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Insert into Application (StartDate, FinalDate, Accepted) values (?, ?, 0);';

                connection.query(sql, [startDate, endDate], (err, result) => {
                    connection.release();
                    console.log(result);
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else this.insertUserApplication(2, id, result.insertId, (err) => {
                        if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                        else callback(null);
                    });
                });
            }
        });
    }

    insertUserApplication(idOwner, idDogWatcher, idApplication, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Insert into UserApplication values (?, ?, ?);';

                connection.query(sql, [idOwner, idDogWatcher, idApplication], (err) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null);
                });
            }
        });
    }
}

module.exports = DAOApplication;