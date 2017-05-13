var mainApp = angular.module('mainApp', ['ui.router', 'ngPagination', 'ngSanitize','ngFileUpload']);

mainApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state("ServicePublish",{
            url:"/ServicePublish",
            templateUrl:"ServicePublish",
            controller:"servicePublish.controller"
        })
        .state("ServiceInsert",{
            url:"/ServiceInsert",
            templateUrl:"ServiceInsert",
            controller:"serviceInsert.controller"
        })
        .state("MyServicePublish",{
            url:"/MyServicePublish",
            templateUrl:"MyServicePublish",
            controller:"myServicePublish.controller"
        })
        .state("MyServiceInsert",{
            url:"/MyServiceInsert",
            templateUrl:"MyServiceInsert",
            controller:"myServiceInsert.controller"
        })

        .state("NotificationCenter",{
            url:"/NotificationCenter",
            templateUrl:"NotificationCenter",
            controller:"notificationCenter.controller"
        })

        .state("NotificationInbox",{
            url:"/NotificationInbox",
            templateUrl:"NotificationInbox",
            controller:"notification.inbox.controller"
        })
        .state("ServiceInfo",{
            url:"/ServiceInsert/serviceInfo",
            templateUrl:"serviceInfo",
            controller:"serviceInfo.controller"
        })
        .state("statistics",{
            url:"/statistics",
            templateUrl:"statistics",
            controller:"statistics.controller"
        })

        .state("userInfo",{
            url:"/userInfo",
            templateUrl:"userInfo",
            controller:"userInfo.controller"
        })

        .state("MyServiceInfo",{
            url:"/MyServicePublish/serviceInfo",
            templateUrl:"MyServiceInfo",
            controller:"MyServiceInfo.controller"
        })

        .state("AppPublish",{
            url:"/AppPublish",
            templateUrl:"AppPublish",
            controller:"AppPublish.controller"
        })

        .state("MyAppPublish",{
            url:"/MyAppPublish",
            templateUrl:"MyAppPublish",
            controller:"MyAppPublish.controller"
        })

        .state("AppList",{
            url:"/AppList",
            templateUrl:"AppList",
            controller:"AppList.controller"
        })

        .state("AppInfo",{
            url:"/AppList/Appinfo",
            templateUrl:"Appinfo",
            controller:"AppInfo.controller"
        })
}]);


mainApp.controller('mainCtrl', ['$scope','$http','notificationFactory', function ($scope, $http,notificationFactory) {
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
