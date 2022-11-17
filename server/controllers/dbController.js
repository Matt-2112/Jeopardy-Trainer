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
                // console.log('response', response.rows[0]);
                res.locals = response.rows[0];
                // console.log(res.locals);
                return next()
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
                console.log('response!!', response)
                console.log('nothing found')
                return next();
            }
        }
    });
}

dbController.updateScore = (req, res, next) => {
    let query = `UPDATE users SET score = score + ${req.body.value} WHERE username = '${req.body.username}' RETURNING score;`
    console.log('body val and user', req.body.value, req.body.username);
    console.log('in score update middleware');
    db.query(query,(err, response) => {
        if(err) {
            err.log = 'Error updating score'
            err.message = 'Error updating score'
            return next(err);
        } else {
            // console.log('response', response);
            res.locals = response.rows[0];
            // console.log('res.locals ',res.locals)
            return next();
        }
    })
}

module.exports = dbController