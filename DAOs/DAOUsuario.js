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
                const sql = 'update User set Photo = ? where Id = 1;';

                connection.query(sql, [imagen], (err, result) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else this.insertUserPhoto(1, result.insertId, (err) => {
                        if (err) callback(err);
                        else callback(null);
                    });
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

    havePhotosLocation(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Select count(*) from UserPhotos where idUser = ?;';

                connection.query(sql, [id], (err, numPhotos) => {
                    connection.release();
                    if (err) new Error('Error de acceso a la base de dato: ' + err.message);
                    else if (numPhotos[0]['count(*)'] === 0) callback(null, false);
                    else callback(null, true);
                });
            }
        });
    }

    getPhotosLocation(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Select User.Id, Name, Direction, UserPhotos.IdPhoto, User.Photo from User JOIN UserPhotos ON User.Id = UserPhotos.IdUser JOIN PhotosLocation ON PhotosLocation.Id = UserPhotos.IdPhoto where User.Id = ?;';

                connection.query(sql, [id], (err, photos) => {
                    connection.release();
                    if (err) new Error('Error de acceso a la base de datos: ' + err.message);
                    else callback(null, photos);
                });
            }
        });
    }

    getSpecialties(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Select User.Id, User.Name, Direction, User.Photo, Breed.Name, Size from User JOIN UserDogBreed ON UserDogBreed.IdUser = User.Id JOIN Breed ON Breed.Id = UserDogBreed.IdDogBreed JOIN UserDogSize ON UserDogSize.IdUser = User.Id JOIN DogSize ON UserDogSize.IdDogSize = DogSize.Id where User.Id = ?;';

                connection.query(sql, [id], (err, specialties) => {
                    connection.release();
                    console.log(specialties);
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null, specialties[0]);
                });
            }
        });
    }

    insertUserPhoto(idUser, idPhoto, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Insert into UserPhotos values (?, ?);';

                connection.query(sql, [idUser, idPhoto], (err) => {
                    connection.release();
                    if (err) callback(new Error('No se pudo acceder a la base de datos: ' + err.message));
                    else callback(null);
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