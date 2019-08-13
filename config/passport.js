const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');

module.exports = (passport)=> {
    // local straegy
    passport.use(new LocalStrategy({
        username: 'username'
    }, (username, password, done) => {
        User.findOne({
                username: username
            })
            .then(user => {
                if (!user) {
                    return done(null, false, {
                        message: "that username is not registered"
                    });
                }

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        throw err;
                    }
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: 'Password incorrect'
                        });
                    }
                })
            })
            .catch(err => console.log(err));
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

}