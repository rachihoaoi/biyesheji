var util = require("../utils/util.js");
var express = require('express');
var session = require('express-session');
var async = require('async');
var router = express.Router();


module.exports = {

    /*
     方法： XXX
     参数： XXX
     */
    getVisit: function (params, cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        models.visitstatistic.find(params)
            .limit(7)
            .sort ('time DESC')
            .exec(function (err, data) {
                if (err || !data) {
                    var err = new Error();
                    err.status = 500;
                    err.message = '系统错误';
                    cb(err, null);
                    return;
                }

                cb(null, util.getSuccessRes(data));
            })
        
    },

    getServiceAmount: function (params, cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        models.serviceamountstatistic.find(params)
            .limit(15)
            .sort ('time DESC')
            .exec(function (err, data) {
                if (err || !data) {
                    var err = new Error();
                    err.status = 500;
                    err.message = '系统错误';
                    cb(err, null);
                    return;
                }

                cb(null, util.getSuccessRes(data));
            })

    },

    getAppAmount: function (params, cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        models.appamountstatistic.find(params)
            .limit(15)
            .sort ('time DESC')
            .exec(function (err, data) {
                if (err || !data) {
                    var err = new Error();
                    err.status = 500;
                    err.message = '系统错误';
                    cb(err, null);
                    return;
                }

                cb(null, util.getSuccessRes(data));
            })

    },

    create: function (params, cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        // if(!params.count) {
        //     cb(null, util.getErrorRes('400','缺少必要参数'));
        //     return;
        // }

        models.visitstatistic.create({
            'id': params.id,
            'uid':params.uid,
            'sid':params.sid,
            'action':params.action
        },function(err, data) {

            if (err || !data) {
                var err = new Error();
                err.status = 500;
                err.message = '系统错误';
                cb(err, null);
                return;
            }

            cb(null, util.getSuccessRes(data));
        });
    },

    update: function (params, cb) {
        var models = util.models;
        console.log(params);
        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }
        

        models.visitstatistic.update({'id': params.id},{'value': params.value}, function (err, data) {
            if (err || !data) {
                var err = new Error();
                err.status = 500;
                err.message = '系统错误';
                cb(err, null);
                return;
            }

            cb(null, util.getSuccessRes());
        });
    },

    updateServiceAmount: function (params, cb) {
        var models = util.models;
        console.log(params);
        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }


        models.serviceamountstatistic.update({'id': params.id},{'value': params.value}, function (err, data) {
            if (err || !data) {
                var err = new Error();
                err.status = 500;
                err.message = '系统错误';
                cb(err, null);
                return;
            }

            cb(null, util.getSuccessRes());
        });
    },

    updateAppAmount: function (params, cb) {
        var models = util.models;
        console.log(params);
        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }


        models.appamountstatistic.update({'id': params.id},{'value': params.value}, function (err, data) {
            if (err || !data) {
                var err = new Error();
                err.status = 500;
                err.message = '系统错误';
                cb(err, null);
                return;
            }

            cb(null, util.getSuccessRes());
        });
    },

    getUserNum: function (params, cb) {
        var models = util.models;
        console.log("params"+params);
        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }


        models.user.count(params,function (err, data) {
            if (err || !data) {
                console.log(data);
                cb(null, util.getSuccessRes(data));
                return;
            }
            console.log(data);
            cb(null, util.getSuccessRes(data));
        });
    },

    getServiceNum: function (params, cb) {
        var models = util.models;
        console.log("params"+params);
        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }


        models.service.count(params,function (err, data) {
            if (err || !data) {
                console.log("???"+data);
                var err = new Error();
                err.status = 500;
                err.message = '系统错误';
                cb(err, null);
                return;
            }
            console.log(data);
            cb(null, util.getSuccessRes(data));
        });
    },

};