mainApp.controller('serviceInfo.controller', ['$scope','serviceFactory','userServiceFactory', function ($scope,serviceFactory,userServiceFactory) {
    console.log('in serviceInfo');
    $scope.headerParams = [{}];
    $scope.queryParams = [{}];
    $scope.pathParams = [{}];
    $scope.bodyParamsFromData = [{}];
    $scope.bodyParamsRaw = [{}];
    var mask=document.getElementById('mask');
    var index1=document.getElementById('params_set1');
    var index2=document.getElementById('params_set2');
    var index3=document.getElementById('params_set3');
    var index4=document.getElementById('params_set4');

    function GetRequest() {
        var str=location.href; //获取本页url地址
        var arr=str.split("?");
        var str1 = arr[1];
        var id=str1.split("=")[1];
        console.log(id);
        params = {};
        params.id=id
        serviceFactory.getAll(params,function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                $scope.ServiceName = result.obj[0].name;
                $scope.ServiceAddr = result.obj[0].address;
                $scope.ServiceCreatorName = result.obj[0].developer;
                $scope.ServicePostMethod = result.obj[0].requestMethod;
                $scope.ServiceDescribe = result.obj[0].info;
                $scope.ServiceReturnFormat = result.obj[0].returnSample;
                $scope.status = result.obj[0].status;
                console.log(result.obj[0].paramValue);
                if(result.obj[0].status=='已发布'){
                    mask.style.zIndex=-999;
                    mask.style.opacity = 0;
                }
                if(result.obj[0].paramType=='Header'){
                    set_index_z(0);
                    $("#params_bk").css("background-color","#aaa893");
                    $scope.headerParams = JSON.parse(result.obj[0].paramValue);
                    console.log($scope.headerParams);
                }
                else if(result.obj[0].paramType=='Params'){
                    set_index_z(1);
                    $("#params_bk").css("background-color","#93917c");
                    $scope.index=2;
                    $scope.queryParams = JSON.parse(result.obj[0].paramValue);
                    console.log($scope.queryParams);
                }
                else if(result.obj[0].paramType=='Path'){
                    set_index_z(2);
                    $("#params_bk").css("background-color","#7c7a65");
                    $scope.index=3;
                    $scope.pathParams = JSON.parse(result.obj[0].paramValue);
                    console.log($scope.pathParams);
                }
                else if(result.obj[0].paramType=='form-data'){
                    set_index_z(3);
                    $("#params_bk").css("background-color","#656256");
                    $scope.index=4;
                    $scope.bodyParamsFromData = JSON.parse(result.obj[0].paramValue);
                    console.log($scope.bodyParamsFromData);
                }
                else if(result.obj[0].paramType=='raw'){
                    set_index_z(3);
                    $("#params_bk").css("background-color","#656256");
                    $scope.index=4;
                    $scope.type = 2;
                    $scope.bodyParamsRaw = JSON.parse(result.obj[0].paramValue);
                    console.log($scope.bodyParamsRaw);
                }
            }
            else {
                $scope.error = false;
                console.log(result.code);
            }
        });
    }
    var Request = new Object();
    Request = GetRequest();

    function set_index_z(i) {
        switch(i){
            case(0):{
                index1.style.zIndex=100;
                index2.style.zIndex=99;
                index3.style.zIndex=98;
                index4.style.zIndex=97;
            }
                break;
            case(1):{
                index1.style.zIndex=99;
                index2.style.zIndex=100;
                index3.style.zIndex=99;
                index4.style.zIndex=98;
            }
                break;
            case(2):{
                index1.style.zIndex=98;
                index2.style.zIndex=99;
                index3.style.zIndex=100;
                index4.style.zIndex=99;
            }
                break;
            case(3):{
                index1.style.zIndex=97;
                index2.style.zIndex=98;
                index3.style.zIndex=99;
                index4.style.zIndex=100;
            }
                break;
        }
    }

    $scope.back = function () {
        window.location.href="/HospitalServicePlatform/main/#/ServiceInsert";
    }


}]);