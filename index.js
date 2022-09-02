const express = require('express');
const bodyParser = require('body-parser');

const api = require('./api');
const {pool} = require('./db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', api);

pool.connect((err, client, done) => {
    if(err) {
        throw new Error(err);
    }
    console.log('PostgreSQL connected');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
    }
);