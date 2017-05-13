var express = require('express');
var router = express.Router();
var notificationCtrl = require('../../controller/controller.notification.js');


router.get('/get', function (req, res) {
    notificationCtrl.get(req.query, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});

router.post('/update', function (req, res) {
    notificationCtrl.update(req.body, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});


router.get('/getUnreadNum', function (req, res) {
    notificationCtrl.getUnreadNum(req.query, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});

module.exports = router;