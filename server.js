const express = require('express');
const axios = require('axios');
const https = require('https');
const {spawn, exec} = require('child_process');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

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

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijk0MzczNzYiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiRWxpemFiZXRoU3ZpdCIsInVybjpnaXRodWI6bmFtZSI6IkxpemEgU3ZpdGFua28iLCJ1cm46Z2l0aHViOnVybCI6Imh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvRWxpemFiZXRoU3ZpdCIsIm5iZiI6MTU4NTU5NjM1MCwiZXhwIjoxNTg4MTg4MzUwLCJpc3MiOiJTaHJpLUhvbWV3b3JrIiwiYXVkIjoiU2hyaS1Ib21ld29yayJ9.hVqHWfZ7V-Vr1XqYXvsAW0ZkNuLcJMVWeJS6GVUNy8E';
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
app.get('api/settings', (req, res) => {
        try {
            api.get('/conf', {}).then(({data}) => {
                const {repoName, buildCommand, mainBranch, period} = data;
                settings = {repoName, buildCommand, mainBranch, period};

                res.send('Success');
            });
        } catch (e) {
            console.log(e);
            res.send('Error');
        }
    },
);

//  cохранение настроек
app.post('/api/settings', (req, res) => {
    const conf = req.body;

    try {
        try {
            spawn('git', ['clone', conf.repoName, DEFAULT_REPO_DIR]).stdout.on('data', data => {
                console.log('Repo cloned');
                res.send('Success');
            });
        } catch (e) {
            console.log(e);
            res.send('Error');
        }

        api.post('/conf', conf).then(({data}) => {
            res.send('Successfully updated config');
        });
    } catch (e) {
        console.log(e);
        res.send('Error');
    }
    res.end();
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

    // 2e2e218201c5ef56f5a60909db02504a06060494 commit for testing
    try {
        exec(`git -C testRepo/ log -1 --pretty=format:"%an\t%s\t%D" ${commitHash}\n`,
                function (error, stdout, stderr) {
                    const commitData = parseCommitData(stdout, commitHash);
                    console.log('Got commit data by hash', commitData);
                    let buildId = '';
                    // предположительно, здесь приходит buildId для последующей отправки на сборку
                    api.post('/build/request', commitData)
                        .then(response => {
                            buildId = response.data.data.id;
                            api.post('/build/start', {
                                "buildId": buildId,
                                "dateTime": "2020-03-30T20:38:17.317Z"
                            }).then(() => {
                                res.send(buildId);
                            });
                    }).catch(() => {
                        res.redirect('/error');
                    });
                    // эта очередь будет с логикой в дз по инфраструктуре
                    // buildsQueue.push(commitData);
                }
            )
        res.end();
    } catch (e) {
        console.log(e);
        res.redirect('/error');
    }
});

// получение информации о конкретной сборке
app.get('/api/builds', (req, res) => {
    const buildId = req.body.buildId;
    try {
        api.get('/build/details', {params: {buildId}}).then(({data}) => console.log(data));
        // res.end('Success');
    } catch (e) {
        console.log(e);
        // res.end('Error');
    }
});

// получение логов билда
app.get('/api/builds/logs', (req, res) => {
    const buildId = req.body.buildId;
    try {
        api.get('/build/logs', {params: {buildId}}).then(({data}) => console.log(data));
        res.end('Success');
    } catch (e) {
        console.log(e);
        res.end('Error');
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

/*
Testing with curl

curl -X POST "http://localhost:3000/settings" -H "Content-Type: application/json" -d "{\"repoName\":\"git@github.com:ElizabethSvit/shri-async-hw.git\"}"
curl -X POST "http://localhost:3000/builds" -H "Content-Type: application/json" -d "{\"commitHash\":\"fe9d127781ad8870631f8c2defffc5a61d0fe44d\"}"
curl http://localhost:3000/builds
* */
