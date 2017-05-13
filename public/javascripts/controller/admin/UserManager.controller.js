adminApp.controller('UserManager.controller', ['$scope','indexFactory','serviceFactory','userServiceFactory','recommendFactory', function ($scope,indexFactory,serviceFactory,userServiceFactory,recommendFactory) {
    console.log('in UserManager.controller');
    $scope.userList = [];

    getList();
    function getList() {
        indexFactory.getLogin({},function (result) {
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

    $scope.pass = function (id) {
        params = {};
        params.id = id;
        params.status = '已通过';
        indexFactory.update(params,function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                getList();
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
        indexFactory.update(params,function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                getList();
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
                indexFactory.getLogin({name:$scope.searchContent},function (result) {
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
            else{
                alert("Keyword is Required!!!");
            }
        }
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