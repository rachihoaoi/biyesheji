
var express = require('express');
var router = express.Router();
var conf = require('config');
var indexCtrl = require('../../controller/controller.index.js');

router.get('/getLogin', function (req, res) {

    indexCtrl.getInfo(req,res,req.query, function (err, result) {
        var params = req.query;
        if (err) throw err;
        req.session.test='a';
        res.send(result);

    });
});


router.post('/update', function (req, res) {

    indexCtrl.update(req.body, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

router.post('/delete', function (req, res) {

    indexCtrl.delete(req.body, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});
module.exports = router;