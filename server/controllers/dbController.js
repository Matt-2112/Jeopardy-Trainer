const db = require('../models/userModel')

const dbController = {};

dbController.addUser = (req, res, next) => {
    const query = 'INSERT INTO users (username, score, lifetime_score) VALUES ($1, $2, $3);'
    const values = [req.body.username, 0, 0]

    db.query(query, values, (err, response) => {
        if(err) {
            err.log = 'Error creating user'
            err.message = 'Error creating user'
            return next(err);
        } else {
            console.log(response);
            return next()
        }
    })
}

dbController.findUser = (req, res, next) => {
    const username = req.body.username;
    const query = `SELECT * FROM users WHERE username = '${username}';`
    db.query(query, (err, response) => {
        if(err) {
            err.log = 'Error finding user'
            err.message = 'Error finding user'
            return next(err);
        } else {
            if(response.rows.length) {
                console.log('response', response.rows[0]);
                res.locals = response.rows[0];
                console.log(res.locals);
            } else {
                console.log('response', response)
                console.log('nothing found')
                return next();
            }
        }
    });
}

dbController.getUserScore = (req, res, next) => {
    const username = req.params.user;
    console.log('middleware username', username);
    const query = `SELECT score FROM users WHERE username = '${username}';`
    db.query(query, err, response => {
        if(err) {
            err.log = 'Error finding user score'
            err.message = 'Error finding user score'
            return next(err);
        } else {
            if(response.rows) {
                console.log('hi');
                res.locals = response.rows[0];
                res.send(response.rows[0]);
            }  else {
                console.log('response', response)
                console.log('nothing found')
                return next();
            }
        }
    });
}

module.exports = dbController