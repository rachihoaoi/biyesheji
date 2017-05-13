mainApp.controller('MyAppPublish.controller', ['$scope','appFactory','serviceFactory','userServiceFactory','recommendFactory', function ($scope,appFactory,serviceFactory,userServiceFactory,recommendFactory) {
    console.log('in MyAppPublish.controller');

    $scope.appList = [{}];
    $scope.osusumeItem = [];
    var initOsusumeParams = {};
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    var hour = myDate.getHours();
    var min = myDate.getMinutes();
    var second = myDate.getSeconds();
    var time=year+'-'+month+'-'+day+" "+hour+":"+min+":"+second;
    var params = {};

    var uid;
    var arr_uid,reg_uid=new RegExp("(^| )"+"uid"+"=([^;]*)(;|$)");
    arr_uid = document.cookie.match(reg_uid);
    uid = arr_uid[2];
    console.log("User ID:"+uid);

    init();
    function init() {
        appFactory.get({"did":uid},function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                $scope.appList = result.obj;
            }
            else {
                $scope.error = false;
                console.log(result.code);
            }
        })
    }

    function addKeyword() {
        console.log(time);
        var param_t = {};
        params.serachTime = time;
        params.uid = uid;
        params.searchKeyword = $scope.searchContent;
        param_t.uid = uid;
        param_t.searchKeyword = $scope.searchContent;
        recommendFactory.get(param_t,function (result){
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                if(result.obj.length==0){
                    recommendFactory.create(params,function (result) {
                        if (result.code == '200') {
                            $scope.error = false;
                            console.log(result.obj);
                        }
                    });
                }
                else{
                    recommendFactory.update(params,function (result) {
                        if (result.code == '200') {
                            $scope.error = false;
                            console.log(result.obj);
                        }
                    });
                }
            }
            else {
                $scope.error = false;
                console.log(result.code);
            }
        });
    }

    $scope.search=function(){
        var code = event.keyCode;
        if(code == 13){
            if($scope.searchContent){
                console.log(time);
                addKeyword();
                appFactory.get({appName:$scope.searchContent},function (result) {
                    if (result.code == '200') {
                        $scope.error = false;
                        console.log(result.obj);
                        $scope.appList = result.obj;
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

    $scope.toAppInfo = function(id,developer){
        // alert(id+developer);
        var param_1={};
        var param = {};
        param.visitedTime = time;
        param.uid = uid;
        param.visitedName = developer;
        param_1.uid=uid;
        param_1.visitedName = developer;
        recommendFactory.getVisited(param_1,function (result){
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                if(result.obj.length==0){
                    console.log('create');
                    recommendFactory.createVisited(param,function (result) {
                        if (result.code == '200') {
                            $scope.error = false;
                            console.log(result.obj);
                        }
                    })
                }
                else{
                    console.log('update');
                    recommendFactory.updateVisited(param,function (result) {
                        if (result.code == '200') {
                            $scope.error = false;
                            console.log(result.obj);
                        }
                    })
                }
            }
        })
        window.location.href="/HospitalServicePlatform/main/#/AppList/Appinfo?id="+id;
    }


    initOsusume();
    function initOsusume() {
        var params_t = {};
        params_t.uid = uid;
        recommendFactory.get(params_t,function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                if(result.obj.length>0)
                    initOsusumeParams.name = result.obj[0].searchKeyword;
                else{
                    initOsusumeParams.name = " "
                }
            }
            recommendFactory.getVisited(params_t,function (result) {
                if (result.code == '200') {
                    $scope.error = false;
                    console.log(result.obj);
                    if(result.obj.length>0)
                        initOsusumeParams.developer = result.obj[0].visitedName;
                    else{
                        initOsusumeParams.developer=" "
                    }
                    console.log(initOsusumeParams);
                    appFactory.getOr(initOsusumeParams,function (result) {
                        if (result.code == '200') {
                            $scope.error = false;
                            console.log(result.obj);
                            $scope.osusumeItem = result.obj;
                        }
                    })
                }
            })
        })


    }
}]);