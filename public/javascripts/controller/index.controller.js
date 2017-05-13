var indexApp = angular.module('indexApp', []);
indexApp.controller('indexCtrl', ['$scope','$http', 'indexFactory','statisticFactory', function ($scope, $http, indexFactory,statisticFactory) {
    console.log("in indexController");
    var height=document.body.clientHeight;
    var slide=document.getElementById('carousel-inner');
    var Switch_l=document.getElementById('switch_l');
    var Switch_r=document.getElementById('switch_r');
    var slide_content=document.getElementById('slide_content');

    // Switch_r.style.marginTop=height/2;
    // Switch_l.style.marginTop=height/2;
    slide.style.height=height;
    slide_content.style.height=height;
    $(document).ready(function () {
        $("#login_btn").mouseenter(function () {
            $("#login_btn").animate({height:'320px'},200);
            $("#login_btn").animate({width:'230px'},200,function () {
                $("#login_textbox").fadeIn(200);
            });
        });
        $("#login_btn").mouseleave(function () {
            $("#login_textbox").fadeOut(200,function () {
                $("#login_btn").animate({height:'50px',width:'72px'},400);
            });
        });
    });
    $scope.login = function () {
        indexFactory.getLogin({'name':$scope.username}, function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                if($scope.password==result.obj[0].password){
                    document.cookie = "user" + "=" +result.obj[0].name + ";";
                    document.cookie = "uid" + "=" +result.obj[0].id + ";";
                    if(result.obj[0].id!=100){
                        window.location.href="/HospitalServicePlatform/main/#/ServicePublish";
                    }
                    else if(result.obj[0].id==100){
                        window.location.href="/HospitalServicePlatform/admin/#/ServiceList";
                    }
                }
                else{
                    alert("password invaild");
                }
            }
            else {
                $scope.error = false;
                console.log(result.code);
            }
        })
    }
    
    $scope.register = function () {
        window.location.href="/HospitalServicePlatform/register";
    }

    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    var time=year+'\_'+month+'\_'+day;

    statisticFactory.getVisit({"time":time},function (result) {
        if (result.code == '200') {
            $scope.error = false;
            console.log(result.obj);
            statisticFactory.add({
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
        else {
            $scope.error = false;
            console.log(result.code);
        }
    });
    

    var data_department=[
        {value:72, name:'内部'},
        {value:36, name:'跨部门'}
    ];
    var food_chart;
    var test;

}]);