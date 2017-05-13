adminApp.factory("recommendFactory", ['$http', function ($http) {
    var recommend = {};

    recommend.create = function (params, callback) {
            angularHttpPost($http, "/HospitalServicePlatform/api/recommend/create", params, function (response) {
            callback(response);
        })
    };

    recommend.createVisited = function (params, callback) {
        angularHttpPost($http, "/HospitalServicePlatform/api/recommend/createVisited", params, function (response) {
            callback(response);
        })
    };

    recommend.update = function (params, callback) {
        angularHttpPost($http, "/HospitalServicePlatform/api/recommend/update", params, function (response) {
            callback(response);
        })
    };

    recommend.updateVisited = function (params, callback) {
        angularHttpPost($http, "/HospitalServicePlatform/api/recommend/updateVisited", params, function (response) {
            callback(response);
        })
    };

    recommend.get = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/recommend/get", params, function (response) {
            callback(response);
        })
    };

    recommend.getVisited = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/recommend/getVisited", params, function (response) {
            callback(response);
        })
    };
    
    

    return recommend;
}]);