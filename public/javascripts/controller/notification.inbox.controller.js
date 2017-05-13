
mainApp.controller('notification.inbox.controller', ['$scope','serviceFactory','userServiceFactory', function ($scope,serviceFactory,userServiceFactory) {
    console.log('in notification.inbox.controller');
    $scope.from = 'rachihoaoi';
    $scope.mailList = [{},{},{},{},{},{},{},{},{}];
    $scope.sentNotifiction_click = function (id) {
        this.id = id;
        $('#'+ this.id).animate({opacity:0},250,function () {
            window.location.href="/HospitalServicePlatform/main/#/ServicePublish";
        })
    }


    $(document).ready(function () {
        $(".nano").mouseenter(function () {
            $(".nano").nanoScroller();
            $(".nano-slider").fadeIn(300);
        })
    })

}]);
