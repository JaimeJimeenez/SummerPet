'use strict'

class DAOUser {

    constructor(pool) { this.pool = pool; }

    signUp(name, email, password, direction, phone, description, image, isDogWatcher, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('No se pudo conectar a la base de datos: ' + err.message));
            else {
                const sql = 'Insert into User (Name, Email, Photo, Password, Direction, Description, Phone, isDogWatcher, Active) values (?, ?, ?, ?, ?, ?, ?, ?, 1);';

                connection.query(sql, [name, email, image, password, direction, description, phone, isDogWatcher], (err, newUser) => {
                    connection.release();
                    if (err) callback(new Error('No se pudo acceder a la base de datos: ' + err.message));
                    else callback(null, newUser.insertId);
                });
            }
        });
    }

    signIn(email, password, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('No se pudo conectar a la base de datos: ' + err.message));
            else {
                const sql = 'Select * from User where Email = ? and Password = ? and Active = 1;';

                connection.query(sql, [email, password], (err, user) => {
                    connection.release();
                    if (err) callback(new Error('No se pudo acceder a la base de datos: ' + err.message));
                    else callback(null, user[0]);
                });
            }
        });
    }

    getUser(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('No se pudo conectar a la base de datos: ' + err.message));
            else {
                const sql = 'Select *, count(*) from User Where Id = ?';

                connection.query(sql, [id], (err, user) => {
                    connection.release();
                    if (err) callback(new Error('No se pudo acceder a la base de datos: ' + err.message));
                    else callback(null, user[0]);
                });
            }
        });
    }

    userExists(email, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('No se pudo conectar a la base de datos: ' + err.message));
            else {
                const sql = 'Select * from User where Email = ?;';

                connection.query(sql, [email], (err, user) => {
                    connection.release();
                    if (err) callback(new Error('No se pudo acceder a la base de datos: ' + err.message));
                    else callback(null, user.length === 1);
                });
            }
        });
    }

    getPhotos(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Select * from PhotosLocation where IdDogWatcher = ?;';

                connection.query(sql, [id], (err, photos) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null, photos);
                });
            }
        });
    }

    insertPhotoLocation(id, image, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Insert into PhotosLocation (IdDogWatcher, Photo) values (?, ?);';

                connection.query(sql, [id, image], (err) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null);
                });
            }
        });
    }

    getProfilePhoto(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Select Photo from User where Id = ?;';

                connection.query(sql, [id], (err, user) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else if (user.length === 0) callback(new Error('No existe'));
                    else callback(null, user[0].Photo);
                });
            }
        });
    }

    getPhotoLocation(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Select Photo from PhotosLocation where Id = ?;';

                connection.query(sql, [id], (err, photo) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else if (photo.length === 0) callback(new Error('No existe'));
                    else callback(null, photo[0].Photo);
                });
            }
        });
    }

    getDogSizes(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Select Size from DogSize where IdDogWatcher = ?;';

                connection.query(sql, [id], (err, dogSizes) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null, dogSizes);
                });
            }
        });
    }

    getDogBreeds(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Select Name from Breed where IdDogWatcher = ?;';

                connection.query(sql, [id], (err, breeds) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null, breeds);
                });
            }
        });
    }

    searchByKeyWord(keyWord, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('No se pudo conectar a la base de datos: ' + err.message));
            else {
                const sql = 'Select * from User Where (instr(Name, ?) or instr(Direction, ?) > 0) and isDogWatcher = 1 and Active = 1;';

                connection.query(sql, [keyWord, keyWord], (err, rows) => {
                    connection.release();
                    if (err) callback(new Error('No se pudo acceder a la base de datos: ' + err.message));
                    else callback(null, rows);
                });
            }
        });
    }

    insertDisponibility(id, startDate, endDate, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('No se pudo conectar a la base de datos: ' + err.message));
            else {
                const sql = 'Insert into Disponibility (IdDogWatcher, StartDate, EndDate) values (?, ?, ?);';

                connection.query(sql, [id, startDate, endDate], (err) => {
                    connection.release();
                    if (err) callback(new Error('No se pudo acceder a la base de datos: ' + err.message));
                    else callback(null);
                });
            }
        });
    }

    getDisponibility(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Select StartDate, EndDate from Disponibility where IdDogWatcher = ?;';

                connection.query(sql, [id], (err, disponibilities) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null, disponibilities);
                });
            }
        });
    }

    getValorations(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Select IdOwner, IdDogWatcher, Valoration, Valorations.Description, User.Name from Valorations join User on User.Id = IdOwner where IdDogWatcher = ?;';

                connection.query(sql, [id], (err, rows) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null, rows);
                });
            }
        });
    }
}

module.exports = DAOUser;