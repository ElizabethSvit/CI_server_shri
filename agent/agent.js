const express = require('express');
const axios = require('axios');
const {spawn, exec} = require('child_process');

const bodyParser = require('body-parser');
const config = require('./agent-conf');

const port = config.port;

const DEFAULT_REPO_DIR = '../testRepo';
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const api = axios.create({
    baseURL: `http://${config.serverHost}:${config.serverPort}`,
    timeout: 1000,
});

api.post('/notify-agent', {
    "host": "http://localhost",
    "port": config.port,
}).then(response => {
    console.log(response.status);
});

const parseCommitData = (data, commitHash) => {
    data = data.toString().split('\t');
    return {
        "commitMessage": data[1],
        "commitHash": commitHash,
        "branchName": data[2].split(',')[0],
        "authorName": data[0]
    }
};

app.post('/build', (req, res) => {
    const buildId = req.body.buildId;
    const repoName = req.body.repoName;
    const commitHash = req.body.commitHash;
    const buildCommand = req.body.buildCommand;

    if (!fs.existsSync(DEFAULT_REPO_DIR)) {
        console.log('repo does not exist');
        try {
            spawn('git', ['clone', repoName, DEFAULT_REPO_DIR]).stdout.on('data', data => {
                console.log('Repo cloned');
            });
        } catch (e) {
            res.send(e);
        }
    }

    exec(`cd ${DEFAULT_REPO_DIR} && git checkout ${commitHash}`,
        async function (error, stdout, stderr) {

        exec(`cd ${DEFAULT_REPO_DIR} && ${buildCommand}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                api.post('/notify-build-result', {buildId: buildId, status: 'Fail', log: error.message});
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                api.post('/notify-build-result', {buildId: buildId, status: 'Fail', log: stderr});
                return;
            }
            console.log(`stdout: ${stdout}`);
            api.post('/notify-build-result', {buildId: buildId, status: 'Success', log: stdout});
        });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;

/*
Testing with curl
curl -X POST "http://localhost:4001/build" -H "Content-Type: application/json" -d "{\"repoName\":\"git@github.com:ElizabethSvit/shri-async-hw.git\",\"buildCommand\":\"ls -a\", \"buildId\":\"0\", \"commitHash\":\"2e2e218201c5ef56f5a60909db02504a06060494\"}"
* */
