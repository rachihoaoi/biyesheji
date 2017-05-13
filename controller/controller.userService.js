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

        models.user_service.find(params, function (err, data) {
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
        console.log(params.sid);
        for(var i=0;i<params.sid.length;i++){
            models.user_service.create({
                'id': params.id,
                'uid':params.uid,
                'sid':params.sid[i],
                'action':params.action
            },function(err, data) {

                if (err || !data) {
                    var err = new Error();
                    err.status = 500;
                    err.message = '系统错误';
                    cb(err, null);
                    return;
                }

                // cb(null, util.getSuccessRes(data));
            });
        }

    },

    update: function (params, cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        if(!params.count || !params.id) {
            cb(null, util.getErrorRes('400','缺少必要参数'));
            return;
        }

        models.user_service.update({'id': params.id},{'count': params.count}, function (err, data) {
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

    delete: function (params, cb) {
        var models = util.models;
        console.log('fuck');
        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }
        console.log('fuck2');
        console.log('fuck3');
        console.log(params)
        for(var i=0;i<params.sid.length;i++){
            models.user_service.destroy(params, function (err, data) {
                console.log("delete")
                if (err || !data) {
                    var err = new Error();
                    err.status = 500;
                    err.message = '系统错误';
                    cb(err, null);
                    return;
                }
            });
        }

    }

};