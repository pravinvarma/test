(function (angular) {
    angular.module('flightSearchModule').factory('utilityServices', utilityServices);
    utilityServices.$inject = [];

    function utilityServices($http, constants) {
        return {
            calculateMaxPrice: calculateMaxPrice,
        };
        
        function calculateMaxPrice(data){
           var temp = [];
            var i;
            for (i = 0; i < data.length; i++) {
                temp.push(data[i].cost);
                // console.log('elements', data);
            }
            return temp
        }
    }
})(angular);