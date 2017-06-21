(function () {
    "use strict";

    angular.module(APPNAME)
     .factory('$sampleService', SampleServiceFactory);

    SampleServiceFactory.$inject = ['$baseService'];

    function SampleServiceFactory($baseService) {
        var newService = $baseService.merge(true, {}, $baseService);
        return newService;
    }
})();


(function () {
    "use strict";

    angular.module(APPNAME)
    .controller("sampleController", SampleController);


    SampleController.$inject = ['$scope', '$baseController', '$sampleService', '$filter'];

    function SampleController(
        $scope
        , $baseController
        , $sampleService
        , $filter) {

        var vm = this;
        $baseController.merge(vm, $baseController);

        vm.$scope = $scope;
        vm.$baseController = $baseController;
        vm.$filter = $filter;
        vm.$sampleService = $sampleService;

        vm.activeChildLabel = "";
        vm.date = new Date(Date.now());
        vm.stringDate = vm.date.toDateString();
        vm.timeForms = {};
        vm.timeLog = {};

        vm.accordions = [
            {
                'open': false
            }
            , {
                'open': false
            }
            , {
                'open': false
            }
            , {
                'open': false
            }
            , {
                'open': false
            }
            , {
                'open': false
            }
            , {
                'open': false
            }
            , {
                'open': false
            }
        ];
        vm.childRecords = [
            {
                'name': "Jennifer"
                , 'records': [{}]
            }
            , {
                'name': "Bob"
                , 'records': [{}]
            }
            , {
                'name': "James"
                , 'records': [{}]
            }
            , {
                'name': "Sally"
                , 'records': [{}]
            }
            , {
                'name': "Dante"
                , 'records': [{}]
            }
            , {
                'name': "Nina"
                , 'records': [{}]
            }
            , {
                'name': "Christine"
                , 'records': [{}]
            }
            , {
                'name': "Charlie"
                , 'records': [{}]
            }
            , {
                'name': "Victoria"
                , 'records': [{}]
            }
            , {
                'name': "Quincy"
                , 'records': [{}]
            }
        ];

        vm.addDetails = _addDetails;
        vm.addNewTimeInput = _addNewTimeInput;
        vm.changeStudentLabel = _changeStudentLabel;
        vm.collapseAll = _collapseAll;
        vm.dateChanged = _dateChanged;
        vm.expandAll = _expandAll;
        vm.findActiveChild = _findActiveChild;
        vm.formatTime = _formatTime;
        vm.getCurrentTime = _getCurrentTime;
        vm.isEmpty = _isEmpty;
        vm.removeTimeInput = _removeTimeInput;

        function _addDetails(index, record) {
            if (vm.date != null) {
                record.date = vm.date;
            }
            vm.changeStudentLabel(record);
        };

        function _addNewTimeInput(forceAdd) {
            var currentChild = vm.findActiveChild();

            var records = currentChild.records;
            var lastRecord = currentChild.records[currentChild.records.length - 1];


            if (forceAdd || vm.isEmpty(lastRecord) || lastRecord.date == null) {
                currentChild.records.push({ 'date': vm.date });
            }
        }

        function _collapseAll() {
            vm.accordions.forEach(function (accordion) {
                accordion.open = false;
            });
        }

        function _changeStudentLabel(currentTimeRecord) {

            if (currentTimeRecord != null || !vm.isEmpty(currentTimeRecord)) {

                if (currentTimeRecord.outTime) {
                    vm.activeChildLabel = "OUT";
                }

                else if (currentTimeRecord.inTime) {
                    vm.activeChildLabel = "IN";
                }
                else {
                    vm.activeChildLabel = "";
                }
            }
            else {
                vm.activeChildLabel = "";
            }
        }

        function _dateChanged() {
            vm.stringDate = vm.date.toDateString();
            vm.addNewTimeInput();
        }

        function _expandAll() {
            vm.accordions.forEach(function (accordion) {
                accordion.open = true;
            });
        }

        function _findActiveChild() {
            for (var i = 0; i < vm.childRecords.length; i++) {
                if (vm.childRecords[i].name == vm.activeChild.name) {
                    return vm.childRecords[i];
                }
            }
        }

        function _formatTime(time) {
            if (parseInt(time) < 10)
                return "0" + time;
            return time;
        }

        function _getCurrentTime(obj) {
            var now = new Date(Date.now());
            var currentTime = vm.formatTime(now.getHours()) + ":" + vm.formatTime(now.getMinutes());
            var time = "Thu Jan 1 1970 " + currentTime.toString();
            var currentChild = vm.findActiveChild();

            currentChild.records[currentChild.records.length - 1].inTime = new Date(time);

            currentChild.records[currentChild.records.length - 1].outTime = new Date(time);
        }

        function _isEmpty(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }

        function _removeTimeInput(child) {
            var currentChild = vm.findActiveChild();
            var currentChildRecords = currentChild.records;

            currentChildRecords.splice(currentChildRecords.length - 1);

            vm.changeStudentLabel(currentChildRecords[currentChildRecords.length - 1]);
        }

        angular.element(document).ready(function () {
            vm.childRecords[0].records[0].date = vm.date;
        });

    }
})();