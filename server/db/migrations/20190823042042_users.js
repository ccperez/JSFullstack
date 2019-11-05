exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('email').notNullable().unique();
    table.string('password_hash').notNullable();
    table.string('confirmation_token');
    table.boolean('confirmed').defaultTo(false);
    table.timestamps();
  });
};

exports.down = (knex, Promise) => knex.schema.dropTable('users');
