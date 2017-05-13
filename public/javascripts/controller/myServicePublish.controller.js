mainApp.controller('myServicePublish.controller', ['$scope','serviceFactory','userServiceFactory','recommendFactory', function ($scope,serviceFactory,userServiceFactory,recommendFactory) {
    console.log('in myServicePublish.controller');
    $scope.serviceList=[{}];
    var selected_value =[];
    $scope.osusumeItem = [];
    var initOsusumeParams = {};
    getService();
    var uid;
    var arr_uid,reg_uid=new RegExp("(^| )"+"uid"+"=([^;]*)(;|$)");
    arr_uid = document.cookie.match(reg_uid);
    uid = arr_uid[2];

    function getService() {
        var uid;
        var arr_uid,reg_uid=new RegExp("(^| )"+"uid"+"=([^;]*)(;|$)");
        arr_uid = document.cookie.match(reg_uid);
        uid = arr_uid[2];
        console.log(uid);
        var params ={};
        params.developerID = uid;
        serviceFactory.getAll(params,function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                $scope.serviceList = result.obj;
                console.log($scope.serviceList);
            }
            else {
                $scope.error = false;
                console.log(result.code);
            }
        })
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

    $scope.toInfo = function (index) {
        window.location.href="/HospitalServicePlatform/main/#/MyServicePublish/serviceInfo?id="+index;
    }
    
    $scope.toDeleteService = function () {
        console.log('delete')
        var params = {};
        var length = selected_value.length;
        // for(var i=0;i<length;i++){
        params.uid=uid;
        params.sid=selected_value;
        params.action='发布';
        console.log(params);
        userServiceFactory.delete(params,function (result) {});
        serviceFactory.delete(params,function (result) {});
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