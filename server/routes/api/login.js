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
    oauth.getUser(req.query.code).then(function (params2) {
        if(ids.includes(params2.id)){
            connection.query('SELECT * FROM `applications`', function (error, results, fields) {
                if (error) throw error;
                var applications_new = []
                var applications_decile = []
                var applications_accept = []
                results.forEach(element => {
                    var date = JSON.stringify(element.date).slice(1,11)+" "+JSON.stringify(element.date).slice(12,20)
                    var dob = JSON.stringify(element.dob).slice(1,11)
                    if(element.status == 'zaakceptowane'){
                        
                        applications_accept.push({id:element.id,id_discord:element.id_discord,discord:element.discord,name:element.name,dob:dob,date:date,ans_one:element.ans_one,ans_two:element.ans_two,ans_three:element.ans_three,show:false,osoba:element.checker})
                    }else if(element.status == 'nowe'){
                        applications_new.push({id:element.id,id_discord:element.id_discord,discord:element.discord,name:element.name,dob:dob,date:date,ans_one:element.ans_one,ans_two:element.ans_two,ans_three:element.ans_three,show:false})
                    }else if(element.status == 'odrzucone'){
                        applications_decile.push({id:element.id,id_discord:element.id_discord,discord:element.discord,name:element.name,dob:dob,date:date,ans_one:element.ans_one,ans_two:element.ans_two,ans_three:element.ans_three,show:false,osoba:element.checker,reason:element.reason})
                    }
                });

                res.send({status:{on_discord:false,whitelist:false,status:false,applications:true},data:{applications_new:applications_new,applications_decile:applications_decile,applications_accept:applications_accept}})
            });

        }else{
            connection.query('SELECT * FROM `applications` WHERE `id_discord`='+params2.id+' order by `date` DESC', function (error, results, fields) {
                if (error) throw error;
                var status_list = []
                results.forEach(element => {
                    var date = JSON.stringify(element.date).slice(1,11)+" "+JSON.stringify(element.date).slice(12,20)
                    var dob = JSON.stringify(element.dob).slice(1,11)
                    status_list.push({id:element.id,name:element.name,dob:dob,date:date,show:false,status:element.status})
                });
                if(results[0] != undefined){

                    if(results[0].status == "nowe" || results[0].status == 'zaakceptowane'){
                        res.send({status:{on_discord:false,whitelist:false,status:true,applications:false},status_list:status_list})
                    }else{
                        res.send({status:{on_discord:false,whitelist:true,status:false,applications:false},status_list:status_list})
                    }
                }else{
                    res.send({status:{on_discord:false,whitelist:true,status:false,applications:false},status_list:status_list})
                }
            });

        }

    });
});




module.exports = router;