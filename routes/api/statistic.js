var express = require('express');
var router = express.Router();
var statisticCtrl = require('../../controller/controller.statistic.js');
var serviceCtrl = require('../../controller/controller.service.js');
var async = require('async');
router.get('/getVisit', function (req, res) {
    statisticCtrl.getVisit(req.query, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});

router.get('/getServiceAmount', function (req, res) {
    statisticCtrl.getServiceAmount(req.query, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});

router.get('/getAppAmount', function (req, res) {
    statisticCtrl.getAppAmount(req.query, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});

router.get('/getUserNum', function (req, res) {
    statisticCtrl.getUserNum(req.query, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});

router.get('/getServiceNum', function (req, res) {
    statisticCtrl.getServiceNum(req.query, function (err, result) {
        if (err) throw err;
        res.send(result);

    });
});

router.post('/add', function (req, res) {
    statisticCtrl.update(req.body, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

router.post('/addServiceAmount', function (req, res) {
    statisticCtrl.updateServiceAmount(req.body, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

router.post('/addAppAmount', function (req, res) {
    statisticCtrl.updateAppAmount(req.body, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});



router.get('/countServiceType', function (req, res) {
    async.auto({
        countPost:function (cb) {
            serviceCtrl.countPost(req.query, function (err, result) {
                cb(err,result);
            });
        },
        countPut:function (cb) {
            serviceCtrl.countPut(req.query, function (err, result) {
                cb(err, result);
            });
        },
        countDelete:function (cb) {
            serviceCtrl.countDelete(req.query, function (err, result) {
                cb(err, result);
            });
        },
        countGet:function (cb) {
            serviceCtrl.countGet(req.query, function (err, result) {
                cb(err,result);
            });
        }
    }, function (err, results) {
        res.send(results);
    });
});

router.get('/countParamType', function (req, res) {
    async.auto({
        countHeader:function (cb) {
            serviceCtrl.countHeader(req.query, function (err, result) {
                cb(err,result);
            });
        },
        countParams:function (cb) {
            serviceCtrl.countParams(req.query, function (err, result) {
                cb(err, result);
            });
        },
        countPath:function (cb) {
            serviceCtrl.countPath(req.query, function (err, result) {
                cb(err, result);
            });
        },
        countFromData:function (cb) {
            serviceCtrl.countFromData(req.query, function (err, result) {
                cb(err, result);
            });
        },
        countRaw:function (cb) {
            serviceCtrl.countRaw(req.query, function (err, result) {
                cb(err,result);
            });
        }
    }, function (err, results) {
        res.send(results);
    });
});

module.exports = router;