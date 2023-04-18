'use strict'

class DAOUser {

    constructor(pool) { this.pool = pool; }

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

    enviarImagen(imagen, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexion a la base de datos: ' + err.message));
            else {
                const sql = 'update User set Photo = ? where Id = 3;';

                connection.query(sql, [imagen], (err, result) => {
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

    // havePhotosLocation(id, callback) {
    //     this.pool.getConnection((err, connection) => {
    //         if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
    //         else {
    //             const sql = 'Select count(*) from UserPhotos where idUser = ?;';

    //             connection.query(sql, [id], (err, numPhotos) => {
    //                 connection.release();
    //                 if (err) new Error('Error de acceso a la base de dato: ' + err.message);
    //                 else if (numPhotos[0]['count(*)'] === 0) callback(null, false);
    //                 else callback(null, true);
    //             });
    //         }
    //     });
    // }
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
                const sql = 'Select IdPhoto from UserPhotos where IdUser = ?';

                connection.query(sql, [id], (err, photos) => {
                    connection.release();
                    if (err) new Error('Error de acceso a la base de datos: ' + err.message);
                    else callback(null, photos);
                });
            }
        });
    }

    getDogSizes(id, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Select Dogsize.Size from User join userdogsize on userdogsize.Iduser = User.Id join dogsize on UserDogSize.IdDogSize = DogSize.Id where User.Id = ?;';

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
                const sql = 'Select Breed.Name from User join userdogbreed on userdogbreed.Iduser = User.Id join Breed on userdogbreed.IdDogBreed = Breed.Id where User.Id = ?;';

                connection.query(sql, [id], (err, breeds) => {
                    connection.release();
                    if (err) callback(new Error('Error de acceso a la base de datos: ' + err.message));
                    else callback(null, breeds);
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

    getUserPhoto(idUser,callback){
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('Error de conexión a la base de datos: ' + err.message));
            else {
                const sql = 'Select Photo1 from photoslocation Where id = ?';

            }
        });
    }

    searchByKeyWord(keyWord, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error('No se pudo conectar a la base de datos: ' + err.message));
            else {
                const sql = 'Select * from User Where (instr(Name, ?) or instr(Direction, ?) > 0) and isDogWatcher = 1;';

                connection.query(sql, [keyWord, keyWord, keyWord, keyWord], (err, rows) => {
                    connection.release();
                    if (err) callback(new Error('No se pudo acceder a la base de datos: ' + err.message));
                    else callback(null, rows);
                });
            }
        });
    }
}

module.exports = DAOUser;