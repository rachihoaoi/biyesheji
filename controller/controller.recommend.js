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
    get: function (params, cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        models.usersearched.find(params)
            .limit(1)
            .sort ('serachTime DESC')
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

    getVisited: function (params, cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        models.uservisited.find(params)
            .limit(1)
            .sort ('visitedTime DESC')
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

        models.usersearched.create({
            'uid':params.uid,
            'searchKeyword':params.searchKeyword,
            'serachTime':params.serachTime
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

    createVisited: function (params, cb) {
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

        models.uservisited.create({
            'uid':params.uid,
            'visitedName':params.visitedName,
            'visitedTime':params.visitedTime
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


        models.usersearched.update({'uid':params.uid, 'searchKeyword':params.searchKeyword},{'serachTime':params.serachTime}, function (err, data) {
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

    updateVisited: function (params, cb) {
        var models = util.models;
        console.log(params);
        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }


        models.uservisited.update({'uid':params.uid, 'visitedName':params.visitedName,},{ 'visitedTime':params.visitedTime}, function (err, data) {
            if (err || !data) {
                var err = new Error();
                err.status = 500;
                err.message = '系统错误';
                cb(err, null);
                return;
            }

            cb(null, util.getSuccessRes());
        });
    }
};