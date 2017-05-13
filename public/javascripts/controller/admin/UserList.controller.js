adminApp.controller('UserList.controller', ['$scope','indexFactory','serviceFactory','userServiceFactory','recommendFactory', function ($scope,indexFactory,serviceFactory,userServiceFactory,recommendFactory) {
    console.log('in UserList.controller');
    $scope.userList = [];

    getList();
    function getList() {
        indexFactory.getLogin({}, function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                $scope.userList = result.obj;
            }
            else {
                $scope.error = false;
                console.log(result.code);
            }
        });
    }


    var selected_value =[];
    $scope.selected = function (index) {
        console.log(selected_value.indexOf(index));
        if(selected_value.indexOf(index)<0){
            console.log("push");
            selected_value.push(index);
        }else if(selected_value.indexOf(index)>=0)
            selected_value.splice(selected_value.indexOf(index),1);
        console.log(selected_value);
    }
    
    $scope.delete = function () {
        console.log('delete')
        var params = {};
        var length = selected_value.length;
        // for(var i=0;i<length;i++){
        params.sid=selected_value;
        console.log(params);
        indexFactory.delete(params,function (result) {});
    }
    
}]);