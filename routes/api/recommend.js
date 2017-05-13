var express = require('express');
var router = express.Router();
var recommendCtrl = require('../../controller/controller.recommend.js');

router.post('/create', function (req, res) {
    recommendCtrl.create(req.body, function (err, result) {
        console.log(req.body);
        if (err) throw err;
        res.send(result);

    });
});

router.post('/createVisited', function (req, res) {
    recommendCtrl.createVisited(req.body, function (err, result) {
        console.log(req.body);
        if (err) throw err;
        res.send(result);

    });
});

router.post('/update', function (req, res) {
    recommendCtrl.update(req.body, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});

router.post('/updateVisited', function (req, res) {
    recommendCtrl.updateVisited(req.body, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});


router.get('/get', function (req, res) {
    recommendCtrl.get(req.query, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});



router.get('/getVisited', function (req, res) {
    recommendCtrl.getVisited(req.query, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});



module.exports = router;