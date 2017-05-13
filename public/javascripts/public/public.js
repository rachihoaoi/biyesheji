function angularHttpPost($http, url, formData, callBack) {
    $http({
        method: 'POST',
        url: url,
        data: formData
    }).success(function (data) {
        callBack(data);
    }).error(function (data) {
        callBack(data)
    });
}

function angularHttpGet($http, url, params, callBack) {
    $http({
        method: 'GET',
        url: url,
        params: params
    }).success(function (data) {
        callBack(data);
    }).error(function (data) {
        callBack(data)
    });
}