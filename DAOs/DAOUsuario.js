'use strict'

class DAOUsuario {

    constructor(pool) { this.pool = pool; }

    searchByKeyWord(keyWord, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('No se pudo conectar a la base de datos: ' + err.message));
            else {
                const sql = 'SELECT * FROM user Where instr(name, ?) or instr(phone, ?) or instr(email, ?) or instr(direction, ?) > 0;';

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