indexApp.factory("indexFactory", ['$http', function ($http) {
    var index = {};

    index.getLogin = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/index/getLogin", params, function (response) {
            callback(response);
        })
    };

    return index;
}]);