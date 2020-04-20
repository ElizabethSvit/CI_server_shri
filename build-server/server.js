const express = require('express');
const axios = require('axios');

const bodyParser = require('body-parser');
const config = require('./server-conf');

const port = config.port;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let buildsQueue = [];
let agents = [];

const token = process.env.REACT_APP_API_KEY;
const api = axios.create({
    baseURL: config.apiBaseURL,
    timeout: 1000,
    headers: {
        Authorization: 'Bearer ' + config.apiToken,
    },
});

// получение списка сборок
app.get('/api/builds', (req, res) => {
    api.get('/build/list', {params: {offset: 0, limit: 5}}).then(({data}) => {
        console.log(data.data);
        return buildsQueue = data.data;
    });
});

app.post('/notify-agent', (req, res) => {
    console.log(req.body.host, req.body.port);
    try {
        agents.push([req.body.host, req.body.port]);
        res.status(200).send('Successfully added an agent');
    } catch (e) {
        res.status(400).send('Error while adding an agent: ', e);
    }
});

app.post('/notify-build-result', (req, res) => {
    let buildId = req.body.buildId;
    let status = req.body.status;
    let log = req.body.log;

    api.post('/build/finish', {
        "buildId": buildId,
        "duration": 3,
        "success": status,
        "buildLog": log
    }).then(response => {
        res.status(200).send('Successfully saved build result');
    }).catch(e => {
        res.status(400).send(e);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;

/*
Testing with curl

curl -X POST "http://localhost:4000/notify-agent" -H "Content-Type: application/json" -d "{\"host\":\"agent\", \"port\":\"4001\"}"
curl -X POST "http://localhost:4000/notify-build-result" -H "Content-Type: application/json" -d "{\"buildId\":\"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\"status\":\"success\",\"log\":\"log\"}"
* */
