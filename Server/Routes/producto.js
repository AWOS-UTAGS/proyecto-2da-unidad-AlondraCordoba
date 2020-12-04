const express = require('express');
const _ = require('underscore');
const app = express();
const Productos = require('../Models/producto');

app.get('/productos', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 0;

    Productos.find({})
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('usuario', 'nombre')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al consultar los productos',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Lista de producos obtenida con éxito',
                conteo: productos.length,
                productos
            });
        });
});

app.post('/productos', (req, res) => {
    let body = req.body;
    let pro = new Productos({
        nombre: body.nombre,
        precioU: body.precioU,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: body.usuario

    });
    pro.save((err, proDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un producto',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Producto insertado con éxito',
            proDB
        })
    });
});

app.put('/productos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioU', 'categoria', 'disponible', 'usuario']);

    Productos.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, proDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de actualizar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'El producto fue actualizado con éxito',
            proDB
        });
    });
});
app.delete('/productos/:id', (req, res) => {
    let id = req.params.id

    Productos.findByIdAndRemove(id, { context: 'query' }, (err, proDB) => {
        if (err) {
            return res.json({
                ok: false,
                msg: 'Ocurrio uyn errror al momento de eliminar',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Producto fue eliminado con éxito',
            proDB
        })
    });
});

module.exports = app;