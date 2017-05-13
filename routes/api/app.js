var express = require('express');
var router = express.Router();
var appCtrl = require('../../controller/controller.app.js');

router.get('/get', function (req, res) {
    appCtrl.get(req.query, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});

router.post('/create', function (req, res) {
    appCtrl.create(req.body, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});

router.get('/getOr', function (req, res) {
    appCtrl.getOr(req.query, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});


module.exports = router;