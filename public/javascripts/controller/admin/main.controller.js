var adminApp = angular.module('adminApp', ['ui.router', 'ngPagination', 'ngSanitize','ngFileUpload']);


adminApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    
        .state("ServiceManager",{
            url:"/ServiceManager",
            templateUrl:"ServiceManager",
            controller:"ServiceManager.controller"
        })
        .state("ServiceList",{
            url:"/ServiceList",
            templateUrl:"ServiceList",
            controller:"ServiceList.controller"
        })
        .state("UserList",{
            url:"/UserList",
            templateUrl:"UserList",
            controller:"UserList.controller"
        })
        .state("UserManager",{
            url:"/UserManager",
            templateUrl:"UserManager",
            controller:"UserManager.controller"
        })


        .state("statisticsMain",{
            url:"/statisticsMain",
            templateUrl:"statisticsMain",
            controller:"statisticsMain.controller"
        })

        .state("statisticsService",{
            url:"/statisticsService",
            templateUrl:"statisticsService",
            controller:"statisticsService.controller"
        })

        .state("statisticsApp",{
            url:"/statisticsApp",
            templateUrl:"statisticsApp",
            controller:"statisticsApp.controller"
        })

        .state("statisticsUser",{
            url:"/statisticsUser",
            templateUrl:"statisticsUser",
            controller:"statisticsUser.controller"
        })

        .state("AppList",{
            url:"/AppList",
            templateUrl:"AppList",
            controller:"AppList.controller"
        })

        .state("AppManager",{
            url:"/AppManager",
            templateUrl:"AppManager",
            controller:"AppManager.controller"
        })

        .state("Appinfo",{
            url:"/Appinfo",
            templateUrl:"Appinfo",
            controller:"AppInfo.controller"
        })

        .state("NotificationManager",{
            url:"/NotificationManager",
            templateUrl:"NotificationManager",
            controller:"NotificationManager.controller"
        })

        .state("NotificationPublish",{
            url:"/NotificationPublish",
            templateUrl:"NotificationPublish",
            controller:"NotificationPublish.controller"
        })
}]);

adminApp.controller('adminCtrl', ['$scope','$http','notificationFactory', function ($scope, $http,notificationFactory) {
    console.log("in main.controller");
    $scope.messageNum = 0;
    var params = {};
    var uid;
    var arr_uid,reg_uid=new RegExp("(^| )"+"uid"+"=([^;]*)(;|$)");
    arr_uid = document.cookie.match(reg_uid);
    uid = arr_uid[2];
    $(document).ready(function () {
        $("#rainDrop").raindrops({
            color:"#aaa893",
            canvasHeight:150,
            rippleSpeed: 0.01,
            frequency: 2,
            density: 0});


    })
    params.checked = 'NO';
    params.to = uid;
    notificationFactory.get(params,function (result) {
        if (result.code == '200') {
            $scope.error = false;
            console.log(result.obj);
            $scope.messageNum = result.obj.length;
        }
        else {
            $scope.error = false;
            console.log(result.code);
        }
    });

    var arr,reg=new RegExp("(^| )"+"user"+"=([^;]*)(;|$)");
    if(!document.cookie.match(reg)){
        window.location.href="/HospitalServicePlatform/index";
    }
    if(arr=document.cookie.match(reg))
        console.log("cookies:"+arr[2]);
    jQuery("#jquery-accordion-menu").jqueryAccordionMenu();

    function delCookie(path){
        document.cookie = "user" + "=" + "" + ";"+ ((path)?';path='+path:'');
        document.cookie = "uid" + "=" + "" + ";"+ ((path)?';path='+path:'');
        window.location.href="/HospitalServicePlatform/index";
    }

    $scope.logOff = function () {
        console.log("aaa");
        delCookie("/HospitalServicePlatform");
    }

    $scope.toIndex = function () {
        window.location.href="/HospitalServicePlatform/index";
    }

    $scope.change = function () {
        var content=document.getElementById('content');
        content.style.opacity = 0;
        $(document).ready(function () {
            $("#content").animate({opacity:1},600);
        })
    }

}]);

var height=document.body.clientHeight;
var sidebar=document.getElementById('sidebar');
var content=document.getElementById('content');
var rainDrop = document.getElementById('rainDrop');
content.style.width=(document.body.clientWidth-260);
rainDrop.style.width=(document.body.clientWidth-260);
content.style.height=height-64-86;
console.log(height);
sidebar.style.height=height-64;
