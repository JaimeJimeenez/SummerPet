'use strict'

// File's modules
const config = require('../config');
const DAOUser = require('../DAOs/DAOUser');

// Package's modules
const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const moment = require('moment');

const multerFactory = multer({storage : multer.memoryStorage() });
const router = express.Router();
const pool = mysql.createPool(config.mysqlConfig);

// DAO's instances
const daoUser = new DAOUser(pool);

// --------------------------


module.exports = { router, pool };