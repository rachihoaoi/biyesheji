adminApp.controller('ServiceList.controller', ['$scope','appFactory','serviceFactory','userServiceFactory','recommendFactory', function ($scope,appFactory,serviceFactory,userServiceFactory,recommendFactory) {
    console.log('in ServiceList.controller');

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
