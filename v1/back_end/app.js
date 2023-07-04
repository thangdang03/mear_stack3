const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require('cors');
const cookie_parser = require("cookie-parser");
const  {checkoverload} = require("./helmets/check.overload");
const Router = require("./routers/index.rt");
const logevent = require("./helmets/check.log");

app.use(morgan("dev"));
//intercept headers and requests from domains
app.use(helmet({
    crossOriginResourcePolicy: false,
  }));
app.use(cors({
    origin: process.env.URL_REACT,
    credentials: true ,
}));

// until
app.use(cookie_parser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(compression());
app.use(express.static('upload'));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', process.env.URL_REACT);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next();
});
// inint dbs
const instalmongodb = require("./dbs/init.dbs");
//router
Router(app);
//check overload
// checkoverload();
// catch error

//hadell error in router of wrong url , method 
app.use((req,res,next)=>{
    const error = new Error(`Not Found get url or can not ::${req.method}`);
    error.status = 404;
    logevent(`${req.url} -- ${req.method} --${error.message}`);
    next(error);
});

app.use((error,req,res,next)=>{
    const status = error.status || 500;
    console.log(error);
    logevent(`${req.url} -- ${req.method} --${error.message}`);
    return res.status(status).json({
      satus: 'error',
      code: status,
      message: error.message || 'internal server',
    });
})


module.exports = app
