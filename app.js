const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/keys');
const app = express();



require('./config/passport')(passport);

//View engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Body Paraser
app.use(express.urlencoded({
    extended: false
}));

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

// Mongoose connection
const db = require('./config/keys').MongoURI;
mongoose.connect(db, {
    useNewUrlParser: true
}, () => console.log('connected to Mongo database'));


app.get('/', (req, res) => {
    res.render('home');
})


app.listen(PORT, () => {
    console.log(`Server succesfully started on port ${PORT}`);
});