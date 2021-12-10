const express = require("express");
const DiscordOauth2 = require("discord-oauth2");
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'ip',
    user: 'login',
    password: 'password',
    database: 'applications'
});

connection.connect();

const oauth = new DiscordOauth2();
const router = express.Router();

const ids = [
    "user_id_discord",
]
router.get("/", (req, res) => {
    let success = false
    oauth.getUser(req.query.code).then(function(params) {
        var data = JSON.parse(req.query.data)
        oauth.getUserGuilds(req.query.code).then(function(params2) {
            params2.forEach(element => {
                if (element.id == _your_id_chanel_) {
                    connection.query('INSERT INTO applications SET ?', { id_discord: params.id, discord: params.username + "#" + params.discriminator, name: data.name, dob: data.dob, ans_one: data.ans_one, ans_two: data.ans_two, ans_three: data.ans_three, status: "nowe" }, (error, results, fields) => {
                        if (error) throw error;
                    });
                    success = true
                }
            });
            var date = JSON.stringify(new Date).slice(1, 11) + " " + JSON.stringify(new Date).slice(12, 20)
            res.send({ success: success, aplication: [{ id: data.id, name: data.name, dob: data.dob, date: date, show: false, status: 'nowe' }] })
        });
    });
});




module.exports = router;