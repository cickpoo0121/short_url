require("dotenv").config();
const mysql = require("mysql2/promise");
// const mysql = require("mysql2");



let pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});



module.exports = pool;
