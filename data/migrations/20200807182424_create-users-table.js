
exports.up = (knex) => (
  knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.text('username', 128)
        .unique()
        .notNullable();
      tbl.text('password')
        .notNullable();
    })
);

exports.down = (knex) => (
  knex.schema
    .dropTableIfExists('users')
);
