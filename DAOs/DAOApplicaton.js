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

    getApplication(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Select * from Application where Id = ?;';

                connection.query(sql, [id], (err, application) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null, application[0]);
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
    
    listApplications(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'select Name, Direction, a.Id, a.StartDate, a.FinalDate from user join userapplication on IdOwner=Id AND IdDogWatcher=? join application a on a.Id = IdApplication order by a.StartDate ASC';
                

                connection.query(sql, [id], (err, rows) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null, rows);
                });
            }
        });
    }

    acceptApplication(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Update Application set Accepted = 1 where Id = ?;';

                connection.query(sql, [id], (err) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null);
                });
            }
        });
    }

    deleteApplication(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Update Application set Active = 0 where Id = ?;';

                connection.query(sql, [id], (err) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null);
                });
            }
        });
    }
}

module.exports = DAOApplication;