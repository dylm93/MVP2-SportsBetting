const Sequelize = require ('sequelize');
const {postgres} = require ('./index.js');

const Bets = postgres.define(
    'bets',
 {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    gameid: {type: Sequelize.STRING},
    amount: {type: Sequelize.INTEGER},
    team: {type: Sequelize.STRING},
},
{
    timestamps: false
}
)

// will add a userid to each bet

const Users = postgres.define(
    'users', 
{   id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING},
    balance: {type: Sequelize.INTEGER}
},
{
    timestamps: false 
}
)

const Winners = postgres.define(
    'winners',
    {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        winners: {type: Sequelize.STRING}
    }
)

Users.hasMany(Bets, { as: 'Bets', foreignKey: 'betId'} );
Bets.belongsTo(Users, {foreignKey: 'betId'})

Users.sync()
    .then(() => console.log('Users created'))
    .catch(err => console.error(err));

Bets.sync()
    .then(() => console.log('Bets created'))
    .catch(err => console.error(err));

Winners.sync()
    .then(() => console.log('Winners created'))
    .catch(err => console.error(err));


module.exports = { Users, Bets, Winners };
