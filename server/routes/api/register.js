const express = require("express");
const DiscordOauth2 = require("discord-oauth2");

const oauth = new DiscordOauth2();
const router = express.Router();

const ids = [
    "user_id_discord",
]

router.get("/", (req, res) => {
    oauth.tokenRequest({
        clientId: "",
        clientSecret: "",

        code: req.query.code,
        scope: "identify guilds",
        grantType: "authorization_code",

        redirectUri: "",
    }).then(function(params) {
        oauth.getUser(params.access_token).then(function(params2) {
            if (ids.includes(params2.id)) {
                res.send({ status: { on_discord: false, whitelist: false, status: false, applications: true }, data: { access_token: params.access_token } })
            } else {
                res.send({ status: { on_discord: false, whitelist: true, status: false, applications: false }, data: { access_token: params.access_token } })
            }
        });

    })
});


module.exports = router;