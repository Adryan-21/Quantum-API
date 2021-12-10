const express = require("express");
const DiscordOauth2 = require("discord-oauth2");

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
    oauth.tokenRequest({
        clientId: "898282246409162842",
        clientSecret: "ML8L0XCYNoe93dS3qiSoNXf0iZbYLyOp",
    
        code: req.query.code,
        scope: "identify guilds",
        grantType: "authorization_code",
        
        redirectUri: "http://quantum-servers.net/fivem_whitelist",
    }).then( function (params) {
        oauth.getUser(params.access_token).then(function (params2) {
            if(ids.includes(params2.id)){
                res.send({status:{on_discord:false,whitelist:false,status:false,applications:true},data:{access_token:params.access_token}})
            }else{
                res.send({status:{on_discord:false,whitelist:true,status:false,applications:false},data:{access_token:params.access_token}})
            }
        });

    })
});


module.exports = router;