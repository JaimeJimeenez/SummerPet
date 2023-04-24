'use strict'

class DAOValoration {

    constructor(pool) { this.pool = pool; }

    insertValoration(idOwner, idDogWatcher, valoration, description, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
		        const sql = 'Insert into Valorations (IdOwner, IdDogWatcher, Valoration, Description) values (?, ?, ?,?);';

                connection.query(sql, [idOwner, idDogWatcher, valoration, description], (err) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null, true);
                });
            }
        });
    }

    getValoration(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Select * from Valorations where Id = ?;';

                connection.query(sql, [id], (err, application) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null, application[0]);
                });
            }
        });
    }

    deleteValoration(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Delete from Valorations where Id = ?;';

                connection.query(sql, [id], (err) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null);
                });
            }
        });
    }
}

module.exports = DAOValoration;