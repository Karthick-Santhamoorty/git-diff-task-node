const express = require('express');
const axios = require('axios');
const app = express();

app.listen(process.env.PORT || 8000 , ()=>{
    console.log("server started at http://localhost:8000");
})

app.get("/test", (req, res) => {
    res.status(200).send({
        test: "Hello"
    });
});

app.get("/git-data/repositories/:owner/:repository/commit/:oid", (req, res) => {
    const { owner, repository, oid } = req.params;
    axios.get(`https://api.github.com/repos/${owner}/${repository}/commits/${oid}`)
    .then(response => res.status(200).send({
        data: response.data
    }))
    .catch(error => res.status(error.response.status).send({
        error: error.response.message?? "something went wrong"
    }))
});

app.get("/diff-data/repositories/:owner/:repository/commit/:oid", (req, res) => {
    const { owner, repository, oid } = req.params;
    axios.get(`https://github.com/${owner}/${repository}/commit/${oid}.diff`)
    .then(response => res.status(200).send({
        data: response.data
    }))
    .catch(error => res.status(error.response.status).send({
        error: error.response.message?? "something went wrong"
    }))
});

app.get("/repositories/:owner/:repository/commit/:oid", (req, res) => {
    const { owner, repository, oid } = req.params;
    axios.get(`https://api.github.com/repos/${owner}/${repository}/commits/${oid}`).
    then(response => {
        const { data } = response
        const returnResponse = {
            oid: data.sha,
            subject: data.commit.message,
            body: data.commit.body?? "",
            parents: {
                oid: data.parents.map(parent => parent.sha),
            },
            author: {...data.commit.author, avatarUrl: `https://github.com/${data.commit.author.name}.png`},
            committer: {...data.commit.committer, avatarUrl: `https://github.com/${data.commit.committer.name}.png`}
        }
        res.status(200).send({
            response: returnResponse
        });
    })
    .catch(error => res.status(error.response.status).send({
        error: error.response.message?? "something went wrong"
    }))
});

app.get("/repositories/:owner/:repository/commit/:oid/diff", (req, res) => {
    const { owner, repository, oid } = req.params;
    axios.get(`https://api.github.com/repos/${owner}/${repository}/commits/${oid}`).
    then(response => {
        const { files } = response.data;
        const returnResponse = [];
        files.map(file => {
            returnResponse.push({
                changeKind: file.status,
                baseFile: {
                    path: file.filename?? ""
                },
                headFile: {
                    path: file.filename?? ""
                },
            })
        })
        res.status(200).send({
            response: returnResponse
        })
    })
    .catch(error => res.status(error.response.status).send({
        error: error.response.message?? "something went wrong"
    }))
});