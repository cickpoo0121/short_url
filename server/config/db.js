require("dotenv").config();
// const mysql = require("mysql2/promise");
const mysql = require("mysql2");

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

// function handleDisconnect() {
//   connection.query("SELECT 1", function (err, rows) {
//     if (err) {
//       // console.error("error connecting: " + err.stack);
//       // console.log("code", err.code);
//       // console.log("fatal", err.fatal);
//       if (err.code === "PROTOCOL_CONNECTION_LOST") {
//         handleDisconnect(); // lost due to either server restart, or a
//       } else {
//         // connnection idle timeout (the wait_timeout
//         throw err; // server variable configures this)
//       }
//       return;
//     }
//     console.log("connected!");
//   });
// }

// handleDisconnect();

// let pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_DATABASE,
//   port: process.env.DB_PORT,
// });

// pool.getConnection().then((promiseConnection) => {
//   var conn = promiseConnection.connection;
//   conn.beginTransaction((err) => {
//     conn.query("select 1+1", () => {
//       conn.commit(() => conn.release());
//     });
//   });
// });

module.exports = connection;
