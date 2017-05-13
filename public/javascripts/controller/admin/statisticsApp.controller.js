adminApp.controller('statisticsApp.controller', ['$scope','statisticFactory', function ($scope,statisticFactory) {
    console.log('in statisticsApp.controller');
    var fake_data = [
        {value:62, name:'Android'},
        {value:35, name:'IOS'}]
    var xdata=['Android','IOS'];
    var test = new rose(document.getElementById('status'),fake_data,xdata,'应用数量');
    var xdata = ['810','811','812','813','814','815','816','817','818','819','820','821','822','823'];
    var data1 = ['48','49','52','53','59','59','62','65','69','79','81','85','88','97'];
    var test = new stackLine(document.getElementById('a'),data1,xdata,'应用数量');
}]);