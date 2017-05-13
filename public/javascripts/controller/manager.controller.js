var managerApp = angular.module('managerApp', ['ui.router', 'ngPagination', 'ngSanitize','ngFileUpload']);

managerApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("index", {
            url: "/index",
            templateUrl: "index",
            controller: 'index.controller'
        });
}]);

managerApp.controller('manager.global.controller', ['$scope', '$http', function ($scope, $http) {
}]);
