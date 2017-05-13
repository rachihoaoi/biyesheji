adminApp.controller('NotificationManager.controller', ['$scope','appFactory','serviceFactory','userServiceFactory','notificationFactory', function ($scope,appFactory,serviceFactory,userServiceFactory,notificationFactory) {
    console.log('in NotificationManager.controller');

    $scope.mailList = [];
    notificationFactory.get({},function (result) {
        if (result.code == '200') {
            $scope.error = false;
            $scope.mailList = result.obj;
            console.log(result.obj);
        }
        else {
            $scope.error = false;
            console.log(result.code);
        }
        $(".nano").nanoScroller();
    });

}]);