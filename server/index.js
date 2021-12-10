const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();

//Middle

app.use(bodyParser.json());
app.use(cors());

const register = require("./routes/api/register");

app.use("/api/register",register);

const login = require("./routes/api/login");

app.use("/api/login",login);

const sendApplication = require("./routes/api/sendApplications");

app.use("/api/sendApplication",sendApplication);

const setStatus = require("./routes/api/setStatus");

app.use("/api/setStatus",setStatus);

const port = process.env.PORT || 5000;


app.listen(port, ()=> console.log("server start on "+port));