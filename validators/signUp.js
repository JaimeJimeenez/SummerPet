'use strict'

// Package's Modules
const { check, validationResult} = require('express-validator');

const validateSignUp = [
    check('username', 'Nombre incorrecto').isLength( { min: 1, max: 20 }),
    check('password', 'Contraseña no válida').isLength( { min : 8, max : 20 }),
    check('email', 'Correo no válido').isEmail()
];

const validationMiddleware = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) response.render('signUp', { errors : errors.mapped() });
    next();
};

module.exports = { validateSignUp, validationMiddleware };