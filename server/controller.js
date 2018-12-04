const db = require ('../database/models');
const pg = require ('pg');
const express = require ('express');
const request = require ('request');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');


const controller = {
    get: (req, res) => {
        db.Bets.findAll({})
            .then(data=>res.send(data))
    },
    post: (req, res) => {
        const { amount, team } = req.body
        console.log(req.body)
        db.Bets.create ( {amount: amount, team: team})
            .then(data => res.status(201).send(data))
            .catch((err) => console.error(err))
    },
    getOdds: (req, res) => {
        var sport = 'americanfootball_nfl'
        const apiKey = '3cd18c6687e9c299e11e016996cddf1c'
      let options = {
        url: `https://api.the-odds-api.com/v3/odds?sport=${sport}&region=us&mkt=h2h&apiKey=${apiKey}`,
        dataType: 'json',
        type: 'GET'
      }

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
                 if (!games[body['data'][i]['teams']]) {
                    games[body['data'][i]['teams']] = body['data'][i]['sites'][j]['odds']['h2h']
                } else {
                    games[body['data'][i]['teams']] = body['data'][i]['sites'][j]['odds']['h2h']
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
    },
    loginPost: (req, res) => {
        
        var username = req.body.username;
        var password = req.body.password;

        var template = {username: username, password: password, balance: 500}

        // bcrypt.hash(password, null, null, function (err, hash) {
        //     if (err) {
        //       console.log('password not strong enough' + err)
        //     } else {
        //       console.log('hashed password')
        db.Users.create(template)
            .then (function (newUser) {
                req.session.username = username;
                res.redirect('/bets')   

            })
    },
    getBalance: (req, res) => {
        db.Users.findOne({where: {username: req.session.username}})
        .then(data=>res.send(data))

    },
    placeBet: (req, res) => {
        console.log(req.body)
        db.Users.findOne({where: {username: req.session.username}})
        .then(user=> {
            user.update({
                balance: req.body.money
            })
        }
        )
    }
            
        

    }

module.exports = controller;

   

    
    
   