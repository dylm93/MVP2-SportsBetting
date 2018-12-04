const Sequelize = require ('sequelize');
const {postgres} = require ('./index.js');

const Bets = postgres.define(
    'bets',
 {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    amount: {type: Sequelize.INTEGER},
    team: {type: Sequelize.STRING}
},
{
    timestamps: false
}
)

const Users = postgres.define(
    'users', 
{   id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING},
    balance: {type: Sequelize.INTEGER}
}
)

Users.sync()
    .then(() => console.log('Data created'))
    .catch(err => console.error(err));


Bets.sync()
    .then(() => console.log('Data created'))
    .catch(err => console.error(err));


module.exports = { Users, Bets };
