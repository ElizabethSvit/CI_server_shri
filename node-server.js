const express = require('express');
const axios = require('axios');
const https = require('https');
const {spawn, exec} = require('child_process');
const bodyParser = require('body-parser');
require('dotenv').config();

const fs = require('fs');

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const DEFAULT_REPO_DIR = './testRepo';

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

const parseCommitData = (data, commitHash) => {
    data = data.toString().split('\t');
    return {
        "commitMessage": data[1],
        "commitHash": commitHash,
        "branchName": data[2].split(',')[0],
        "authorName": data[0]
    }
};

const token = process.env.REACT_APP_API_KEY;
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
app.get('/api/settings', (req, res) => {
        try {
            api.get('/conf', {}).then(({data}) => {
                // const {repoName, buildCommand, mainBranch, period} = data;
                // settings = {repoName, buildCommand, mainBranch, period};
                res.send({data});
            });
        } catch (e) {
            console.log(e);
            res.send('Error');
        }
    },
);

//  cохранение настроек
app.post('/api/settings', async (req, res) => {
    let conf = req.body;

    if (!fs.existsSync(DEFAULT_REPO_DIR)) {
        console.log('repo does not exist');
        try {
            spawn('git', ['clone', conf.repoName, DEFAULT_REPO_DIR]).stdout.on('data', data => {
                console.log('Repo cloned');
            });
        } catch (e) {
            res.send(e);
        }
    }

    let result = {};
    try {
        await api.post('/conf', conf);
        // TODO: парсить реальные статусы ответа сервера
        result = {status: 200};
    } catch (e) {
        result = {status: 400};
    } finally {
        res.send({result});
    }
});

// получение списка сборок
app.get('/api/builds', (req, res) => {
    api.get('/build/list', {params: {offset: 0, limit: 5}}).then(({data}) => {
        return res.send(data.data);
    }).catch(() => {
        res.end('Error');
    });
});

// добавление сборки в очередь
app.post('/api/builds', (req, res) => {
    const commitHash = req.body.commitHash;
    let result = {};
    let commitData = '';

    // 2e2e218201c5ef56f5a60909db02504a06060494 commit for testing
    // try {
    exec(`git -C testRepo/ log -1 --pretty=format:"%an\t%s\t%D" ${commitHash}\n`,
        async function (error, stdout, stderr) {
            const commitData = parseCommitData(stdout, commitHash);
            console.log('Got commit data by hash', commitData);

            let buildId = '';
            let buildNumber = 0;

            await api.post('/build/request', commitData)
                .then(response => {
                    buildId = response.data.data.id;
                    buildNumber = response.data.data.buildNumber;

                    api.post('/build/start', {
                        "buildId": buildId,
                        "dateTime": new Date().toISOString(),
                    }).then(() => {
                            setTimeout(() => {
                                api.post('/build/finish', {
                                    "buildId": buildId,
                                    "duration": 3,
                                    "success": true,
                                    "buildLog": "log"
                                })
                            }, 3000);
                        }
                    );
                });

            result = {"buildNumber": buildNumber};
            res.send({result});
            // эта очередь будет с логикой в дз по инфраструктуре
            // buildsQueue.push(commitData);
        });
});

// получение информации о конкретной сборке
app.get('/api/build/details/:buildId', (req, res) => {
    const buildId = req.body.buildId;
    try {
        api.get('/build/details', {params: {buildId}}).then(({data}) => {
            console.log(data);
            res.send(data);
        });
        // res.end('Success');
    } catch (e) {
        console.log(e);
        // res.end('Error');
    }
});

// получение логов билда (?)
app.get('/api/build/log/:buildId', (req, res) => {
    const buildId = req.params.buildId;
    console.log(req);
    try {
        api.get('/build/log', {params: {buildId}}).then(({data}) => {
            console.log(data);
            res.send(data);
        });
    } catch (e) {
        console.log(e);
        // res.end('Error');
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;

/*
Testing with curl

curl -X POST "http://localhost:3000/settings" -H "Content-Type: application/json" -d "{\"repoName\":\"git@github.com:ElizabethSvit/shri-async-hw.git\"}"
curl -X POST "http://localhost:3000/builds" -H "Content-Type: application/json" -d "{\"commitHash\":\"fe9d127781ad8870631f8c2defffc5a61d0fe44d\"}"
curl http://localhost:3000/builds
* */
