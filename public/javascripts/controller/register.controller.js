var registerApp = angular.module('registerApp', []);
registerApp.controller('registerCtrl', ['$scope', '$http', function ($scope, $http) {

    $(document).ready(function (){
        $('.info_table').mouseenter(function () {
            $('#register_bk').animate({opacity: 0.48},200);
            $('#info_table').animate({opacity: 1.0},200);
        });
        $('.info_table').mouseleave(function () {
            $('#register_bk').animate({opacity: 1.0},200);
            $('#info_table').animate({opacity: 0.78},200);
        })
        var height=document.body.clientHeight;
        var bk=document.getElementById('register_bk');
        bk.style.height=height;
    });

    
    $scope.toRegister = function () {
        var flag=0;
        console.log($scope.username,$scope.password,$scope.passwordConfirm,$scope.Tel,$scope.mailAddr);
        if(!$scope.username||!$scope.password||!$scope.passwordConfirm||!$scope.Tel||!$scope.mailAddr){
            alert('input invaild');
            flag=1;
        }
        if($scope.password!=$scope.passwordConfirm){
            alert('两次密码输入不相同');
            flag=1;
        }
        if($scope.Tel.length!=11){
            alert('手机长度非法');
            flag=1;
        }
        if(!$scope.mailAddr.indexOf('@')){
            alert('邮箱格式有误');
            flag=1;
        }
    }
    
    $scope.backToMain = function () {
        window.location.href='/HospitalServicePlatform/index';
    }
}]);
