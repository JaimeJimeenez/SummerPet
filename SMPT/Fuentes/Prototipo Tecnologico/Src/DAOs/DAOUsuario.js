'use strict'

class DAOUsuario {

    constructor(pool) { this.pool = pool; }

    searchCuidadorByKeyWord(keyWord, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('No se pudo conectar a la base de datos: ' + err.message));
            else {
                const sql = 'SELECT * FROM Usuario Where instr(Nombre, ?) or instr(Telefono, ?) or instr(Email, ?) or instr(Direccion, ?) > 0;';

                connection.query(sql, [keyWord], (err, rows) => {
                    connection.release();
                    if (err) callback(new Error('No se pudo acceder a la base de datos: ' + err.message));
                    else callback(null, rows);
                });
            }
        });
    }
}