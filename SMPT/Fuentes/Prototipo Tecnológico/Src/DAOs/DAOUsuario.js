'use strict'

class DAOUsuario {

    constructor(pool) { this.pool = pool; }

    getCuidadores(callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback( new Error('No se ha podido establecer conexion con la base de datos') );
            else {
                const sql = 'Select * From Usuario';

                connection.query(sql, [], (err, rows) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null, rows);
                });
            }
        });
    }
};

module.exports = DAOUsuario;