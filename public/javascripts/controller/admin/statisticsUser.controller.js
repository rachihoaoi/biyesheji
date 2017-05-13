adminApp.controller('statisticsUser.controller', ['$scope','statisticFactory', function ($scope,statisticFactory) {
    console.log('in statisticsUser.controller');
    var numall = 0;
    var passed = 0;
    var pengding = 0;
    var failed = 0;
    statisticFactory.getUserNum({status:'已通过'},function (result) {
        console.log(result.obj);
        if(result.obj=='undefined')
            passed = 0;
        else
            passed = result.obj;
        statisticFactory.getUserNum({status:'未通过'},function (result) {
            console.log(result.obj);
            if(result.obj=='undefined')
                failed = 0;
            else
                failed = result.obj;
            statisticFactory.getUserNum({status:'待审核'},function (result) {
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
                var test = new rose(document.getElementById('status'),fake_data,xdata,'用户状态占比');
            });
        });

    });


    var xdata = ['810','811','812','813','814','815','816'];
    var data1 = ['2','2','1','3','1','2','0'];
    var data2 = ['1','6','5','2','5','2','2'];
    var data3 = ['2','2','2','3','3','4','5'];
    var data4 = ['5','9','11','15','11','12','14'];
    var test = new stackLine3(document.getElementById('a'),data1,data2,data3,data4,xdata,'用户状态数量');

    statisticFactory.getUserNum({},function (result) {
        console.log(result.obj);
        $scope.numall  = result.obj;
    });

}]);