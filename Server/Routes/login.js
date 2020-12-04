const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../Models/usuario');
const app = express();
const _ = require('underscore');

// El login puede ser por medio de un GET o un POST
app.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email, estado: true }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento del logeo',
                err
            });
        }

        if (!usrDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Email incorrecto o inexistente, intentelo de nuevo'
            });
        }

        if (!bcrypt.compareSync(body.password, usrDB.password)) {
            return res.status(401).json({
                ok: false,
                msg: 'Contraseña incorrecta, intentelo de nuevo',
                err
            });
        }

        res.json({
            ok: true,
            msg: `Bienvenido ${usrDB.nombre}`,
            usrDB
        })
    });
});

module.exports = app;