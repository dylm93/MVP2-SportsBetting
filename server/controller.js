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
        const { amount, team, betId } = req.body
        console.log(req.body)
        db.Users.findOne({where: {username: req.session.username}})
        .then(data => db.Bets.create ( {amount: amount, team: team, betId: data.dataValues.id})
        .then(data => res.status(201).send(data))
        .catch((err) => console.error(err)))
    },
    getOdds: (req, res) => {
        const apiKey = '3cd18c6687e9c299e11e016996cddf1c'
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
                    gamesArr.push(`'` + key + `'` + '=' + `'` + games[key] + `'`);
                }
            }   
            res.send(gamesArr)
        }
    })
}

if (req.query.region === 'us') {

    console.log('basketballlll')

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
                    if (body['data'][i]['sites'][j]['site_key'] === 'mybookieag') {
                        console.log('game', body['data'][i]['teams'], body['data'][i]['sites'][j])
                    }
                 if (!games[body['data'][i]['teams']]) {
                    if (body['data'][i]['sites'][j]['site_key'] === 'mybookieag') {
                        games[body['data'][i]['teams']] = body['data'][i]['sites'][j]['odds']['h2h']
                    }
                } else {
                    if (body['data'][i]['sites'][j]['site_key'] === 'mybookieag') {
                        games[body['data'][i]['teams']] = body['data'][i]['sites'][j]['odds']['h2h']
                    }
                }
            
            }
        }

        
        for (var key in games) {
            if (games.hasOwnProperty(key)) {
                gamesArr.push(`'` + key + `'` + '=' + `'` + games[key] + `'`);
            }
        }   
        res.send(gamesArr)
        
        }
      })
    } 
    },

    getScores: (req, res) => {
    //     const apiKey = '191575b9-e3e7-425f-90ee-598e94'
    //   let options = {
    //     headers:  `Authorization": "Basic " + btoa(${apiKey} + ":" + MYSPORTSFEEDS)`,
    //     url: `https://api.mysportsfeeds.com/v2.0/pull/nba/2018-2019-regular/date/20181017/games.json`,
    //     dataType: 'json',
    //     type: 'GET'
    //   }

    //   request (options, (err, result, data)=> {
    //     if (err) {
    //         console.error(err)
    //     } else {
    //         console.log(data)
    //     }
    // })
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
    }
            
        

    }

module.exports = controller;

   

    
    
   