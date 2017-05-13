mainApp.controller('userInfo.controller', ['$scope','statisticFactory', function ($scope,statisticFactory) {
    console.log('in userInfo.controller');
    var uid;
    var arr_uid,reg_uid=new RegExp("(^| )"+"uid"+"=([^;]*)(;|$)");
    arr_uid = document.cookie.match(reg_uid);
    uid = arr_uid[2];
    console.log("User ID:"+uid);

    $scope.username = "aaaa";
    $scope.tel = "13765214454";
    $scope.mail = "sarasaku@gmail.com";
    $scope.addr = "Hanakoganeiminamicho 2-17-2 No 225 Kodaira";
    $scope.status = "待审核";
    $scope.info = "aaaaa";
    if( $scope.status == "已通过"){
        $("#status").css("color","#76EE00");
    }else if($scope.status == "待审核"){
        $("#status").css("color","#EEEE00");
    }else{
        $("#status").css("color","#CD0000");
    }
    var fake_data = [
        {value:17, name:'发布'},
        {value:11, name:'接入'}];
    var xdata=['发布','接入']
    var test = new rose_s(document.getElementById('publish_input'),fake_data,xdata,'用户发布/接入服务数');

}]);