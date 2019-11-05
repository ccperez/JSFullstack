
exports.up = (knex, Promise) => {
  return knex.schema.createTable('contacts', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('subject').notNullable();
    table.string('message').notNullable();
    table.timestamps();
  });
};

exports.down = (knex, Promise) =>
  knex.schema.dropTable('contacts');
