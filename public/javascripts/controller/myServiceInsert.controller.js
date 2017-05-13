mainApp.controller('myServiceInsert.controller', ['$scope','serviceFactory','userServiceFactory','recommendFactory', function ($scope,serviceFactory,userServiceFactory,recommendFactory) {
    console.log('in myServiceInsert.controller');
    $scope.serviceList = [];
    $scope.osusumeItem = [];
    $scope.serviceVison = [];
    var initOsusumeParams = {};
    var selected_value =[];
    var uid;
    var arr_uid,reg_uid=new RegExp("(^| )"+"uid"+"=([^;]*)(;|$)");
    arr_uid = document.cookie.match(reg_uid);
    uid = arr_uid[2];
    console.log("User ID:"+uid);


    getService();
    function getService() {
        var uid;
        var params = {};
        var arr_uid,reg_uid=new RegExp("(^| )"+"uid"+"=([^;]*)(;|$)");
        arr_uid = document.cookie.match(reg_uid);
        uid = arr_uid[2];
        params.uid = uid;
        params.action = '接入';
        userServiceFactory.get(params,function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                $scope.infoList = result.obj;
                console.log($scope.infoList.length);
                for(var i = 0;i<$scope.infoList.length;i++){
                    serviceFactory.getAll({id:$scope.infoList[i].sid},function (result) {
                        if (result.code == '200') {
                            $scope.error = false;
                            console.log(result.obj);
                            $scope.serviceList.push(result.obj[0]);
                        }
                    })
                }
                console.log($scope.serviceList);

            }
            else {
                $scope.error = false;
                console.log(result.code);
            }
        })
    }

    $scope.toInfo1 = function () {
        alert(1);
    }

    $scope.selected = function (index) {
        console.log(selected_value.indexOf(index));
        if(selected_value.indexOf(index)<0){
            console.log("push");
            selected_value.push(index);
        }else if(selected_value.indexOf(index)>=0)
            selected_value.splice(selected_value.indexOf(index),1);
        console.log(selected_value);
    }


    $scope.toDeleteService = function () {
        console.log('delete')
        var params = {};
        var length = selected_value.length;
        // for(var i=0;i<length;i++){
        params.uid=uid;
        params.sid=selected_value;
        params.action='接入';
        console.log(params);
        userServiceFactory.delete(params,function (result) {});
        location.reload();
    }

    initOsusume();
    function initOsusume() {
        var params_t = {};
        params_t.uid = uid;
        recommendFactory.get(params_t,function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                initOsusumeParams.name = result.obj[0].searchKeyword;
            }
            recommendFactory.getVisited(params_t,function (result) {
                if (result.code == '200') {
                    $scope.error = false;
                    console.log(result.obj);
                    initOsusumeParams.developer = result.obj[0].visitedName;
                    console.log(initOsusumeParams);
                    serviceFactory.getOr(initOsusumeParams,function (result) {
                        if (result.code == '200') {
                            $scope.error = false;
                            console.log(result.obj);
                            $scope.osusumeItem = result.obj;
                        }
                    })
                }
            })
        })
    }

    $scope.toInfo = function (index) {
        window.location.href="/HospitalServicePlatform/main/#/ServiceInsert/serviceInfo?id="+index;
    }

    $scope.showvision = function () {
        $scope.serviceVision = []
    }

    initOsusume();
    function initOsusume() {
        var params_t = {};
        params_t.uid = uid;
        recommendFactory.get(params_t,function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                if(result.obj.length>0)
                    initOsusumeParams.name = result.obj[0].searchKeyword;
                else{
                    initOsusumeParams.name = " "
                }
            }
            recommendFactory.getVisited(params_t,function (result) {
                if (result.code == '200') {
                    $scope.error = false;
                    console.log(result.obj);
                    if(result.obj.length>0)
                        initOsusumeParams.developer = result.obj[0].visitedName;
                    else{
                        initOsusumeParams.developer=" "
                    }
                    console.log(initOsusumeParams);
                    serviceFactory.getOr(initOsusumeParams,function (result) {
                        if (result.code == '200') {
                            $scope.error = false;
                            console.log(result.obj);
                            $scope.osusumeItem = result.obj;
                        }
                    })
                }
            })
        })


    }
}]);