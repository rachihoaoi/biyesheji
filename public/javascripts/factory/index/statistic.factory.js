indexApp.factory("statisticFactory", ['$http', function ($http) {
    var statistic = {};

    statistic.getVisit = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/statistic/getVisit", params, function (response) {
            callback(response);
        })
    };

  

    statistic.add = function (params, callback) {
        angularHttpPost($http, "/HospitalServicePlatform/api/statistic/add", params, function (response) {
            callback(response);
        })
    };


    return statistic;
}]);