//create by wuwanyu

//pagination.js
var appModule=angular.module('ngPagination',[]);
appModule.directive('pagination', function() {
    return {
        restrict: 'E',
        template:'<ul class="pagination">' +
        '<li  ng-click="toPrePage()"><a >&laquo;</a></li>' +
        '<li ng-repeat="item in pageList track by $index" ng-class="{active:item==conf.currentPage}" ng-click="changeCurrentPage(item)">' +
        '<a >{{item}}</a>' +
        '</li>' +
        ' <li ng-click="toNextPage()"><a >&raquo;</a></li>' +
        ' </ul>',
        transclude: true,
        scope:{
            conf:"="
        },
        link:function(scope, element, attrs){
            //console.log(scope.conf);

            //初始�?
            //当前页数
            scope.conf.currentPage=parseInt(scope.conf.currentPage)?parseInt(scope.conf.currentPage):0;
            //总数据量
            scope.conf.totalItems = parseInt(scope.conf.totalItems) ? parseInt(scope.conf.totalItems) : 0;
            //每页数据条数
            scope.conf.itemsPerPage=parseInt(scope.conf.itemsPerPage)?parseInt(scope.conf.itemsPerPage):15;
            //显示的页�?
            scope.conf.pagesLength=parseInt(scope.conf.pagesLength)?parseInt(scope.conf.pagesLength):15;
            if(scope.conf.pagesLength % 2 === 0){
                // 如果不是奇数的时候处理一�?
                scope.conf.pagesLength = scope.conf.pagesLength -1;
            }



            // 初始化pageList数组
            function getPagination(newValue, oldValue) {

                // 总页�?
                scope.conf.numberOfPages = Math.ceil(scope.conf.totalItems/scope.conf.itemsPerPage);

                // 小于1�?
                if(scope.conf.currentPage < 1){
                    scope.conf.currentPage = 1;
                }

                // 大于总页数时
                if(scope.conf.currentPage > 1  && scope.conf.currentPage >  scope.conf.numberOfPages){
                    scope.conf.currentPage =  scope.conf.numberOfPages;
                }

                // 页码
                scope.pageList = [];
                //页数   < 显示页码�?
                if(scope.conf.numberOfPages<=scope.conf.pagesLength){
                    for(var i=1;i<= scope.conf.numberOfPages;i++){
                        scope.pageList.push(i);
                    }
                }else{
                    var offset= (scope.conf.pagesLength-1)/2;
                    // 当前页码    < 偏移�?
                    if(scope.conf.currentPage < offset){

                        for(var i=1;i<= offset;i++){
                            scope.pageList.push(i);
                        }
                        scope.pageList.push("...");
                        scope.pageList.push(scope.conf.numberOfPages);

                        // 当前页码 > 总页�?-偏移�?
                    }else if(scope.conf.currentPage > scope.conf.numberOfPages-offset){

                        scope.pageList.push(1);
                        scope.pageList.push("...");
                        for(var i=offset+1;i>=0;i--){
                            scope.pageList.push(scope.conf.numberOfPages-i);
                        }

                        //当前页码 >= 偏移�?  &&  当前页码  �?=  总页�?-偏移�?
                    }else{
                        scope.pageList.push(1);
                        scope.pageList.push("...");
                        for(i = Math.ceil(offset/2) ; i >= 1; i--){
                            scope.pageList.push(scope.conf.currentPage - i);
                        }
                        scope.pageList.push(scope.conf.currentPage);
                        for(i = 1; i <=  Math.ceil(offset/2); i++){
                            scope.pageList.push(scope.conf.currentPage + i);
                        }
                        scope.pageList.push("...");
                        scope.pageList.push(scope.conf.numberOfPages);
                    }

                }

                if(scope.conf.onChange){
                    // 防止初始化两次请求问�?
                    if(!(oldValue != newValue && oldValue[0] == 0)) {
                        scope.conf.onChange();
                    }
                }

                scope.$parent.conf = scope.conf;
            }

            //第n�?
            scope.changeCurrentPage=function(index){
                if(!isNaN(parseInt(index))  &&  (index !=scope.conf.currentPage)){  //是数字，并且页码变化了
                    scope.conf.currentPage=index;
                }
            };

            //前一�?
            scope.toPrePage=function(){
                if(scope.conf.currentPage>1){
                    scope.conf.currentPage--;
                }
            };

            //下一�?
            scope.toNextPage=function(){
                if(scope.conf.currentPage<scope.conf.numberOfPages){
                    scope.conf.currentPage++;
                }
            };


            //监听
            scope.$watch(function() {
                if(!scope.conf.totalItems) {
                    scope.conf.totalItems = 0;
                }
                if(scope.conf.currentPage == 1) {
                    $(".pagination > li:first-child").css('visibility','hidden');
                } else{
                    $(".pagination > li:first-child").css('visibility','visible');
                }
                if(scope.conf.currentPage == scope.conf.numberOfPages) {
                    $(".pagination > li:last-child").css('visibility','hidden');
                } else{
                    $(".pagination > li:last-child").css('visibility','visible');
                }
                var newValue = scope.conf.totalItems + '' +  scope.conf.currentPage + '' + scope.conf.itemsPerPage;
                return newValue;
            }, getPagination);


        }
    };
});
