(function () {
    'use strict';

    describe('decertifications.developers.controller', function () {
        var vm, scope, $log, $q, commonService, mock;

        mock = {
            decertifiedDeveloperResults:[{"developer":{"developerId":4,"developerCode":"1003","name":"4medica, Inc.","website":null,"address":null,"contact":{"contactId":64,"firstName":"Barb","lastName":"Jones","email":"bjones@example.com","phoneNumber":"123-123-1234","title":null},"status":{"id":2,"status":"Suspended by ONC"},"lastModifiedDate":"1480695890024","deleted":false,"transparencyAttestations":[]},"certifyingBody":[{"id":6,"acbCode":"07","name":"ICSA Labs","website":"http://www.example.com","address":{"addressId":4,"line1":"Line 1","line2":null,"city":"City","state":"State","zipcode":"Zip","country":"US"},"isDeleted":false}],"estimatedUsers":null}],
            muuAccurateAsOfDate: (new Date('2017-01-13')).getTime(),
            modifiedDecertifiedDevelopers: [
                {stDeveloper: '4medica, Inc.', stAcb: ['ICSA Labs'], stStatus: 'Suspended by ONC', stEstimatedUsers: null}],
            filter: { acb: 'Drummond', developer: 'epic', status: 'broke'}
        };

        beforeEach(function () {
            module('chpl.decertifications', function ($provide) {
                $provide.decorator('commonService', function ($delegate) {
                    $delegate.getDecertifiedDevelopers = jasmine.createSpy('getDecertifiedDevelopers');
                    $delegate.getMeaningfulUseUsersAccurateAsOfDate = jasmine.createSpy('getMeaningfulUseUsersAccurateAsOfDate');
                    return $delegate;
                });
            });

            inject(function ($controller, $rootScope, _$log_, _$q_, _commonService_) {
                $log = _$log_;
                $q = _$q_;
                commonService = _commonService_;
                commonService.getDecertifiedDevelopers.and.returnValue($q.when({decertifiedDeveloperResults: mock.decertifiedDeveloperResults}));
                commonService.getMeaningfulUseUsersAccurateAsOfDate.and.returnValue($q.when({accurateAsOfDate: mock.muuAccurateAsOfDate}));

                scope = $rootScope.$new();
                vm = $controller('DecertifiedDevelopersController', {
                    $scope: scope
                });
                scope.$digest();
            });
        });

        afterEach(function () {
            if ($log.debug.logs.length > 0) {
                //console.debug('\n Debug: ' + $log.debug.logs.join('\n Debug: '));
            }
        });

        it('should exist', function () {
            expect(vm).toBeDefined();
        });

        it('should have called the commonService to load decertified Developers', function () {
            expect(commonService.getDecertifiedDevelopers).toHaveBeenCalled();
        });

        it('should know how many decertified Developers there are', function () {
            expect(vm.decertifiedDevelopers.length).toBe(1);
        });

        it('should set the displayed Developers to match the found ones', function () {
            expect(vm.displayedDevelopers).toEqual(mock.decertifiedDeveloperResults);
        });

        it('should generate the smart-table fields', function () {
            expect(vm.modifiedDecertifiedDevelopers).toEqual(mock.modifiedDecertifiedDevelopers);
        });

        it('should know what the muu_accurate_as_of_date is', function () {
            expect(vm.muuAccurateAsOf).toEqual(mock.muuAccurateAsOfDate);
        });
    });
})();