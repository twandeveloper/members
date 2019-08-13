const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                console.log(err);

            } else {
                user.password = hash;
                user.save(() => {
                    if (err) {
                        console.log(err);

                    } else {
                        res.render('login');
                    }
                });
            }
        });
    });

});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {successRedirect: '/members',
failureRedirect: '/users/login'})
(req, res, next)

});

module.exports = router;