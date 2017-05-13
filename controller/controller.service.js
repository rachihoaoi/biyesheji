var util = require("../utils/util.js");
var express = require('express');
var session = require('express-session');
var async = require('async');
var router = express.Router();
var agent = require('superagent');

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

        models.service.find(params, function (err, data) {
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
            models.service.destroy({'id':params.sid}, function (err, data) {
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

        models.service.find({
            or : [
                { name: {'contains' : params.name}},
                { developer: params.developer }
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

    getVision:function (params,cb) {

        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        models.service.find(params, function (err, data) {
            if (err || !data) {
                var err = new Error();
                err.status = 500;
                err.message = '系统错误';
                cb(err, null);
                return;
            }
            console.log(util.getSuccessRes(data).obj[0].info);
            var url1 ="http://news-at.zhihu.com/api/4/news/before/"+util.getSuccessRes(data).obj[0].info;
            agent
                .get(url1)
                .query(params)
                .end(function (err, response) {
                    cb(err, response.text);
                });
        });


    },

    serviceApiAddress:function (params,cb) {
        console.log(params)
        var models = util.models;
        var uid = params.uid;
        delete params.uid;
        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }
        models.service.find(params, function (err, data) {
            var t=0;
            if (err || !data) {
                var err = new Error();
                err.status = 500;
                err.message = '系统错误';
                cb(err, null);
                return;
            }
            console.log(util.getSuccessRes(data).obj[0].id);
            models.user_service.find({
                'uid':uid,
                'sid':util.getSuccessRes(data).obj[0].id
            },function (err, data) {
                console.log("test"+util.getSuccessRes(data).obj.length)
                if (err || util.getSuccessRes(data).obj.length==0) {
                    cb(null, "未授权的用户");
                    t=1;
                    return;
                }
            })
            if(t==0){
                var param = params;
                console.log(params);
                delete param.apiAddr;
                console.log(param);
                var url1 =util.getSuccessRes(data).obj[0].address;
                agent
                    .get(url1)
                    .query(params)
                    .end(function (err, response) {
                        cb(err, response.text);
                    });
            }
        });


    },

    getU: function (params, cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        models.service.contains(params, function (err, data) {
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
        
        models.service.create({
            'name': params.name,
            'address':params.address,
            'developer':params.developer,
            'developerID':params.developerID,
            'requestMethod':params.requestMethod,
            'info':params.info,
            'returnSample':params.returnSample,
            'paramType':params.paramType,
            'paramValue':params.paramValue,
            'bodyParamType':params.bodyParamType,
            'vision':params.vision,
            'apiAddr':params.apiAddr,
            'status':params.status
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

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }


        models.service.update({'id': params.id},{'status': params.status}, function (err, data) {
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

    countPut: function (params, cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        models.service.count(params)
            .where({ requestMethod: 'PUT'})
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

    countPost: function (params, cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        models.service.count(params)
            .where({ requestMethod: 'POST'})
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

    countGet: function (params, cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        models.service.count(params)
            .where({ requestMethod: 'GET'})
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

    countDelete: function (params, cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        models.service.count(params)
            .where({ requestMethod: 'DELETE'})
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

    countHeader: function (params, cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        models.service.count(params)
            .where({ paramType: 'Header'})
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

    countParams: function (params, cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        models.service.count(params)
            .where({ paramType: 'Params'})
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

    countPath: function (params, cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        models.service.count(params)
            .where({ paramType: 'Path'})
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

    countFromData: function (params, cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        models.service.count(params)
            .where({ paramType: 'from-data'})
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

    countRaw: function (params, cb) {
        var models = util.models;

        if (!models) {
            var err = new Error();
            err.status = 500;
            err.message = '数据库连接失败';
            cb(err, null);
            return;
        }

        models.service.count(params)
            .where({ paramType: 'raw'})
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


};