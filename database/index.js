const mysql = require('mysql');
const seq = require ('sequelize');
const postgres = require('pg');

const connectionPostgres = new seq('bets', 'dylanmccarthy', 'g', {
  host: 'ec2-35-174-4-106.compute-1.amazonaws.com',
  dialect: 'postgres'
});

connectionPostgres
  .authenticate()
  .then(() => console.log('connect to postgres!'))
  .catch(err => console.error(err));

module.exports.postgres = connectionPostgres;
