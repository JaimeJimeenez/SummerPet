'use strict'

// File's modules
const config = require('../config');
const DAOUser = require('../DAOs/DAOUser');

// Package's modules
const express = require('express');
const mysql = require('mysql');

const pool = mysql.createPool(config.mysqlConfig);
const router = express.Router();

// DAO's instances
const daoUser = new DAOUser(pool);

// ---------------------
router.get('/', (request, response, next) => {
    response.render('index');
});

router.get('/searchKeyword', (request, response) => {
    daoUser.searchByKeyWord(request.query.keyword, (err, users) => {
        if (err) console.log(err);
        else response.render('search', { usuarios : users });
    });
});

module.exports = { router, pool };