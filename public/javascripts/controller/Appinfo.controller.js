mainApp.controller('AppInfo.controller', ['$scope','appFactory','serviceFactory','userServiceFactory','recommendFactory', function ($scope,appFactory,serviceFactory,userServiceFactory,recommendFactory) {
    console.log('in AppInfo.controller');

    $scope.iconPath = null;
    $scope.sc1 = null;
    $scope.sc2 = null;
    $scope.sc3 = null;
    $scope.appName = null;
    $scope.appOS = null;
    $scope.appDeveloper = null;
    $scope.appKind = null;
    $scope.appVision = null;
    $scope.appLanguage = null;
    $scope.appInfo = null;
    $scope.appDownloadPath = null;
    var str=location.href; //获取本页url地址
    var arr=str.split("?");
    var str1 = arr[1];
    var id=str1.split("=")[1];
    console.log(id);
    params = {};
    params.id = id
    appFactory.get(params,function (result) {
        if (result.code == '200') {
            $scope.error = false;
            console.log(result.obj);
            $scope.iconPath = result.obj[0].appIcon;
            $scope.appOS = result.obj[0].appOS;
            $scope.appDeveloper = result.obj[0].appDeveloper;
            $scope.appKind = result.obj[0].appType;
            $scope.appVision = result.obj[0].appVersion;
            $scope.appLanguage = result.obj[0].appLanguage;
            $scope.appDownloadPath = result.obj[0].appDownload;
            $scope.appInfo = result.obj[0].appInfo;
            $scope.appName = result.obj[0].appName;
            $scope.sc1 = result.obj[0].appPic1;
            $scope.sc2 = result.obj[0].appPic2;
            $scope.sc3 = result.obj[0].appPic3;
            $('#sc1').css("backgroundImage","url( "+$scope.sc1+")");
            $('#sc2').css("backgroundImage","url( "+$scope.sc2+")");
            $('#sc3').css("backgroundImage","url( "+$scope.sc3+")");
            if($scope.appDownloadPath!=null){
                var qrcode = new QRCode(document.getElementById("qrcode"), {
                    width : 150,//设置宽高
                    height : 150
                });
                qrcode.makeCode($scope.appDownloadPath);
            }
        }
        else {
            $scope.error = false;
            console.log(result.code);
        }
    })

    $scope.download = function () {
        window.location="http://localhost:3008/images/imgServer/524220_screenshots_20170329220526_1.jpg";
    }

    $scope.back = function () {
        window.location="http://localhost:3008/HospitalServicePlatform/main/#/AppList";
    }
}]);