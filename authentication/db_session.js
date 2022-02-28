const session = require('express-session');
const db = require('../db_config/db');

const MysqlStore = require('express-mysql-session')(session)

const options = {
    host : db.HOST,
    port : db.PORT,
    user : db.USER,
    password : db.PASSWORD,
    database : db.DB
}

let sessionStore = new MysqlStore(options);

module.exports = {sessionStore}