var express = require('express');
var router = express.Router();

// router.use(function(req,res,next){
//     console.log("req.session.user:"+req.session.user)
//     if (req.session.user) {
//         next();
//     }else{
//         res.redirect("/HospitalServicePlatform/index");
//     }
// });

router.get('/', function(req, res, next) {
    res.render('main.ejs');
});

router.get('/ServicePublish', function(req, res, next) {
    res.render('service.publish.ejs');
});

router.get('/ServiceInsert', function(req, res, next) {
    res.render('service.insert.ejs');
});

router.get('/MyServicePublish', function(req, res, next) {
    res.render('myService.publish.ejs');
});

router.get('/MyServiceInsert', function(req, res, next) {
    res.render('myService.insert.ejs');
});

router.get('/NotificationCenter', function(req, res, next) {
    res.render('notificationCenter.ejs');
});

router.get('/NotificationInbox', function(req, res, next) {
    res.render('notification.inbox.ejs');
});

router.get('/statistics', function(req, res, next) {
    res.render('statistics.ejs');
});

router.get('/serviceInfo', function(req, res, next) {
    res.render('serviceInfo.ejs');
});

router.get('/userInfo', function(req, res, next) {
    res.render('userInfo.ejs');
});

router.get('/MyServiceInfo', function(req, res, next) {
    res.render('MyServiceInfo.ejs');
});

router.get('/MyAppPublish', function(req, res, next) {
    res.render('MyAppPublish.ejs');
});

router.get('/AppPublish', function(req, res, next) {
    res.render('AppPublish.ejs');
});

router.get('/AppList', function(req, res, next) {
    res.render('AppList.ejs');
});

router.get('/Appinfo', function(req, res, next) {
    res.render('Appinfo.ejs');
});


module. exports = router;
