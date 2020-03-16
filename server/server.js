const express = require('express');
const axios = require('axios');
const https = require('https');
const { spawn } = require('child_process');

const app = express();
app.use(express.json());

let settings = {
    repoName: "",
    buildCommand: "",
    mainBranch: "",
    period: 0,
};

// эта очередь будет с логикой в дз по инфраструктуре
const buildsQueue = [];

class Build {
    constructor(buildNumber, commitMessage, commitHash, authorName, start, duration) {
        this.buildNumber = buildNumber;
        this.commitMessage = commitMessage;
        this.commitHash = commitHash;
        this.authorName = authorName;
        this.start = start;
        this.duration = duration;
    }
}

const makeCommitData = (data) => {
    let request = data.toString().split('\n');
    for (let field of request) {
        // TODO: parse fields
        console.log(field.split(':'));
    }
    return request;
};

const token = '***';
const api = axios.create({
    baseURL: 'https://hw.shri.yandex/api/',
    timeout: 1000,
    headers: {
        Authorization: 'Bearer ' + token,
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
});

// получение сохраненных настроек
app.get('/settings', (req, res) => {
        try {
            api.get('/conf', {}).then(({ data }) => {
                const {repoName, buildCommand, mainBranch, period} = data;
                settings = {repoName, buildCommand, mainBranch, period};
            });
            res.end('Success');
        } catch (e) {
            console.log(e);
            res.end('Error');
        }
    },
);

//  cохранение настроек
app.post('/settings', (req, res) => {
    // TODO: clone repo here
    const conf = req.body;
    console.log('CONF', conf);
    try {
        api.post('/conf', conf).then(({ data }) => console.log(data));
        res.end('Success');
    } catch (e) {
        console.log(e);
        res.end('Error');
    }
});

// получение списка сборок
app.get('/builds', (req, res) => {
    try {
        api.get('/build/list', { params: { offset: 0, limit: 50 } }).then(({ data }) => console.log(data));
        res.end('Success');
    } catch (e) {
        console.log(e);
        res.end('Error');
    }
});

// добавление сборки в очередь
app.post('/builds', (req, res) => {
    const commitHash = req.body.commitHash;

    try {
        spawn('git', ['log', '-1', '--format=fuller', commitHash]).stdout.on('data', data => {
            const commitData = makeCommitData(data);
            // эта очередь будет с логикой в дз по инфраструктуре
            buildsQueue.push(commitData);

            // TODO: в какой-то момент вызывать start/finish
            // api.post('/build/request', requestData).then(({ data }) => {
            //   // get buildId
            //   console.log(data);
            // });
        });
        res.end('Success');
    } catch (e) {
        console.log(e);
        res.end('Error');
    }
});

// получение информации о конкретной сборке
app.get('/builds', (req, res) => {
    const buildId = req.body.buildId;
    try {
        api.get('/build/details', { params: { buildId  } }).then(({ data }) => console.log(data));
        res.end('Success');
    } catch (e) {
        console.log(e);
        res.end('Error');
    }
});

// получение логов билда
app.get('/builds/logs', (req, res) => {
    const buildId = req.body.buildId;
    try {
        api.get('/build/logs', { params: { buildId  } }).then(({ data }) => console.log(data));
        res.end('Success');
    } catch (e) {
        console.log(e);
        res.end('Error');
    }
});

app.listen(3000);

/*
Testing with curl

curl -X POST "http://localhost:3000/builds" -H "Content-Type: application/json" -d "{\"commitHash\":\"1c0886e12dd06ff846207675b609746f870e89a9\"}"
curl http://localhost:3000/builds
* */
