var express = require('express');
var router = express.Router();
var userServiceCtrl = require('../../controller/controller.userService.js');

router.post('/create', function (req, res) {
    userServiceCtrl.create(req.body, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});

router.get('/get', function (req, res) {
    userServiceCtrl.get(req.query, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});

router.post('/delete', function (req, res) {
    console.log('fuck');
    userServiceCtrl.delete(req.body, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});
module.exports = router;