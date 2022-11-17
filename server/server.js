const express = require('express');
const app = express();
const path = require('path');

const apiController = require('./controllers/apiController')
const dbController = require('./controllers/dbController')

app.use(express.json())
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../client/styles/styles.css')));

app.get('/client/styles/styles.css', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../client/styles/styles.css'));
})

app.get('/profile', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'))
})

app.get('/api/random', apiController.random, (req, res) => {
    return res.status(200);
});

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/api/:user', dbController.getUserScore, (req, res) => {
    return res.status(200)
});

app.post('/api/signUp', dbController.addUser, (req, res) => {
    console.log('posted', req.body) 
    // console.log('res', res)
    return res.status(200).redirect('/');
});

app.post('/api/logIn', dbController.findUser, (req, res) => {
    return res.send('success');
});

app.use((err, req, res, next) => {
    const defErr = {
        log: 'Caught middleware error',
        status: 500,
        mess: {err: 'an error occured'}
    };
    const errorObj = Object.assign({}, defErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.mess);
})

app.listen(3000);