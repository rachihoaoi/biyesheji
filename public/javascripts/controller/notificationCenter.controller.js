mainApp.controller('notificationCenter.controller', ['$scope','notificationFactory','indexFactory', function ($scope,notificationFactory,indexFactory) {
    console.log('in notificationCenter controller');
    $scope.from = 'rachihoaoi';
    $scope.mailListNotRead = [];
    $scope.mailList = [];
    $scope.mail = [];
    $scope.mailSender = null;
    $scope.mailSendTime = null;
    $scope.mailTitle = null;
    $scope.mailReceiver = null;
    $scope.mailContent = null;
    var firstClick = 0;


    var uid;
    var params ={};
    var arr_uid,reg_uid=new RegExp("(^| )"+"uid"+"=([^;]*)(;|$)");
    arr_uid = document.cookie.match(reg_uid);
    uid = arr_uid[2];
    console.log(uid);
    params.to = uid;
    params.checked = 'NO';

    function getMial() {
        notificationFactory.get(params,function (result) {
            if (result.code == '200') {
                $scope.error = false;
                $scope.mailListNotRead = result.obj;
                console.log(result.obj);
            }
            else {
                $scope.error = false;
                console.log(result.code);
            }
            $(".nano").nanoScroller();
        });

        notificationFactory.get({},function (result) {
            if (result.code == '200') {
                $scope.error = false;
                $scope.mailList = result.obj;
                console.log(result.obj);
            }
            else {
                $scope.error = false;
                console.log(result.code);
            }
            $(".nano").nanoScroller();
        });
    }

    getMial();

    $scope.showInfo = function (id) {
        var content = document.getElementById('mailContent');
        $(".mailContent").animate({
            opacity:0,
            marginLeft:'90px'
        },1);
        $(".mailContent").animate({
            opacity:1,
            marginLeft:'36px'
        },300);
        // $(".MailSender,.MailTime,.MailContentTitle,.mail_content").animate({"opacity":0},1);
        // $(".MailSender,.MailTime,.MailContentTitle,.mail_content").animate({"opacity":1},500);

        notificationFactory.update({"id":id,"checked":"YES"},function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
            }
            else {
                $scope.error = false;
                console.log(result.code);
            }
            $(".nano").nanoScroller();
        });

        notificationFactory.get({"id":id},function (result) {
            if (result.code == '200') {
                $scope.error = false;
                console.log(result.obj);
                $scope.mailSender = result.obj[0].fromName;
                $scope.mailSendTime = result.obj[0].time;
                $scope.mailTitle = result.obj[0].title;
                $scope.mailReceiver = result.obj[0].toName;
                $scope.mailContent = result.obj[0].message;
            }
            else {
                $scope.error = false;
                console.log(result.code);
            }
            $(".nano").nanoScroller();
        });
    }

$scope.refresh = function () {
    getMial();
}



    $(document).ready(function () {
        $("#about1").mouseenter(function () {
            $(".nano").nanoScroller();
            $(".about1,.mailTopBar1").animate({"background-color": "rgba(170, 168, 147,0.75)"},400);
            $(".nano-slider").fadeIn(300);
        });
        $("#about1").mouseleave(function () {
            $(".about1,.mailTopBar1").animate({"background-color": "rgba(170, 168, 147,0.45)"},400);
        });
        $("#about2").mouseenter(function () {
            $(".nano").nanoScroller();
            $(".about2,.mailTopBar2").animate({"background-color": "rgba(170, 168, 147,0.75)"},400);
            $(".nano-slider").fadeIn(300);
        });
        $("#about2").mouseleave(function () {
            $(".about2,.mailTopBar2").animate({"background-color": "rgba(170, 168, 147,0.45)"},400);
        })
    })

}]);
