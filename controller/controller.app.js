var util = require("../utils/util.js");
var express = require('express');
var session = require('express-session');
var async = require('async');
var router = express.Router();


module.exports = {
    get: function (params, cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        models.app.find(params)
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

    create:function (params,cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }
        models.app.create(params,function(err, data) {

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

    getOr: function (params, cb) {
        var models = util.models;
        console.log(params);
        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        models.app.find({
            or : [
                { appName: {'contains' : params.name}},
                { appDeveloper: params.developer }
            ]
        }, function (err, data) {
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


};