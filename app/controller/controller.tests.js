'use strict';

describe('Application controller Tests', function () {
    var $controller, $scope, testController, $q, $http, popupServiceFn, dataServiceMock, dataServiceMockFun, dataService, airportDeferred, fareListDeferred, popupService;
    var popupServiceFn = function () {
        var popupService = {
            openPopup: function(){
                return
            }
        
        }
    return popupService;
    
    };

      
    var dataServiceMockFun = function () {
        var mockService = {
            getAirports: function () {
                airportDeferred = $q.defer();
                return airportDeferred.promise;
            },
            getFareList: function () {
                fareListDeferred = $q.defer();
                return fareListDeferred.promise;

            }
        }
        return mockService;
    }

    beforeEach(function () {
        module('flightSearchModule');
        module(function ($provide) {
            $provide.service('popupService', popupServiceFn);
            $provide.service('dataService', dataServiceMockFun);
        });

        inject(function (_$controller_, _$rootScope_, _$q_, _$http_, _popupService_) {
            $controller = _$controller_;
            $scope = _$rootScope_.$new();
            $q = _$q_;
            popupService = _popupService_;
            $http = _$http_;
            testController = $controller('flightSearchController', {
                $scope: $scope
            });
           
        });
        spyOn(popupService, 'openPopup').and.callFake(function(){
        
        });
       
    });

    describe('Controller initialization', function () {
        it('Controller should be defined', function () {
            expect(testController).toBeDefined();
        });

        it('should load airport list and city list on controller load', function () {
            var testAirport = [{
                name: 'Pune',
                iata: 'PNQ'
            }, {
                name: 'Delhi',
                iata: 'DEL'
            }];
            airportDeferred.resolve(testAirport);
            $scope.$apply();
            expect(testController.airport[0].name).toBe('Pune');
            expect(testController.airport.length).toBe(2);
        });

        it('should load response data when flightOneWaySearch() method is called', function () {
            var fakeObj = {
                origin: {
                    iata: 'PNQ'
                },
                destination: {
                    iata: 'Del'
                },
                oneway: {
                    date: 12
                }
            };
            var fakeResponse = {
                data: {
                    flight_data: [
                        {
                            airline: 'GoAir',
                            flight_number: 'AF-667',
                            from: 'New Delhi',
                            to: 'Pune',
                            departure: '28/08/17',
                            arrival: '28/08/17',
                            duration: '2',
                            cost: '38706',
                            returnDate: '29/08/17',
                            return: {
                                airline: 'GoAir',
                                flight_number: 'AF-667',
                                from: 'Pune',
                                to: 'New Delhi',
                                departure: '28/08/17',
                                arrival: '28/08/17',
                                duration: '2',
                                cost: '38706',
                                returnDate: '29/08/17'
                            }
                                    }
                ]
                }
            };
            testController.flightOneWaySearch(fakeObj);
            fareListDeferred.resolve(fakeResponse);
            $scope.$apply();
            expect(testController.flightData[0].from).toBe('New Delhi');
            expect(testController.maxVal).toBe(38706);
        });

        it('should return error response when flightOneWaySearch() method is called', function () {
            var fakeObj = {
                origin: {
                    iata: 'PNQ',
                    name: 'Pune'
                },
                destination: {
                    iata: 'Del',
                    name: 'Delhi'
                },
                oneway: {
                    date: 12
                }
            };
            var errorResponse = {
                data: {
                    error: {
                        message: 'Error'
                    }
                }
            }
            testController.flightOneWaySearch(fakeObj);
            fareListDeferred.reject(errorResponse);
            $scope.$apply();
            expect(testController.errorMsg).toBe('Error');
        })

        it('should print correct breadcrumb for oneway journey', function () {
            var fakeObj = {
                origin: {
                    iata: 'PNQ',
                    name: 'Pune'
                },
                destination: {
                    iata: 'Del',
                    name: 'Delhi'
                },
                oneway: {
                    date: 12
                }
            };
            testController.flightOneWaySearch(fakeObj);
            $scope.$apply();
            expect(testController.breadcrumb.origin.name).toBe('Pune');
            expect(testController.breadcrumb.destination.name).toBe('Delhi');
        });

        it('should swap source destination values on click of swap button', function () {
            var fakeData = {
                searchoneway:{
                destination: {
                    continent: 'NA',
                    iata: 'FIV',
                    iso: 'US',
                    name: 'Five Finger CG Heliport',
                    size: null,
                    status: 1,
                    type: 'heliport'
                },
                origin: {
                    continent: 'NA',
                    iata: 'BWS',
                    iso: 'US',
                    name: 'Blaine Municipal Airport',
                    size: null,
                    status: 0,
                    type: 'closed'
                }
                }
            };
            
              testController = $controller('flightSearchController', {
                $scope: $scope
            }, fakeData );
            
            expect(testController.searchoneway.origin.iata).toBe('BWS');
            expect(testController.searchoneway.destination.iata).toBe('FIV');
            
            testController.swapSourceDest();
            $scope.$apply();
            expect(testController.searchoneway.origin.iata).toBe('FIV');
            expect(testController.searchoneway.destination.iata).toBe('BWS');
        });
        
        it('should not return error popup when source/destination selected are different', function(){
            
             var fakeData = {
                searchoneway:{
                destination: {
                    continent: 'NA',
                    iata: 'FIV',
                    iso: 'US',
                    name: 'Five Finger CG Heliport',
                    size: null,
                    status: 1,
                    type: 'heliport'
                },
                origin: {
                    continent: 'NA',
                    iata: 'BWS',
                    iso: 'US',
                    name: 'Blaine Municipal Airport',
                    size: null,
                    status: 0,
                    type: 'closed'
                }
                }
            };
            
              testController = $controller('flightSearchController', {
                $scope: $scope
            }, fakeData );
            
            testController.onSelected();
            $scope.$apply();
            
            expect(testController.isSourceDestinationSame).toBeFalsy();
            expect(popupService.openPopup).not.toHaveBeenCalled();
            
        });
        
         it('should not return error popup when source/destination selected are different', function(){
            
             var fakeData = {
                searchoneway:{
                destination: {
                    continent: 'NA',
                    iata: 'FIV',
                    iso: 'US',
                    name: 'Five Finger CG Heliport',
                    size: null,
                    status: 1,
                    type: 'heliport'
                },
                origin: {
                   continent: 'NA',
                    iata: 'FIV',
                    iso: 'US',
                    name: 'Five Finger CG Heliport',
                    size: null,
                    status: 1,
                    type: 'heliport'
                }
                }
            };
            
              testController = $controller('flightSearchController', {
                $scope: $scope
            }, fakeData );
            
            testController.onSelected();
            $scope.$apply();
            
            expect(testController.isSourceDestinationSame).toBeTruthy();
            expect(popupService.openPopup).toHaveBeenCalled();
            
        })


    });
});