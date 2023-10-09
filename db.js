const knex = require("knex");
const knexConfig = require("./knexfile"); // Adjust the path as needed

const db = knex(knexConfig.development);

module.exports = db;

// //this was for the normal pg way, not with knex:
// const Pool = require("pg").Pool;

// require("dotenv").config();

// const pool = new Pool({
//   user: process.env.USERNAME,
//   password: process.env.PASSWORD,
//   host: process.env.HOST,
//   port: process.env.DBPORT,
//   database: "todoapp",
// });

// module.exports = pool;
