
var util = require("../utils/util.js");
var express = require('express');
var session = require('express-session');
var async = require('async');
var router = express.Router();
module.exports = {
    getInfo:function (req,res,params,cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        models.user.find(params,function (err, data) {
            console.log('start');
            console.log(err);
            if (err || !data) {
                var err = new Error();
                err.status = 500;
                err.message = '系统错误';
                cb(err, null);
                return;
            }
            if(params.name==data[0].name)
                req.session.uid=params.name;
            cb(null, util.getSuccessRes(data));
            console.log(params.name);
            console.log(data[0].name);

            console.log(req);
            console.log("session:"+req.session.uid);
        });
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


        models.user.update({'id': params.id},{'status': params.status}, function (err, data) {
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

    delete:function (params, cb) {
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
            models.user.destroy({'id':params.sid}, function (err, data) {
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

    },
    
}