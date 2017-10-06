(function (angular) {
    'use strict';
    angular.module('flightSearchModule').factory('dataExtractionService', dataExtractionService);

    function dataExtractionService() {
        var serv = {
            getSegmentDetails: getSegmentDetails
            , getAirlineIataCode: getAirlineIataCode
        }
        return serv

        function getAirlineIataCode(airline) {
            /*    var airlineIATA = iataDataService.getAirlineIATA();

                for(var airlineIndex = 0; airlineIndex < airlineIATA.length; airlineIndex++) {
                  if(airlineIATA[airlineIndex]["code"] === airline) {
                    return airlineIATA[airlineIndex]["name"] + " (" + airlineIATA[airlineIndex]["icao"] + ")";
                  }
                }*/
        }

        function getSegmentDetails(results, segments, isReturnSegment) {
            var details = {};
            details["segments"] = [];
            for (var segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
                var segment = {};
                var carrier = getAirlineIataCode(segments[segmentIndex]["flight"]["carrier"]);
                if ((segmentIndex === 0 || results["carrier"].indexOf(carrier) === -1) && !isReturnSegment) {
                    results["carrier"].push(carrier);
                }
                //segment["carrier"] = getAirlineIataShortCode(segments[segmentIndex]["flight"]["carrier"]);
                segment["cabin"] = segments[segmentIndex]["cabin"];
                segment["aircraft"] = segments[segmentIndex]["leg"][0]["aircraft"];
                segment["arrivalTime"] = segments[segmentIndex]["leg"][0]["arrivalTime"];
                segment["departureTime"] = segments[segmentIndex]["leg"][0]["departureTime"];
                segment["origin"] = segments[segmentIndex]["leg"][0]["origin"];
                segment["destination"] = segments[segmentIndex]["leg"][0]["destination"];
                segment["mileage"] = segments[segmentIndex]["leg"][0]["mileage"];
                segment["meal"] = segments[segmentIndex]["leg"][0]["meal"];
                details["segments"].push(segment);
                if (segmentIndex === 0) {
                    details["departure"] = segments[0]["leg"][0]["departureTime"];
                }
                if (segmentIndex === segments.length - 1) {
                    details["stops"] = segmentIndex;
                    details["arrival"] = segments[segmentIndex]["leg"][0]["arrivalTime"];
                }
            }
            if (!isReturnSegment) {
                results["depart"] = details;
            }
            else {
                results["return"] = details;
            }
        }
    }
})(angular);