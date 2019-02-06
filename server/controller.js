const db = require ('../database/models');
const pg = require ('pg');
const express = require ('express');
const request = require ('request');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');


const controller = {
    get: (req, res) => {
        db.Users.findOne({where: {username: req.session.username}})
        .then(data=> db.Bets.findAll({where: {betId: data.dataValues.id}}))
            .then(betdata=>res.send(betdata))
    },
    post: (req, res) => {
        const {gameid, amount, team, betId } = req.body
        db.Users.findOne({where: {username: req.session.username}})
        .then(data => db.Bets.create ( {gameid: gameid, amount: amount, team: team, betId: data.dataValues.id})
        .then(data => res.status(201).send(data))
        .catch((err) => console.error(err)))
    },
    delete: (req, res) => {
        var winners = req.query.winners;
        var gameIdArr = [];
        var teamArr = [];
        for (var i = 0 ; i < winners.length; i++) {
            var winner = JSON.parse(winners[i])
            console.log('winner', winner)
            gameIdArr.push(winner['gameid'])
            teamArr.push(winner['team'])
        }
        console.log(gameIdArr)
        console.log(teamArr)
            db.Users.findOne({where: {username: req.session.username}})
                .then(data=> db.Bets.destroy({where: {gameid: gameIdArr, team: teamArr, betId: data.dataValues.id}}))
                    .catch(err=>console.error(err))
        
    },
    getOdds: (req, res) => {
        const apiKey = '81215997a392f158ad5ac55cd1e977e9'
      let options = {
        url: `https://api.the-odds-api.com/v3/odds?sport=${req.query.sport}&region=${req.query.region}&mkt=h2h&apiKey=${apiKey}`,
        dataType: 'json',
        type: 'GET'
      }

      if (req.query.region === 'uk') {
        request (options, (err, result, data)=> {
            if (err) {
                console.error(err)
            } else {
                var body = JSON.parse(data)
                
                var games = {}
                var teams = [];
                var gamesArr = [];
               
                for (var i = 0; i < body.data.length; i++) {
                    for (var j = 0; j < body['data'][i]['sites'].length; j++) {
                        if (body['data'][i]['sites'][j]['site_key'] === 'skybet') {
                            console.log('game', body['data'][i]['teams'], body['data'][i]['sites'][j]['odds']['h2h'])
                        }
                     if (!games[body['data'][i]['teams']]) {
                        if (body['data'][i]['sites'][j]['site_key'] === 'skybet') {
                            games[body['data'][i]['teams']] = body['data'][i]['sites'][j]['odds']['h2h']
                        }
                    } else {
                        if (body['data'][i]['sites'][j]['site_key'] === 'skybet') {
                            games[body['data'][i]['teams']] = body['data'][i]['sites'][j]['odds']['h2h']
                        }
                    }
                
                }
            }
            for (var key in games) {
                if (games.hasOwnProperty(key)) {
                    var count = 1;
                    gamesArr.push(`'` + key + `'` + '=' + `'` + games[key] + `'` + count);
                    count++;
                }
            }   
            res.send(gamesArr)
        }
    })
}

if (req.query.region === 'us') {

      request (options, (err, result, data)=> {
        if (err) {
            console.error(err)
        } else {
            var body = JSON.parse(data)
            
            var games = {}
            var gamesArr = [];
            var count = 1;
            for (var i = 0; i < body.data.length; i++) {
                for (var j = 0; j < body['data'][i]['sites'].length; j++) {
                    if (body['data'][i]['sites'][j]['site_key'] === 'mybookieag') {
                        console.log('game', body['data'][i]['teams'], body['data'][i]['sites'][j])
                    }
                 if (!games[body['data'][i]['teams']]) {
                    if (body['data'][i]['sites'][j]['site_key'] === 'mybookieag') {
                        games[body['data'][i]['teams']] = body['data'][i]['sites'][j]['odds']['h2h'] + `'` + count + `'`
                    }
                } else {
                    if (body['data'][i]['sites'][j]['site_key'] === 'mybookieag') {
                        games[body['data'][i]['teams']] = body['data'][i]['sites'][j]['odds']['h2h'] + `'` + count + `'`
                    }
                }
            }
            count = count + 1
        }

        
        for (var key in games) {
            if (games.hasOwnProperty(key)) {
                gamesArr.push(`'` + key + `'` + '=' + `'` + games[key]);
            }
        }   
        res.send(gamesArr)
        
        }
      })
    } 
    },
    signUp: (req, res) => {
        
        var username = req.body.username;
        var password = req.body.password;

        db.Users.findOne({where: {username: username}}).then(function (user) {
            if (user) {
                console.log('errrrr')
            } else {
        bcrypt.hash(password, null, null, function (err, hash) {
            if (err) {
              console.log('password not strong enough' + err)
            } else {
              console.log('hashed password', hash)
            var template = {username: username, password: hash, balance: 500}
                db.Users.create(template)
                .then (function (newUser) {
                    req.session.username = username;   
                    res.send(201) 
                })
            }
        })
    }
    })
    },

    getUserId: (req, res) => {
        db.Users.findOne({where: {username: req.session.username}})
        .then(data=>res.send(data))
    },

    login: (req, res) => {
        var username = req.body.username;
        var password = req.body.password;

        db.Users.findOne({where: {username: username}}).then(function (user) {
            if (!user) {
                console.log(`User doesn't exist`)
            } else if(user.username === username && bcrypt.compareSync(password, user.password)){
                    console.log('success')
                    req.session.username = user.username;
                    res.send(201)
                }
            }) 
    },
    
    getBalance: (req, res) => {
        db.Users.findOne({where: {username: req.session.username}})
        .then(data=>res.send(data))

    },
    placeBet: (req, res) => {
        console.log(req.body)
        db.Users.update({balance: req.body.money}, {where: {username: req.session.username}})
        res.send(201)
    },
    postWinners: (req, res) => {
        db.Winners.create({winners: req.body.winners})
            .then(winners => {
                console.log(winners)
                res.send(201)
            })
    },
    getWinners: (req, res) => {
        db.Winners.findAll({})
            .then(data=>res.send(data))
    },
    compareWinners: (req, res) => {
        var winner = req.query.winners;
        var gameID = [];
        var team = [];
        for (var i = 0; i < winner.length; i++) {
            eachWinner = JSON.parse(winner[i]);
            eachWinnerSplit = eachWinner.winners.split(',');
            console.log(eachWinnerSplit)
            for (var j = 0; j < eachWinnerSplit.length; j++) {
                gameID.push(eachWinnerSplit[j].split(':')[0])
                team.push(eachWinnerSplit[j].split(': ')[1])
        }
        console.log(team)
        console.log(gameID)
    }  
           
        db.Users.findOne({where: {username: req.session.username}})
            .then(data=> db.Bets.findAll({where: {gameid: gameID, team: team, betId: data.dataValues.id}}))
                .then(betdata=>res.status(200).send(betdata))
                    .catch(err=>console.error(err)) 
                
    }
    }

module.exports = controller;

   

    
    
   