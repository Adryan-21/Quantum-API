const express = require("express");
const DiscordOauth2 = require("discord-oauth2");
var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Quantum123',
    database : 'applications'
});

connection.connect();

const oauth = new DiscordOauth2();
const router = express.Router();

const ids = [
    "288037105286905857",
    "537598337952514058",
    "459797914164789248",
    "374644467988299787",
    "689079740879208707",
    "389839833100451862",
    "332934794440867845",
    "287734939703705605",
    "395668805382045699",
    "320543203172417536",
    "685161759761367097",
    "207569915400552448",
    "585518995466354711",
    "248898683293138944",
]
router.get("/",(req,res) =>{
    let success = false
    oauth.getUser(req.query.code).then(function (params) {
        var data = JSON.parse(req.query.data)
        oauth.getUserGuilds(req.query.code).then(function (params2) {
            params2.forEach(element => {
                if(element.id == 895311682501480498){
                    connection.query('INSERT INTO applications SET ?', {id_discord: params.id,discord:params.username+"#"+params.discriminator,name:data.name,dob:data.dob,ans_one:data.ans_one,ans_two:data.ans_two,ans_three:data.ans_three,status:"nowe"}, (error, results, fields) => {
                        if (error) throw error;
                    });
                    success = true
                }
            });
            var date = JSON.stringify(new Date).slice(1,11)+" "+JSON.stringify(new Date).slice(12,20)
            res.send({success:success,aplication:[{id:data.id,name:data.name,dob:data.dob,date:date,show:false,status:'nowe'}]})
        });
    });
});




module.exports = router;