mainApp.controller('MyServiceInfo.controller', ['$scope','serviceFactory','userServiceFactory','recommendFactory', function ($scope,serviceFactory,userServiceFactory,recommendFactory) {
    console.log('in myServiceInfo.controller');
    $scope.headerParams = [{}];
    $scope.queryParams = [{}];
    $scope.pathParams = [{}];
    $scope.bodyParamsFromData = [{}];
    $scope.bodyParamsRaw = [{}];
    var Param;
    var ParamType = "Header";
    var BodyStyle = "form-data";
    var index1=document.getElementById('params_set1');
    var index2=document.getElementById('params_set2');
    var index3=document.getElementById('params_set3');
    var index4=document.getElementById('params_set4');

    $scope.setParamType = function (paramType) {
        ParamType = paramType;
    }

    $(document).ready(function () {
        $("#params_set1").click(function () {
            $("#params_bk").css("background-color","#aaa893");
            set_index_z(0);
        });
        $("#params_set2").click(function () {
            $("#params_bk").css("background-color","#93917c");
            set_index_z(1);
        });
        $("#params_set3").click(function () {
            $("#params_bk").css("background-color","#7c7a65");
            set_index_z(2);
        });
        $("#params_set4").click(function () {
            $("#params_bk").css("background-color","#656256");
            set_index_z(3);
        });
    });

    $scope.addParam = function (index) {
        if (index + 1 >= $scope.headerParams.length) {  //点击最后一项时
            $scope.headerParams.push({});
        }
    }

    $scope.addParam_body = function (index) {
        if (index + 1 >= $scope.bodyParamsFromData.length) {  //点击最后一项时
            $scope.bodyParamsFromData.push({});
        }
    }

    $scope.addParam_params = function (index) {
        if (index + 1 >= $scope.queryParams.length) {  //点击最后一项时
            $scope.queryParams.push({});
        }
    }

    $scope.addValueHeader = function (index,list) {
        if(list==1)
            $scope.headerParams[index].name = $scope.headerParams.name[index];
        if(list==2)
            $scope.headerParams[index].value = $scope.headerParams.value[index];
        if(list==3)
            $scope.headerParams[index].necessary = $scope.headerParams.necessary[index];
        if(list==4)
            $scope.headerParams[index].illustrate = $scope.headerParams.illustrate[index];
    }

    $scope.addValueParams = function (index,list) {
        if(list==1)
            $scope.queryParams[index].name = $scope.queryParams.name[index];
        if(list==2)
            $scope.queryParams[index].value = $scope.queryParams.value[index];
        if(list==3)
            $scope.queryParams[index].necessary = $scope.queryParams.necessary[index];
        if(list==4)
            $scope.queryParams[index].illustrate = $scope.queryParams.illustrate[index];
    }

    $scope.addValuePath = function (index,list) {
        if(list==1)
            $scope.pathParams[index].name = $scope.pathParams.name[index];
        if(list==2)
            $scope.pathParams[index].type = $scope.pathParams.type[index];
        if(list==3)
            $scope.pathParams[index].value = $scope.pathParams.value[index];
        if(list==4)
            $scope.pathParams[index].Describe = $scope.pathParams.Describe[index];
    }

    $scope.addValueBodyFromData = function (index,list) {
        if(list==1)
            $scope.bodyParamsFromData[index].name = $scope.bodyParamsFromData.name[index];
        if(list==2)
            $scope.bodyParamsFromData[index].type = $scope.bodyParamsFromData.type[index];
        if(list==3)
            $scope.bodyParamsFromData[index].value = $scope.bodyParamsFromData.value[index];
        if(list==4)
            $scope.bodyParamsFromData[index].necessary = $scope.bodyParamsFromData.necessary[index];
    }

    $scope.addValueBodyRaw = function (list) {
        if(list==1)
            $scope.bodyParamsRaw[0].type = $scope.bodyParamsRaw.type;
        if(list==2)
            $scope.bodyParamsRaw[0].Describe = $scope.bodyParamsRaw.Describe;
        if(list==3)
            $scope.bodyParamsRaw[0].Content = $scope.bodyParamsRaw.Content;
    }

    function setParam() {
        console.log(ParamType);
        if(ParamType=="Header"){
            console.log("headerParams:"+angular.toJson( $scope.headerParams));
            Param = angular.toJson( $scope.headerParams);
        }

        if(ParamType=="Params"){
            console.log("queryParams:"+angular.toJson( $scope.queryParams));
            Param = angular.toJson( $scope.queryParams);
        }
        if(ParamType=="Path"){
            console.log("pathParams:"+angular.toJson($scope.pathParams));
            Param = angular.toJson( $scope.pathParams);
        }

        if(ParamType=="raw"){
            console.log("Body:"+angular.toJson($scope.bodyParamsRaw));
            Param = angular.toJson( $scope.bodyParamsRaw);
        }
        if(ParamType=="form-data"){
            console.log("form-data:"+angular.toJson($scope.bodyParamsFromData));
            Param = angular.toJson( $scope.bodyParamsFromData);
        }
    }

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
                console.log(result.obj[0].paramValue);

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