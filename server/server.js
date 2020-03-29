const express = require('express');
const axios = require('axios');
const https = require('https');
const {spawn, exec} = require('child_process');

const app = express();
app.use(express.json());

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
    let request = {};
    request.authorName = data[0];
    request.commitMessage = data[1];
    request.branchName = data[2].split(',')[0];
    request.commitHash = commitHash;

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
            api.get('/conf', {}).then(({data}) => {
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
    const conf = req.body;

    try {
        try {
            spawn('git', ['clone', conf.repoName, DEFAULT_REPO_DIR]).stdout.on('data', data => {
                console.log('Repo cloned')
            });
            res.end('Success');
        } catch (e) {
            console.log(e);
            res.end('Error');
        }

        api.post('/conf', conf).then(({data}) => console.log(data));
        res.end('Success');
    } catch (e) {
        console.log(e);
        res.end('Error');
    }
});

// получение списка сборок
app.get('/builds', (req, res) => {
    try {
        api.get('/build/list', {params: {offset: 0, limit: 50}}).then(({data}) => console.log(data));
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
        exec('git -C testRepo/ log -1 --pretty=format:"%an\t%s\t%D" 5292cdf7407b9e25f3d72da83c9cd275a237b0a0\n',
            function (error, stdout, stderr) {
                const commitData = parseCommitData(stdout, commitHash);
                console.log('Got commit data by hash', commitData);
                // эта очередь будет с логикой в дз по инфраструктуре
                buildsQueue.push(commitData);
            }
        );

        // предположительно, здесь приходит buildId для последующей отправки на сборку
        api.post('/build/request', buildsQueue.shift())
            .then(buildId => {
                api.post('/build/start', buildId);
                return buildId;
            }).then(buildId => {
                setTimeout(() => {
                    api.post('/build/finish', buildId)
                }, 3000);
            })
            .catch(() => {
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
        api.get('/build/details', {params: {buildId}}).then(({data}) => console.log(data));
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
        api.get('/build/logs', {params: {buildId}}).then(({data}) => console.log(data));
        res.end('Success');
    } catch (e) {
        console.log(e);
        res.end('Error');
    }
});

app.listen(3000);

/*
Testing with curl

curl -X POST "http://localhost:3000/settings" -H "Content-Type: application/json" -d "{\"repoName\":\"git@github.com:ElizabethSvit/shri-async-hw.git\"}"
curl -X POST "http://localhost:3000/builds" -H "Content-Type: application/json" -d "{\"commitHash\":\"fe9d127781ad8870631f8c2defffc5a61d0fe44d\"}"
curl http://localhost:3000/builds
* */
