(function (angular) {
    'use strict';
    angular.module('flightSearchModule').controller('popupController', popupController);
    popupController.$inject = ['title', 'bodyMsg', 'popupService'];

    function popupController(title, bodyMsg, popupService) {
        var vm = this;
        vm.title = title;
        vm.bodyMsg = bodyMsg;
        vm.cancel = function () {
            popupService.cancel();
        };
    }
})(angular);