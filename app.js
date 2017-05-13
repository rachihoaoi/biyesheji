var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Waterline = require('waterline');
var util = require('./utils/util');
var waterlineTool = require('./utils/waterlineTool.js');
var request = require('request');
var fs = require('fs');
var multiparty = require('multiparty');
var http = require('http');
var app = express();
var async = require('async');
var soap = require('soap');
var schedule = require("node-schedule");
var mysql = require('mysql');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

util.waterline = new Waterline();
waterlineTool.loadPo();
waterlineTool.initDatabase();




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var sessionOption = {
  secret: 'cat key',
  resave: false,
  key:'uid',
  saveUninitialized: true,
  cookie: {secure: false,maxAge: 2 * 60 * 60 * 1000}
};

var TEST_DATABASE = 'hospitalserviceplatform';

function scheduleCronstyle(){
  schedule.scheduleJob('0 0 0 * * *', function(){
      var myDate = new Date();
      var client = mysql.createConnection({
          user: 'root',
          password: '111111',
          multipleStatements: true
      });
      console.log( 'INSERT INTO visit_statistic(time,value) values('+myDate.toLocaleDateString()+',0);');
      var year = myDate.getFullYear();
      var month = myDate.getMonth()+1;
      var day = myDate.getDate();
      var time=year+'\_'+month+'\_'+day;
      client.connect();
      client.query("use " + TEST_DATABASE);
      client.query('INSERT INTO visit_statistic(time,value) values('+'\''+time+'\''+',0);INSERT INTO app_amount_statistic(time,value) values('+'\''+time+'\''+',0);INSERT INTO service_amount_statistic(time,value) values('+'\''+time+'\''+',0);',
          function selectCb(err, results, fields) {
            if (err) {
              throw err;
            }

            if(results)
            {
              for(var i = 0; i < results.length; i++)
              {
                console.log(results[i].id, results[i].time, results[i].value);
              }
            }
            client.end();
          }
      );
    //   client.connect();
    //   client.query("use " + TEST_DATABASE);
    //   client.query('',
    //       function selectCb(err, results, fields) {
    //           if (err) {
    //               throw err;
    //           }
    //
    //           if(results)
    //           {
    //               for(var i = 0; i < results.length; i++)
    //               {
    //                   console.log(results[i].id, results[i].time, results[i].value);
    //               }
    //           }
    //           client.end();
    //       }
    //   );
    // console.log('scheduleCronstyle:' +myDate.toLocaleDateString());
    
  });
}

scheduleCronstyle();

app.use(session(sessionOption));

//Page Router
app.use('/HospitalServicePlatform/index', require('./routes/index.js'));
app.use('/HospitalServicePlatform/register', require('./routes/register.js'));
app.use('/HospitalServicePlatform/main', require('./routes/main.js'));
app.use('/HospitalServicePlatform/admin', require('./routes/admin.js'));
//API Router
app.use('/HospitalServicePlatform/api/index', require('./routes/api/index.js'));
app.use('/HospitalServicePlatform/api/service', require('./routes/api/service.js'));
app.use('/HospitalServicePlatform/api/userService', require('./routes/api/userService.js'));
app.use('/HospitalServicePlatform/api/notification', require('./routes/api/notification.js'));
app.use('/HospitalServicePlatform/api/statistic', require('./routes/api/statistic.js'));
app.use('/HospitalServicePlatform/api/recommend', require('./routes/api/recommend.js'));
app.use('/HospitalServicePlatform/api/app', require('./routes/api/app.js'));


app.post("/upload",function(req,res) {
  //设置编辑
  var form = new multiparty.Form();
  form.encoding = 'utf-8';
  //设置文件存储路径
  form.uploadDir = "public/images/imgServer";

  form.parse(req, function(err, fields, files) {
    console.log(files);
    var start1=files['file[0]'][0].path.lastIndexOf("\\");
    var path1=files['file[0]'][0].path.substring(0,start1+1);
    //同步重命名文件名
    var path=path1+files['file[0]'][0].originalFilename;
    fs.renameSync(files['file[0]'][0].path,path);

    res.writeHead(200, {'content-type': 'text/plain'});
    res.end(files['file[0]'][0].originalFilename);
  });
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
