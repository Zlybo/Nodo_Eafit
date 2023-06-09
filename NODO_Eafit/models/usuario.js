const conexion = require("../conexion");

module.exports = {
    insertar(nombre, email, genero, contraseña) {
        return new Promise((resolve, reject) => {
            conexion.query(`insert into usuarios (nombre, email, genero, contraseña) values (?, ?, ?, ?)`,
                [nombre, email, genero, contraseña], (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
                });
        });
    },
    obtener() {
        return new Promise((resolve, reject) => {
            conexion.query(`select id_usuario, nombre, email, genero, contraseña from usuarios`,
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },
    obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`select id_usuario, nombre, email, genero, contraseña from usuarios where id_usuario = ?`,
                [id],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados[0]);
                });
        });
    },
    actualizar(id, nombre, email, genero, contraseña) {
        return new Promise((resolve, reject) => {
            conexion.query(`update usuarios
            set nombre = ?,
            email = ?,
            genero = ?,
            contraseña = ?
            where id_usuario = ?`,
                [nombre, email, genero, contraseña, id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
    eliminar(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`delete from usuarios
            where id_usuario = ?`,
                [id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
}