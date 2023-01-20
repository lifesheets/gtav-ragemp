"use strict"; // Created by ua.lifesheets on 18.01.2023.

require("dotenv").config()
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env;

module.exports = {
    sequelize: null,
    Models: {},
    connect: function () {
        this.sequelize = new Sequelize(env.dbname, env.dbuser, env.dbpass, {
            host: env.dbhost,
            dialect: 'mysql',
            port: env.dpport || 3306,
            logging: env.dbLogging,
            pool: { min: 0, max: 50, acquire: 30000, idle: 10000 },
            dialectOptions: { connectTimeout: 15000 },
            define: { timestamps: false }
        });
        this.loadModels();
    },
    loadModels: function () {
        console.log("[INFO] Завантаження моделей бази даних..");
        // Загрузка моделей для модулей
        fs.readdirSync(path.dirname(__dirname) + '\\features\\').forEach(catalog => {
            if (fs.existsSync(path.dirname(__dirname) + '\\features\\' + catalog + '/db')) {
                fs.readdirSync(path.dirname(__dirname) + '\\features\\' + catalog + '/db').forEach(file => {
                    let model = require(path.dirname(__dirname) + '\\features\\' + catalog + '/db/' + file)(this.sequelize, Sequelize.DataTypes)
                    this.Models[model.name] = model;
                });
            }
        })
        for (var name in this.Models) {
            var model = this.Models[name];
            if (model.associate) {
                model.associate(this.Models);
            }
        }
        this.sequelize.sync();
        console.log("[DONE] Підключення до бази даних вдалося.");
    }
};