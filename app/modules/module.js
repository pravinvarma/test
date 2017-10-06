(function (angular) {
    'use strict';
    angular.module('flightSearchModule', ['ngSanitize', 'ui.bootstrap','ngMaterial', 'ngAnimate']).config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('LoadingInterceptor');
}]);


})(angular);