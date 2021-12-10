const express = require("express");
const DiscordOauth2 = require("discord-oauth2");
const discord = require("discord.js")
const bot = new discord.Client({
    intents:[
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
    ]
});
const token = "ODk4MjgyMjQ2NDA5MTYyODQy.YWh8iA.RRHp00jrBEDGKVr_A0fWuQJp4Is"

bot.login(token)


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

bot.on("messageCreate",function (message) {
    if(message.guildId == 895311682501480498){
        if(message.channelId == 895311683583623175){
            let role = message.guild.roles.cache.find(r => r.id === "901461681090224188");
            let role2 = message.guild.roles.cache.find(r => r.id === "895311682501480499");
            const member = message.guild.members.cache.get(message.mentions.users.first().id);
            member.roles.add(role);
            member.roles.remove(role2);
        }else if(message.channelId == 897080930827653150){
            let role = message.guild.roles.cache.find(r => r.id === "901461681090224188");
            let role2 = message.guild.roles.cache.find(r => r.id === "895311682501480499");
            const member = message.guild.members.cache.get(message.mentions.users.first().id);
            member.roles.add(role2);
            member.roles.remove(role);
        }
        
    }
})

router.get("/",(req,res) =>{
    oauth.getUser(req.query.code).then(function (params2) {
        if(ids.includes(params2.id)){
            var data = JSON.parse(req.query.data);
            if(data.status == 'zaakceptowane'){
                connection.query('UPDATE applications SET `status` = ?, `checker` = ? WHERE `status` = ? AND `id` = ? LIMIT 1', ['zaakceptowane',params2.username, 'nowe', data.id], function (error, results, fields) {
                    if (error) throw error;
                    const channel = bot.channels.cache.find(ch => ch.id === "895311683583623175")
                    channel.send("<@"+data.id_discord+"> Twoje podanie zostało **zaakceptowane**. Zgłoś się <#895311683805937692> w celu **weryfikacji głosu**.")
                });
            }else if(data.status == 'odrzucone'){
                connection.query('UPDATE applications SET `status` = ?, `checker` = ? ,`reason` = ? WHERE `status` = ? AND `id` = ? LIMIT 1', ['odrzucone',params2.username,data.reason, 'nowe', data.id], function (error, results, fields) {
                    if (error) throw error;
                    const channel = bot.channels.cache.find(ch => ch.id === "897080930827653150")
                    channel.send("<@"+data.id_discord+"> Twoje podanie zostało **odrzucone** z powodu: "+data.reason)
                });
            }
            res.send(true)
        }

    });
});




module.exports = router;