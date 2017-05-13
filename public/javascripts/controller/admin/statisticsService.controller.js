adminApp.controller('statisticsService.controller', ['$scope','statisticFactory', function ($scope,statisticFactory) {
    console.log('in statisticsService.controller');
    var passed = 0;
    var pengding = 0;
    var failed = 0;

    statisticFactory.getServiceNum({status:'已发布'},function (result) {
        console.log('已发布'+result.obj);
        if(result.obj=='undefined')
            passed = 0;
        else
            passed = result.obj;
        statisticFactory.getServiceNum({status:'未通过'},function (result) {
            console.log(result.obj);
            if(result.obj=='undefined')
                failed = 0;
            else
                failed = result.obj;
            statisticFactory.getServiceNum({status:'待审核'},function (result) {
                console.log(result.obj);
                if(result.obj=='undefined')
                    pengding = 0;
                else
                    pengding = result.obj;
                var fake_data = [
                    {value:passed, name:'已通过'},
                    {value:failed, name:'未通过'},
                    {value:pengding, name:'待审查'}];
                var xdata=['已通过','未通过','待审查'];
                var test = new rose(document.getElementById('status'),fake_data,xdata,'服务状态占比');
            });
        });
    });

    var data = [];
    statisticFactory.getServiceNum({paramType:'Params'},function (result) {
        data.push(result.obj);
        statisticFactory.getServiceNum({paramType:'Header'},function (result) {
            data.push(result.obj);
            statisticFactory.getServiceNum({paramType:'Path'},function (result) {
                data.push(result.obj);
                statisticFactory.getServiceNum({paramType:'from-data'},function (result) {
                    var temp;
                    temp = result.obj;
                    statisticFactory.getServiceNum({paramType:'raw'},function (result) {
                        temp += result.obj;
                        console.log('temp'+temp)
                        data.push(temp);
                        var max = 0;
                        for(var i = 0;i<data.length;i++){
                            if(max<data[i])
                                max=data[i]
                        }
                        var test = new radar(document.getElementById('a'),data,max);
                    });

                });
            });
        });
    });


}]);