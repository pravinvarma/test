(function (angular) {
    'use strict';
    angular.module('flightSearchModule').controller('flightSearchController', flightSearchController);
    flightSearchController.$inject = ['$http', 'constants', 'dataService', 'utilityServices', 'popupService', 'sourceDestCheckPopupConstant', '$scope'];

    function flightSearchController($http, constants, dataService, utilityServices, popupService, sourceDestCheckPopupConstant, $scope) {
        var vm = this;
        var airport = [];
        vm.returnDate = "";
        vm.flightData = false;

        /********************Date configuration*********************/
        vm.dateOptions = { dateDisabled: disabled, formatYear: 'yy', maxDate: new Date(2020, 5, 22), minDate: new Date(), startingDay: 1 };
        vm.openOneWayDatepicker = function () { vm.oneWayDatepicker.opened = true; };
        vm.openReturnWayDatepicker = function () { vm.returnWayDatepicker.opened = true; };
        vm.oneWayDatepicker = { opened: false };
        vm.returnWayDatepicker = { opened: false };
        vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = vm.formats[0];
        vm.clear = function () { vm.dt = null; };
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        /************Data Services load**************/
        dataService.getAirports(constants.airportURL).then(function (airports) {;
            for (var i in airports) {
                airport.push(airports[i]);
            }
        });
        
        vm.airport = airport;
        vm.flightOneWaySearch = function (data) {
            vm.breadcrumb = angular.copy(data);
            apiServiceCall(data);
        }

        function apiServiceCall(data) {
            var flightResults;
            var url = constants.flightFareURL;
            var flightData = data;
            if (data.origin.iata === data.destination.iata) {
                openPopup(sourceDestCheckPopupConstant.title, sourceDestCheckPopupConstant.message);
                return;
            }
            
            var parameters = {
                source: data.origin.iata,
                destination: data.destination.iata,
                date: data.oneway.date
            }

            dataService.getFareList(parameters, url).then(function (response) {
                var responseObject = response.data;
                vm.flightData = responseObject.flight_data;
                calculateMinMaxPrice(responseObject.flight_data);
            }, function (error) {
                vm.errorMsg = error.data.error.message;
            });
        }

        /*****************Utility functions********************/
        function calculateMinMaxPrice(data) {
            vm.maxVal = Math.max.apply(null, utilityServices.calculateMaxPrice(data));
            vm.minVal = Math.min.apply(null, utilityServices.calculateMaxPrice(data));
        }

        function openPopup(title, bodyMsg) {
            popupService.openPopup(title, bodyMsg);

        }; 

        vm.swapSourceDest = function () {
            var swapVariable;
            swapVariable = angular.copy(vm.searchoneway);
            vm.searchoneway.origin = swapVariable.destination;
            vm.searchoneway.destination = swapVariable.origin;
        }

        vm.onSelected = function () {
            if (vm.searchoneway.origin && vm.searchoneway.destination) {
                if (vm.searchoneway.origin.iata === vm.searchoneway.destination.iata) {
                    vm.isSourceDestinationSame = true;
                    openPopup('Error', 'Source and destination cant be same');
                    return;
                } else {
                vm.isSourceDestinationSame = false;
                }
            } 
        }

    }
})(angular);