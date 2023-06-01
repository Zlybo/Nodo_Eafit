const express = require('express');
const router = express.Router();

const productoModel = require("../models/usuario");

router.get('/', function (req, res, next) {
    productoModel
        .obtener()
        .then(productos => {
            res.render("usuarios/ver", {
                productos: productos,
            });
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo usuarios");
        });

});
router.get('/agregar', function (req, res, next) {
    res.render("usuarios/agregar");
});
router.post('/insertar', function (req, res, next) {
    // Obtener el nombre y precio. Es lo mismo que
    // const nombre = req.body.nombre;
    // const precio = req.body.precio;
    const { nombre, email, genero, contraseña} = req.body;
    if (!nombre || !email || !genero || !contraseña) {
        return res.status(500).send("No hay ningun dato");
    }
    // Si todo va bien, seguimos
    productoModel
        .insertar(nombre, email, genero, contraseña)
        .then(idProductoInsertado => {
            res.redirect("/usuarios");
        })
        .catch(err => {
            return res.status(500).send("Error insertando usuario");
        });
});
router.get('/eliminar/:id', function (req, res, next) {
    productoModel
        .eliminar(req.params.id)
        .then(() => {
            res.redirect("/usuarios");
        })
        .catch(err => {
            return res.status(500).send("Error eliminando");
        });
});
router.get('/editar/:id', function (req, res, next) {
    productoModel
        .obtenerPorId(req.params.id)
        .then(producto => {
            if (producto) {
                res.render("usuarios/editar", {
                    producto: producto,
                });
            } else {
                return res.status(500).send("No existe usuario con ese id");
            }
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo usuario");
        });
});
router.post('/actualizar/', function (req, res, next) {
    // Obtener el nombre y precio. Es lo mismo que
    // const nombre = req.body.nombre;
    // const precio = req.body.precio;
    const { id, nombre, email, genero, contraseña } = req.body;
    if (!nombre || !email || !genero || !contraseña || !id) {
        return res.status(500).send("No hay suficientes datos");
    }
    // Si todo va bien, seguimos
    productoModel
        .actualizar(id, nombre, email, genero, contraseña)
        .then(() => {
            res.redirect("/usuarios");
        })
        .catch(err => {
            return res.status(500).send("Error actualizando usuario");
        });
});

module.exports = router;
