adminApp.factory("indexFactory", ['$http', function ($http) {
    var index = {};

    index.getLogin = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/index/getLogin", params, function (response) {
            callback(response);
        })
    };
    index.update = function (params, callback) {
        angularHttpPost($http, "/HospitalServicePlatform/api/index/update", params, function (response) {
            callback(response);
        })
    };

    index.delete = function (params, callback) {
        angularHttpPost($http, "/HospitalServicePlatform/api/index/delete", params, function (response) {
            callback(response);
        })
    };
   

    return index;
}]);