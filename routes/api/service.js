var express = require('express');
var router = express.Router();
var serviceCtrl = require('../../controller/controller.service.js');

router.post('/create', function (req, res) {
    serviceCtrl.create(req.body, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});

router.post('/update', function (req, res) {
    serviceCtrl.update(req.body, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});

router.post('/delete', function (req, res) {
    serviceCtrl.delete(req.body, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});

router.get('/getAll', function (req, res) {
    serviceCtrl.get(req.query, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});


router.get('/get', function (req, res) {
    serviceCtrl.getU(req.query, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});

router.get('/getOr', function (req, res) {
    serviceCtrl.getOr(req.query, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});


router.get('/getVision',function (req, res) {
    serviceCtrl.getVision(req.query, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
})

router.get('/serviceApiAddress',function (req, res) {
    serviceCtrl.serviceApiAddress(req.query, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
})

module.exports = router;