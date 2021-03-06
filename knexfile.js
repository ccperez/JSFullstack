require('dotenv').config();

const { NODE_ENV, DATABASE_URL } = process.env

module.exports[NODE_ENV] = {
  client: 'pg',
  connection: DATABASE_URL,
  migrations: {
    tableName: 'knex_migrations',
    directory: __dirname + '/server/db/migrations'
  }
};
