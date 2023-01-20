"use strict"; // Created by ua.lifesheets on 01.01.2023.

global.db = require('./sequelize');

try {
    db.connect();
} catch (err) {
    console.log('[ERROR MYSQL CONNECT]', err);
}