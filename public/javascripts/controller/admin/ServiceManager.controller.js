adminApp.controller('ServiceManager.controller', ['$scope','appFactory','serviceFactory','userServiceFactory','recommendFactory', function ($scope,appFactory,serviceFactory,userServiceFactory,recommendFactory) {
    console.log('in AppInfo.controller');

    $scope.serviceList =[];

    getServiceList();
    function getServiceList() {
        var params ={};
        params.status = '';
        serviceFactory.get(params,function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                $scope.serviceList = result.obj;
            }
            else {
                $scope.error = false;
                console.log(result.code);
            }
        });
    }

    $scope.change = function (status) {
        window.alert($(this).html());
    }

    $scope.pass = function (id) {
        params = {};
        params.id = id;
        params.status = '已发布';
        serviceFactory.update(params,function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                getServiceList();
            }
            else {
                $scope.error = false;
                console.log(result.code);
            }
        });
    }

    $scope.refuse = function (id) {
        params = {};
        params.id = id;
        params.status = '未通过';
        serviceFactory.update(params,function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                getServiceList();
            }
            else {
                $scope.error = false;
                console.log(result.code);
            }
        });
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
            if($scope.searchContent){
                serviceFactory.get({name:$scope.searchContent},function (result) {
                    if (result.code == '200') {
                        $scope.error = false;
                        console.log(result.obj);
                        $scope.serviceList = result.obj;
                    }
                    else {
                        $scope.error = false;
                        console.log(result.code);
                    }
                });

            }
            else{
                alert("Keyword is Required!!!");
            }
        }
    }

    var selected_value =[];
    var deleteService_developer =[];
    $scope.selected = function (index) {
        console.log(selected_value.indexOf(index));
        if(selected_value.indexOf(index)<0){
            console.log("push");
            selected_value.push(index);
        }else if(selected_value.indexOf(index)>=0)
            selected_value.splice(selected_value.indexOf(index),1);
        console.log(selected_value);
    }


    $scope.addDeveId = function (temp) {
        var index = Number(temp);
        console.log(deleteService_developer.indexOf(index));
        if(deleteService_developer.indexOf(index)<0){
            console.log("push");
            deleteService_developer.push(index);
        }
        console.log(deleteService_developer);
    }

    $scope.delete = function () {
        console.log('delete')
        var params = {};
        var length = selected_value.length;
        // for(var i=0;i<length;i++){
        params.sid=selected_value;
        console.log(params);
        serviceFactory.delete(params,function (result) {});
        getServiceList();
    }

}]);
