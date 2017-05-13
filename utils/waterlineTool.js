
var util = require('./util');
var mysqlAdapter = require('sails-mysql');
var conf = require('config');
var user = require('../po/user.js');
var service = require('../po/service.js');
var user_service = require('../po/userService.js');
var notification = require('../po/notification.js');
var visitstatistic = require('../po/visitStatistic.js');
var serviceamountstatistic = require('../po/serviceamountstatistic.js');
var appamountstatistic = require('../po/appamountstatistic.js');
var usersearched = require('../po/usersearched.js');
var uservisited = require('../po/uservisited.js');
var app = require('../po/app.js');
// var deviceStatus = require('../po/device.js');
// var cloudPlatform = require('../po/cloud.js');
// var product = require('../po/product.js');
// var regionalPromotion = require('../po/regional.js');

var isInit = false;
var mysqlConfig = conf.get("mysqlConfig");

exports.loadPo = function () {

    if (isInit) return;
    console.log('initializing database...');

    util.waterline.loadCollection(user);
    util.waterline.loadCollection(service);
    util.waterline.loadCollection(user_service);
    util.waterline.loadCollection(notification);
    util.waterline.loadCollection(visitstatistic);
    util.waterline.loadCollection(serviceamountstatistic);
    util.waterline.loadCollection(usersearched);
    util.waterline.loadCollection(uservisited);
    util.waterline.loadCollection(app);
    util.waterline.loadCollection(appamountstatistic);
    // util.waterline.loadCollection(deviceStatus);
    // util.waterline.loadCollection(cloudPlatform);
    // util.waterline.loadCollection(product);
    // util.waterline.loadCollection(regionalPromotion);

    isInit = true;
};

exports.initDatabase = function () {
    var config = {
        adapters: {
            mysql: mysqlAdapter,
            default: 'mysql'
        },
        connections: {
            mysql: {
                adapter: 'mysql',
                host: mysqlConfig.ip,
                port: mysqlConfig.port,
                database: mysqlConfig.database,
                user: mysqlConfig.user,
                password: mysqlConfig.password,
                charset: 'utf8',
                collation: 'utf8_general_ci'
            }
        },
        defaults: {
            migrate: 'alter'
        }
    };

    util.waterline.initialize(config, function (err, ontology) {
        if (err) {
            return console.error(err);
        }

        util.models = ontology.collections;
        console.log('database initialized!');
    });
};