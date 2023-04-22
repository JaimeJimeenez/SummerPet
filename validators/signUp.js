'use strict'

// Package's Modules
const { check, validationResult} = require('express-validator');

const validateSignUp = [
    check('username', 'Nombre incorrecto').isLength( { min: 1, max: 20 }),
    check('password', 'Contraseña no válida').isLength( { min : 8, max : 20 }),
    check('email', 'Correo no válido').isEmail(),
    check('phone', 'Introduce un telefono').notEmpty()
];

const validationMiddleware = (request, response, next) => {
    const errors = validationResult(request);
    console.log(errors);
    if (!errors.isEmpty()) response.render('signUp', { errors : errors.mapped(), exists : false });
    else next();
};

module.exports = { validateSignUp, validationMiddleware };