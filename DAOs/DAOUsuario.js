'use strict'

class DAOUsuario {

    constructor(pool) { this.pool = pool; }

    getUser(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('No se pudo conectar a la base de datos: ' + err.message));
            else {
                const sql = 'SELECT * FROM User Where Id = ?';

                connection.query(sql, [id], (err, user) => {
                    connection.release();
                    if (err) callback(new Error('No se pudo acceder a la base de datos: ' + err.message));
                    else callback(null, user);
                });
            }
        });
    }

    searchByKeyWord(keyWord, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('No se pudo conectar a la base de datos: ' + err.message));
            else {
                const sql = 'SELECT * FROM User Where instr(Name, ?) or instr(Phone, ?) or instr(Email, ?) or instr(Direction, ?) > 0;';

                connection.query(sql, [keyWord, keyWord, keyWord, keyWord], (err, rows) => {
                    connection.release();
                    if (err) callback(new Error('No se pudo acceder a la base de datos: ' + err.message));
                    else callback(null, rows);
                });
            }
        });
    }
}

module.exports = DAOUsuario;