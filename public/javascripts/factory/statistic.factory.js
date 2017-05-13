mainApp.factory("statisticFactory", ['$http', function ($http) {
    var statistic = {};

    statistic.getVisit = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/statistic/getVisit", params, function (response) {
            callback(response);
        })
    };

    statistic.getServiceAmount = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/statistic/getServiceAmount", params, function (response) {
            callback(response);
        })
    };

    statistic.getAppAmount = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/statistic/getAppAmount", params, function (response) {
            callback(response);
        })
    };

    statistic.add = function (params, callback) {
        angularHttpPost($http, "/HospitalServicePlatform/api/statistic/add", params, function (response) {
            callback(response);
        })
    };

    statistic.addServiceAmount =function (params,callback){
        angularHttpPost($http, "/HospitalServicePlatform/api/statistic/addServiceAmount", params, function (response) {
            callback(response);
        })
    }

    statistic.addAppAmount =function (params,callback){
        angularHttpPost($http, "/HospitalServicePlatform/api/statistic/addAppAmount", params, function (response) {
            callback(response);
        })
    }
    

    statistic.countServiceType = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/statistic/countServiceType", params, function (response) {
            callback(response);
        })
    };

    statistic.countParamType = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/statistic/countParamType", params, function (response) {
            callback(response);
        })
    };


    return statistic;
}]);