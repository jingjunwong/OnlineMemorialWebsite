//imports
require('dotenv').config;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express();
const port = 5000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('uploads'));

//Express-session
const oneDay = 1000 * 60 * 60 *24;
app.use(sessions({
    secret:"aRandomSecretKey",
    saveUninitialized:true,
    cookie: {maxAge:oneDay, httpOnly:false},
    resave: false,
    name: 'username',
}));
app.use(cookieParser());

//database connection
//env file not working unable to retrieve the value in variables idk why
mongoose.connect("mongodb://localhost:27017/mevn-marvel", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModift: true,
    useCreateIndex: true
}).then(() => console.log('Connected to Database')).catch((err) => console.log(err));

//routes prefix
app.use("/api/post", require('./routes/routes'));
app.use("/api/auth", require('./routes/routes'));

//start server
app.listen(port, () => console.log('Server has started at http://localhost:5000'));