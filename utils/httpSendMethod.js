
var agent = require('superagent');
var utils = require("../utils/util.js");

exports.httpSendMethod = {
    
    //POST请求方法
    post: function (postUrl, params, cb) {
        if(params.session.uid) {
            params.body.uid = params.session.uid;
            var url = utils.api_request_url + postUrl;
            agent
                .post(url)
                .set('Content-Type', 'application/x-www-form-urlencoded')  // !important
                .send(params.body)
                .end(function (err, response) {
                    try {
                        cb(err, response.text);
                    } catch (err) {
                        var errorMsg
                                = '\n'
                                + 'Error ' + new Date().toISOString()
                                + '\n'
                                + err.stack || err.message || 'unknow error'
                                + '\n'
                            ;
                        cb(err, errorMsg);
                        console.error(errorMsg);
                    }
                });
        } else {
            cb(null, utils.response.loginNo);
        }
    },
    
    //GET请求方法
    get:function (getUrl, params, cb) {
        if(params.session.uid) {
            params.query.uid = params.session.uid;
            var url = utils.api_request_url + getUrl;
            agent
                .get(url)
                .query(params.query)
                .end(function (err, response) {
                    try {
                        cb(err, response.text);
                    } catch (err) {
                        var errorMsg
                                = '\n'
                                + 'Error ' + new Date().toISOString()
                                + '\n'
                                + err.stack || err.message || 'unknow error'
                                + '\n'
                            ;
                        cb(err, errorMsg);
                        console.error(errorMsg);
                    }
                });
        } else {
            cb(null, utils.response.loginNo);
        }
    }
};