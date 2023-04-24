'use strict'

class DAOApplication {
    
    constructor(pool) { this.pool = pool; }

    newApplication(id, startDate, endDate, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Insert into Application (StartDate, FinalDate, Accepted, Active) values (?, ?, 0, 1);';

                connection.query(sql, [startDate, endDate], (err, result) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else this.insertUserApplication(2, id, result.insertId, (err) => {
                        if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                        else callback(null, true);
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

    getApplicationsByOwner(idOwner, idDogWatcher, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Select * from Application join UserApplication on IdOwner = ? and IdDogWatcher = ? and IdApplication = Id where Accepted = 1 and FinalDate <= NOW() and Active = 1;';

                connection.query(sql, [idOwner, idDogWatcher], (err, applications) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null, applications);
                });
            }
        });
    }
    
    listApplications(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'select Name, Direction, a.Id, a.StartDate, a.FinalDate from user join userapplication on IdOwner=Id AND IdDogWatcher=? join application a on a.Id = IdApplication and Accepted = 0 and a.Active = 1 order by a.StartDate ASC';
                
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

    declineApplication(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Update Application set Accepted = 0 where Id = ?;';

                connection.query(sql, [id], (err) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null);
                });
            }
        });
    }

    hasAcceptedApplication(idOwner, idDogWatcher, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                console.log(idOwner);
                console.log(idDogWatcher);
                const sql = 'Select count(*) from Application join UserApplication on IdOwner = ? and IdDogWatcher = ? and IdApplication = Id where Accepted = 1 and FinalDate > NOW() and Active = 1;';

                connection.query(sql, [idOwner, idDogWatcher], (err, result) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else if (result[0]['count(*)'] === 0) callback(null, false);
                    else callback(null, true);
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