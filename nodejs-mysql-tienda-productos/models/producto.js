const conexion = require("../conexion");

module.exports = {
    insertar(nombre, email, contraseña) {
        return new Promise((resolve, reject) => {
            conexion.query(`insert into productos (nombre, email, contraseña) values (?, ?, ?)`,
                [nombre, email, contraseña], (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
                });
        });
    },
    obtener() {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, nombre, email, contraseña from productos`,
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },
    obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, nombre, email, contraseña from productos where id = ?`,
                [id],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados[0]);
                });
        });
    },
    actualizar(id, nombre, email, contraseña) {
        return new Promise((resolve, reject) => {
            conexion.query(`update productos
            set nombre = ?,
            email = ?
            contraseña = ?
            where id = ?`,
                [nombre, email, contraseña, id],
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