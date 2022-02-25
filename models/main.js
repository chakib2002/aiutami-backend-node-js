const db = require('../db_config/db');
const Sequelize = require("sequelize");

const sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD , {
    host :db.HOST,
    dialect : db.dialect,
    pool: {
        max: db.pool.max ,
        min: db.pool.min,
        acquire: db.pool.acquire,
        idle: db.pool.idle
      }

})

module.exports = sequelize;