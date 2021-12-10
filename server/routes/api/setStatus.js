const express = require("express");
const DiscordOauth2 = require("discord-oauth2");
const discord = require("discord.js")
const bot = new discord.Client({
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
    ]
});
const token = "TOKEN DISCORD"

bot.login(token)


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

bot.on("messageCreate", function(message) {
    if (message.guildId == _your_id_server_) {
        if (message.channelId == _your_id_channel_) {
            let role = message.guild.roles.cache.find(r => r.id === "_your_id_role_");
            let role2 = message.guild.roles.cache.find(r => r.id === "_your_id_role_");
            const member = message.guild.members.cache.get(message.mentions.users.first().id);
            member.roles.add(role);
            member.roles.remove(role2);
        } else if (message.channelId == _your_id_channel_) {
            let role = message.guild.roles.cache.find(r => r.id === "_your_id_role_");
            let role2 = message.guild.roles.cache.find(r => r.id === "_your_id_role_");
            const member = message.guild.members.cache.get(message.mentions.users.first().id);
            member.roles.add(role2);
            member.roles.remove(role);
        }

    }
})

router.get("/", (req, res) => {
    oauth.getUser(req.query.code).then(function(params2) {
        if (ids.includes(params2.id)) {
            var data = JSON.parse(req.query.data);
            if (data.status == 'zaakceptowane') {
                connection.query('UPDATE applications SET `status` = ?, `checker` = ? WHERE `status` = ? AND `id` = ? LIMIT 1', ['zaakceptowane', params2.username, 'nowe', data.id], function(error, results, fields) {
                    if (error) throw error;
                    const channel = bot.channels.cache.find(ch => ch.id === "_your_id_channel_")
                    channel.send("<@" + data.id_discord + "> Twoje podanie zostało **zaakceptowane**. Zgłoś się <#_your_id_channel_> w celu **weryfikacji głosu**.")
                });
            } else if (data.status == 'odrzucone') {
                connection.query('UPDATE applications SET `status` = ?, `checker` = ? ,`reason` = ? WHERE `status` = ? AND `id` = ? LIMIT 1', ['odrzucone', params2.username, data.reason, 'nowe', data.id], function(error, results, fields) {
                    if (error) throw error;
                    const channel = bot.channels.cache.find(ch => ch.id === "_your_id_channel_")
                    channel.send("<@" + data.id_discord + "> Twoje podanie zostało **odrzucone** z powodu: " + data.reason)
                });
            }
            res.send(true)
        }

    });
});




module.exports = router;