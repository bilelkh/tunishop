const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');


const userRoutes = require('./src/routes/user');
const categoryRoutes = require('./src/routes/category');
const subCategoryRoutes = require('./src/routes/subCategory');
const adRoutes = require('./src/routes/ad');


const app = express();


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const port = process.env.PORT || 5500;


app.use(userRoutes);
app.use(categoryRoutes);
app.use(adRoutes)
app.use(subCategoryRoutes);
// Express session
app.use(
    session({
        secret: 'FLATI',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./configuration/passport')(passport);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});



mongoose.connect("mongodb://admin:azerty123#@ds233198.mlab.com:33198/discountapp", { useNewUrlParser: true }).catch(err => console.log(err));;
mongoose.connection.on('connected', () => {
    console.log("\x1b[31m",'---->DATABASE CONNECTED SUCCESFULLY<----');
});

app.get('/', (req, res) => {
    res.send('TUNISHOP REST FULL API');
});
app.listen(port, () => {
    console.log('\x1b[31m','----->SERVER RUNNING ON PORT : ' + port + '<--------');
});