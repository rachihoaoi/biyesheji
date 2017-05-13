mainApp.factory("serviceFactory", ['$http', function ($http) {
    var service = {};

    service.create = function (params, callback) {
        angularHttpPost($http, "/HospitalServicePlatform/api/service/create", params, function (response) {
            callback(response);
        })
    };

    service.delete = function (params, callback) {
        angularHttpPost($http, "/HospitalServicePlatform/api/service/delete", params, function (response) {
            callback(response);
        })
    };


    service.getAll = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/service/getAll", params, function (response) {
            callback(response);
        })
    };

    service.getOr = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/service/getOr", params, function (response) {
            callback(response);
        })
    };

    service.get = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/service/get", params, function (response) {
            callback(response);
        })
    };

    service.getVision = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/service/getVision", params, function (response) {
            callback(response);
        })
    };


    service.serviceApiAddress = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/service/serviceApiAddress", params, function (response) {
            callback(response);
        })
    };
    
    

    return service;
}]);