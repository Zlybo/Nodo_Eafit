const conexion = require("../conexion");

module.exports = {
    insertar(nombre, email, genero, contraseña) {
        return new Promise((resolve, reject) => {
            conexion.query(`insert into productos (nombre, email, genero, contraseña) values (?, ?, ?, ?)`,
                [nombre, email, genero, contraseña], (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
                });
        });
    },
    obtener() {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, nombre, email, genero, contraseña from productos`,
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },
    obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, nombre, email, genero, contraseña from productos where id = ?`,
                [id],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados[0]);
                });
        });
    },
    actualizar(id, nombre, email, genero, contraseña) {
        return new Promise((resolve, reject) => {
            conexion.query(`update productos
            set nombre = ?,
            email = ?,
            genero = ?,
            contraseña = ?
            where id = ?`,
                [nombre, email, genero, contraseña, id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
    eliminar(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`delete from productos
            where id = ?`,
                [id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
}