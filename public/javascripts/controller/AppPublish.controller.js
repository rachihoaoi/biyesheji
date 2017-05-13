mainApp.controller('AppPublish.controller', ['$scope','Upload','$timeout','appFactory','statisticFactory','userServiceFactory','recommendFactory', function ($scope,Upload,$timeout,appFactory,statisticFactory,userServiceFactory,recommendFactory) {
    console.log('in AppPublish.controller');
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    var time=year+'\_'+month+'\_'+day;
    console.log(time);
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
    var uid;
    var arr_uid,reg_uid=new RegExp("(^| )"+"uid"+"=([^;]*)(;|$)");
    arr_uid = document.cookie.match(reg_uid);
    uid = arr_uid[2];
    $scope.toSave = function () {
        console.log($scope.iconPath+""+$scope.sc1+""+$scope.sc2+""+$scope.sc3+""+$scope.appName+""+$scope.appOS+""+$scope.appDeveloper+""+$scope.appKind+""+$scope.appVision+""+$scope.appVision+""+$scope.appLanguage+""+$scope.appInfo+""+$scope.appDownloadPath);
        params = {};
        params.appName = $scope.appName;
        params.appDeveloper = $scope.appDeveloper;
        params.appOS = $scope.appOS;
        params.appType = $scope.appKind;
        params.appVersion = $scope.appVision;
        params.appLanguage = $scope.appLanguage;
        params.appInfo = $scope.appInfo;
        params.appPic1 = $scope.sc1;
        params.appPic2 = $scope.sc2;
        params.appPic3 = $scope.sc3;
        params.appFile = $scope.appDownloadPath;
        params.appDownload = $scope.appDownloadPath;
        params.appIcon = $scope.iconPath;
        params.did = uid;
        params.status = '待审核';
        appFactory.create(params,function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                alert("保存成功");
                statisticFactory.getAppAmount({"time":time},function (result) {
                    console.log(result.obj);
                    if(result.obj.length==1){
                        statisticFactory.addAppAmount({
                            "id":result.obj[0].id,
                            'value':result.obj[0].value+1
                        },function (result) {
                            if (result.code == '200') {
                                $scope.error = false;
                                console.log(result.obj);
                            }
                            else {
                                $scope.error = false;
                                console.log(result.code);
                            }
                        })
                    }
                    else{
                        console.log("database error!")
                    }
                })
                window.location.href="http://localhost:3008/HospitalServicePlatform/main/#/AppList";
            }
            else {
                $scope.error = false;
                console.log(result.code);
            }
        })
    }


    $scope.uploadFiles = function (file, errFiles, flag) {
        if(file.length==1){
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            if(errFiles.length > 0) {
                alert("仅支持JPG、GIF、PNG常见图片类型");
                return;
            }
            if (file) {
                file.upload = Upload.upload({
                    url: '/upload',
                    data: {
                        file: file
                    }
                });
                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });

                    if (flag == 0) {
                        $scope.iconPath = '/images/imgServer/'+response.data;
                        $('#icon').css("backgroundImage","url( "+$scope.iconPath+")");

                    }

                    if (flag == 1) {
                        $scope.sc1 = '/images/imgServer/'+response.data;
                        $('#sc1').css("backgroundImage","url( "+$scope.sc1+")");
                    }

                    if (flag == 2) {
                        $scope.sc2 = '/images/imgServer/'+response.data;
                        $('#sc2').css("backgroundImage","url( "+$scope.sc2+")");
                    }

                    if (flag == 3) {
                        $scope.sc3 = '/images/imgServer/'+response.data;
                        $('#sc3').css("backgroundImage","url( "+$scope.sc3+")");
                    }

                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
        }
        else if(file.length>1){
            alert( '只能选择一张图片');
        }
    };
}]);