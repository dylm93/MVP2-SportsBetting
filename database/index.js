const mysql = require('mysql');
const seq = require ('sequelize');
const postgres = require('pg');

const connectionPostgres = new seq('bets', 'dylanmccarthy', 'g', {
  host: 'localhost',
  dialect: 'postgres'
});

connectionPostgres
  .authenticate()
  .then(() => console.log('connect to postgres!'))
  .catch(err => console.error(err));

module.exports.postgres = connectionPostgres;
