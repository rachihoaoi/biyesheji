mainApp.factory("appFactory", ['$http', function ($http) {
    var app = {};

    app.create = function (params, callback) {
        angularHttpPost($http, "/HospitalServicePlatform/api/app/create", params, function (response) {
            callback(response);
        })
    };


    app.get = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/app/get", params, function (response) {
            callback(response);
        })
    };

    app.getOr = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/app/getOr", params, function (response) {
            callback(response);
        })
    };
    

    return app;
}]);