mainApp.controller('statistics.controller', ['$scope','statisticFactory', function ($scope,statisticFactory) {
    console.log('in statistics.controller');
    
    var data_obj=[];
    var data2_obj=[];
    function clock() {
        console.log("do it")
    }

    var formatDate = function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    };

    statisticFactory.getVisit({},function (result) {
        var title='近期访问统计';
        var xdata = ['810','811','812','813','814','815','816'];
        var data = [];
        if (result.code == '200') {
            $scope.error = false;
            console.log(result.obj);
            data_obj = result.obj;
            console.log(data_obj.length);
            for(var i=0;i<data_obj.length;i++){
                var temp =new Date(data_obj[i].time) ;
                console.log();
                xdata[i]=formatDate(temp);
                data.push(data_obj[i].value);
            }
            var data_m = data;
            console.log(data);
            console.log(data.length);
            for(var m = 0;m<data.length;m++){
                console.log(data.length-m+":"+m);
                console.log(data[m]+":::::::::"+data_m[m]);
            }
            console.log(xdata);

            var test = new stackLine(document.getElementById('test'),data,xdata,title,false);

        }
        else {
            $scope.error = false;
            console.log(result.code);
        }
    });

    statisticFactory.getServiceAmount({},function (result) {
        var title='服务发布/接入数量';
        var xdata = ['810','811','812','813','814','815','816'];
        var data = [];
        var data2 = [];
        if (result.code == '200') {
            $scope.error = false;
            console.log(result.obj);
            data_obj = result.obj;
            console.log(data_obj.length);
            for(var i=0;i<data_obj.length;i++){
                var temp =new Date(data_obj[i].time) ;
                console.log();
                xdata[i]=formatDate(temp);
                data.push(data_obj[i].value);
            }
            console.log(xdata);
            statisticFactory.getAppAmount({},function (result) {
                console.log(result.obj);
                data2_obj = result.obj;
                console.log(data2_obj.length);
                for(var i=0;i<data2_obj.length;i++){
                    data2.push(data2_obj[i].value);
                }
                var test = new stackLine2(document.getElementById('test2'),data.reverse(),data2.reverse(),xdata.reverse(),title,'服务','应用',false);
            });


        }
        else {
            $scope.error = false;
            console.log(result.code);
        }
    });
    init_serviceReq_type();
    init_serviceParam_type();
    function init_serviceReq_type() {
        statisticFactory.countServiceType({},function (result) {
            console.log(result.countPut.obj);
            var data = [
                {value:result.countPost.obj, name:'POST'},
                {value:result.countGet.obj, name:'GET'},
                {value:result.countDelete.obj, name:'DELETE'},
                {value:result.countPut.obj, name:'PUT'}];
            var fake_data = [
                {value:39, name:'POST'},
                {value:32, name:'GET'},
                {value:17, name:'DELETE'},
                {value:11, name:'PUT'}];
            var xdata=['POST','GET','DELETE','PUT']
            var test = new rose(document.getElementById('rose'),data,xdata,'各类服务请求方式占比');
        })
    }

    function  init_serviceParam_type() {
        statisticFactory.countParamType({},function (result) {
            console.log(result);
            var data = [
                {value:result.countHeader.obj, name:'Header'},
                {value:result.countParams.obj, name:'Params'},
                {value:result.countPath.obj, name:'Path'},
                {value:result.countFromData.obj+result.countRaw.obj, name:'Body'}];
            var fake_data = [
                {value:29, name:'Header'},
                {value:32, name:'Params'},
                {value:17, name:'Path'},
                {value:11, name:'Body'}];
            var xdata=['Header','Params','Path','Body']
            var test = new pie_doughnut(document.getElementById('rose2'),data,xdata,'各类服务参数类型占比');
        })
    }

}]);