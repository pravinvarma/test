(function (angular) {
    angular.module('flightSearchModule')
        .constant('constants', {
            flightFareURL: 'json-response/jsondata.json',
            airportURL: 'json-response/airpot.json',
            config: {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }).
    constant('sourceDestCheckPopupConstant', {
        title: 'Error',
        message: 'Source and destination cant be same'
    });
})(angular);