module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,       // Update to use POSTGRES_HOST
      user: process.env.POSTGRES_USER,       // Update to use POSTGRES_USER
      password: process.env.POSTGRES_PASSWORD, // Update to use POSTGRES_PASSWORD
      database: process.env.POSTGRES_DATABASE, // Update to use POSTGRES_DATABASE
      port: process.env.POSTGRES_PORT || 5432,         // If provided by Vercel, update to use POSTGRES_PORT
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};




// module.exports = {
//   development: {
//     client: "pg",
//     connection: {
//       host: process.env.HOST,
//       user: process.env.USERNAME,
//       password: process.env.PASSWORD,
//       database: "todoapp", // Specify your database name here
//       port: process.env.DBPORT,
//     },
//     migrations: {
//       directory: "./db/migrations",
//     },
//     seeds: {
//       directory: "./db/seeds",
//     },
//   },
// };
