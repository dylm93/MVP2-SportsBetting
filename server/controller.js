const db = require ('../database/models');
const express = require ('express');
const request = require ('request');

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
    }
    }

module.exports = controller;

   

    
    
   