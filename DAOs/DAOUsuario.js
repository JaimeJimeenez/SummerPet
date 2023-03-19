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
                    else callback(null, user[0]);
                });
            }
        });
    }

    enviarImagen(imagen, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexion a la base de datos: ' + err.message));
            else {
                const sql = 'update User set Image = ? where Id = 1';

                connection.query(sql, [imagen], (err) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null);
                });
            }
        });
    }

    getImage(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'SELECT Image FROM User WHERE Id = ?;';

                connection.query(sql, [id], (err, user) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else if (user.length === 0) callback(new Error('No existe'));
                    else callback(null, user[0].Image);
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