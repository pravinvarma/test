(function (angular) {
    angular.module('flightSearchModule').factory('popupService', popupService);
    popupService.$inject = ['$uibModal'];

    function popupService($uibModal) {
        var $uibModalInstance;
        return {
            openPopup: openPopup,
            cancel: cancel
        };

        function openPopup(title, bodyMsg) {
             $uibModalInstance = $uibModal.open({

                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'template/popup.html',
                controller: 'popupController',
                controllerAs: 'vm',
                size: 'sm',
                resolve: {
                    title: function () {
                        return title;
                    },
                    bodyMsg: function () {
                        return bodyMsg;
                    }
                }
            })


        }
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        };

    }
})(angular);