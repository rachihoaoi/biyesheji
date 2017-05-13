mainApp.controller('servicePublish.controller', ['$scope','serviceFactory','statisticFactory', function ($scope,serviceFactory,statisticFactory) {
    console.log('in servicePublish');
    $scope.headerParams = [{}];
    $scope.queryParams = [{}];
    $scope.pathParams = [{}];
    $scope.bodyParamsFromData = [{}];
    $scope.bodyParamsRaw = [{}];
    var Param;
    var ParamType = "Header";
    var BodyStyle = "form-data";
    $scope.ServiceName = null;
    $scope.ServiceAddr = null;
    $scope.ServiceCreatorName = null;
    $scope.ServicePostMethod = null;
    $scope.ServiceDescribe = null;
    $scope.ServiceReturnFormat = null;
    $scope.serviceVision = null;
    $scope.servicePublishAddr = null;
    var index1=document.getElementById('params_set1');
    var index2=document.getElementById('params_set2');
    var index3=document.getElementById('params_set3');
    var index4=document.getElementById('params_set4');
    var uid;
    var arr_uid,reg_uid=new RegExp("(^| )"+"uid"+"=([^;]*)(;|$)");
    arr_uid = document.cookie.match(reg_uid);
    uid = arr_uid[2];
    console.log("User ID:"+uid);
    $scope.uid = uid;

    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    var time=year+'\_'+month+'\_'+day;
    console.log(time);

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
    })

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

    $scope.toSaveService = function () {
        var params = {};
        setParam();
        params.name = $scope.ServiceName;
        params.address = $scope.ServiceAddr;
        params.developer = $scope.ServiceCreatorName;
        params.developerID = uid;
        params.requestMethod = $scope.ServicePostMethod;
        params.info = $scope.ServiceDescribe
        params.returnSample = $scope.ServiceReturnFormat
        params.paramType  = ParamType;
        params.paramValue = Param;
        params.bodyParamType = ParamType;
        params.vision = $scope.serviceVision;
        params.apiAddr = $scope.servicePublishAddr;
        params.status = '待审核';
        console.log(params);
        console.log($scope.ServiceName+","+$scope.ServiceAddr+","+$scope.ServiceCreatorName+","+$scope.ServicePostMethod+","+$scope.ServiceDescribe+","+$scope.ServiceReturnFormat+","+Param);
        serviceFactory.create(params,function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                alert("保存成功");
                statisticFactory.getServiceAmount({"time":time},function (result) {
                    console.log(result.obj);
                    if(result.obj.length==1){
                        statisticFactory.addServiceAmount({
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
            }
            else {
                $scope.error = false;
                console.log(result.code);
            }
        })
    }

   
    
    $scope.setParamType = function (paramType) {
        ParamType = paramType;
    }
    
    $scope.setBodyType = function (paramType) {
        BodyStyle = paramType;
        ParamType = paramType;
    }
    
    $scope.cleanup = function () {
        $scope.bodyParamsFromData = [{}];
    }

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
}]);


