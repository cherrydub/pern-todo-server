require("dotenv").config();

// module.exports = {
//   development: {
//     client: "pg",
//     connection: {
//       host: process.env.POSTGRES_HOST, // Update to use POSTGRES_HOST
//       user: process.env.POSTGRES_USER, // Update to use POSTGRES_USER
//       password: process.env.POSTGRES_PASSWORD, // Update to use POSTGRES_PASSWORD
//       database: process.env.POSTGRES_DATABASE, // Update to use POSTGRES_DATABASE
//       port: 5432, // If provided by Vercel, update to use POSTGRES_PORT
//     },
//     migrations: {
//       directory: "./db/migrations",
//     },
//     seeds: {
//       directory: "./db/seeds",
//     },
//   },
// };

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      port: process.env.PG_PORT,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
