adminApp.controller('AppList.controller', ['$scope','appFactory','serviceFactory','userServiceFactory','recommendFactory', function ($scope,appFactory,serviceFactory,userServiceFactory,recommendFactory) {
    console.log('in AppList.controller');


    $scope.appList =[];

    initList();
    function initList() {
        appFactory.get({},function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                $scope.appList = result.obj;
            }
            else {
                $scope.error = false;
                console.log(result.code);
            }
        })
    }

    $scope.toInfo = function (id) {
        window.location.href="/HospitalServicePlatform/admin/#/Appinfo?id="+id;
    }


    $(".search").mouseenter(function () {
        $(".search").animate({width:"300px"},300,function () {
            $(".search").attr('placeholder','请输入搜索内容');
            $(".search").mouseleave(function () {
                $(".search").val("");
                $(".search").animate({width:"80px"},300);
                $(".search").attr('placeholder','');
            })
        })
    })

    $scope.search=function(){
        var code = event.keyCode;
        if(code == 13){
            if($scope.searchContent!=""){
                appFactory.get({'appName':$scope.searchContent},function (result) {
                    if (result.code == '200') {
                        $scope.error = false;
                        console.log(result.obj);
                        $scope.appList = result.obj;
                    }
                    else {
                        $scope.error = false;
                        console.log(result.code);
                    }
                });

            }
            else{
                appFactory.get({},function (result) {
                    if (result.code == '200') {
                        $scope.error = false;
                        console.log(result.obj);
                        $scope.appList = result.obj;
                    }
                    else {
                        $scope.error = false;
                        console.log(result.code);
                    }
                });
            }
        }
    }

}]);