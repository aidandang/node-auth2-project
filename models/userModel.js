const db = require('../data/db-config');

module.exports = {
  find,
  findBy,
  add
}

function find() {
  return db('users').select('id', 'username');
}

function findBy(username) {
  return db('users').where({ username }).first();
}

function add(user) {
  return db('users').insert(user);
}