mainApp.controller('serviceInsert.controller', ['$scope','serviceFactory','userServiceFactory','recommendFactory', function ($scope,serviceFactory,userServiceFactory,recommendFactory) {
    console.log('in serviceInsert');
    $scope.searchContent = null;
    $scope.serviceList=[{}];
    $scope.osusumeItem = [];
    var initOsusumeParams = {};
    //set datetime
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    var hour = myDate.getHours();
    var min = myDate.getMinutes();
    var second = myDate.getSeconds();
    var time=year+'-'+month+'-'+day+" "+hour+":"+min+":"+second;
    var params = {};

    
    
    //set user_id
    var uid;
    var arr_uid,reg_uid=new RegExp("(^| )"+"uid"+"=([^;]*)(;|$)");
    arr_uid = document.cookie.match(reg_uid);
    uid = arr_uid[2];
    console.log("User ID:"+uid);

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
    getService();
    function getService() {
        serviceFactory.getAll({},function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                $scope.serviceList = result.obj;
            }
            else {
                $scope.error = false;
                console.log(result.code);
            }
        })
    }
    $(".nano").nanoScroller();
    $(document).ready(function () {
        $("#about1").mouseenter(function () {
            $(".nano").nanoScroller();
            $(".nano-slider").fadeIn(300);
        });

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
    });
    $scope.selected = function (index) {
        console.log(selected_value.indexOf(index));
        if(selected_value.indexOf(index)<0){
            console.log("push");
            selected_value.push(index);
        }else if(selected_value.indexOf(index)>=0)
            selected_value.splice(selected_value.indexOf(index),1);
        console.log(selected_value);
    }

    $scope.toInfo = function (index) {
        var param = {};
        var param_1 = {}
        serviceFactory.getAll({id:index},function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj[0].developer);
                param.visitedTime = time;
                param.uid = uid;
                param_1.uid=uid;
                param.visitedName = result.obj[0].developer;
                param_1.visitedName = result.obj[0].developer;
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

            }
            else {
                $scope.error = false;
                console.log(result.code);
            }
        })
        window.location.href="/HospitalServicePlatform/main/#/ServiceInsert/serviceInfo?id="+index;
    }

    $scope.save = function() {
        var params = {};
        var length = selected_value.length;
        // for(var i=0;i<length;i++){
            params.uid=uid;
            params.sid=selected_value;
            params.action='待审核';
            userServiceFactory.create(params,function (result) {});
            window.location.href="/HospitalServicePlatform/main/#/MyServiceInsert";
        }
    // }
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
                    serviceFactory.getOr(initOsusumeParams,function (result) {
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

    $scope.toInfo1 = function (id) {
        alert(id);
    }

    

}]);

