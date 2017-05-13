var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('admin/main.ejs');
});

router.get('/ServiceManager', function(req, res, next) {
    res.render('admin/ServiceManager.ejs');
});

router.get('/ServiceList', function(req, res, next) {
    res.render('admin/ServiceList.ejs');
});

router.get('/UserManager', function(req, res, next) {
    res.render('admin/UserManager.ejs');
});

router.get('/UserList', function(req, res, next) {
    res.render('admin/UserList.ejs');
});

router.get('/AppList', function(req, res, next) {
    res.render('admin/AppList.ejs');
});

router.get('/AppManager', function(req, res, next) {
    res.render('admin/AppManager.ejs');
});

router.get('/Appinfo', function(req, res, next) {
    res.render('admin/Appinfo.ejs');
});


router.get('/statisticsMain', function(req, res, next) {
    res.render('admin/statisticsMain.ejs');
});

router.get('/statisticsService', function(req, res, next) {
    res.render('admin/statisticsService.ejs');
});

router.get('/statisticsApp', function(req, res, next) {
    res.render('admin/statisticsApp.ejs');
});

router.get('/statisticsUser', function(req, res, next) {
    res.render('admin/statisticsUser.ejs');
});

router.get('/NotificationManager', function(req, res, next) {
    res.render('admin/NotificationManager.ejs');
});

router.get('/NotificationPublish', function(req, res, next) {
    res.render('admin/NotificationPublish.ejs');
});
module. exports = router;