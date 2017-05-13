adminApp.factory("userServiceFactory", ['$http', function ($http) {
    var userService = {};

    userService.create = function (params, callback) {
        angularHttpPost($http, "/HospitalServicePlatform/api/userService/create", params, function (response) {
            callback(response);
        })
    };

    userService.get = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/userService/get", params, function (response) {
            callback(response);
        })
    };

    userService.delete = function (params, callback) {
        angularHttpPost($http, "/HospitalServicePlatform/api/userService/delete", params, function (response) {
            callback(response);
        })
    };
    return userService;
}]);