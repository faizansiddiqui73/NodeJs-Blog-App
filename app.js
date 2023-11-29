require('dotenv').config(); // for loading the environment variable //require will import
// config called the method from the dotenv package

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser'); //store the session as well and help in save the cookies
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
// const router = require('./server/routes/main');
// const router  = require('./server/routes/admin');

const ConnectDB = require('./server/config/db');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

//connect to database
ConnectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));


app.use(session({
    secret: 'keyboard cat',
    resave: false, 
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
}));

//middleware
app.use(express.static('public'));


//Templating the engine
app.use(expressLayout);
app.set('layout', './layouts/main');  //the Main page middleware
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));


app.listen(port, () => {
    console.log(`App listening on http://localhost:${port} `);
});

