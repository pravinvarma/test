(function(angular){
    'use strict';
    
    angular.module('flightSearchModule').filter('myFilter', function () {
    return function (input, attr) {
        var out = [];
        angular.forEach(input, function (data) {
            if (data.cost <= parseInt(attr)) {
                out.push(data);
            }
        });
        return out;
    }
});

})(angular);