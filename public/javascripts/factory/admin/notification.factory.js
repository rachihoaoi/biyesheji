adminApp.factory("notificationFactory", ['$http', function ($http) {
    var notification = {};

    notification.create = function (params, callback) {
        angularHttpPost($http, "/HospitalServicePlatform/api/notification/create", params, function (response) {
            callback(response);
        })
    };

    notification.update = function (params, callback) {
        angularHttpPost($http, "/HospitalServicePlatform/api/notification/update", params, function (response) {
            callback(response);
        })
    };


    notification.get = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/notification/get", params, function (response) {
            callback(response);
        })
    };

    notification.getUnreadNum = function (params, callback) {
        angularHttpGet($http, "/HospitalServicePlatform/api/notification/getUnreadNum", params, function (response) {
            callback(response);
        })
    };
    
    

    return notification;
}]);