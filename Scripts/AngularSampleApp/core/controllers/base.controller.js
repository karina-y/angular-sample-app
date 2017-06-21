(function () {
    "use strict";


    //  we add baseController as a service factory (even though it will be extended by controllers, not services) so it can be injected
    angular.module(APPNAME)
    .factory('$baseController', BaseController);

    BaseController.$inject = ['$document', '$log', '$route', '$routeParams', '$systemEventService', '$sample'];

    function BaseController(
        $document,
        $log,
        $route,
        $routeParams,
        $systemEventService,
        $sample) {

        var base = {
            $document: $document
            , $log: $log
            , merge: $.extend
            , mapData: $.map
            , $sample: $sample
            , $route: $route
            , $routeParams: $routeParams
            , $systemEventService: $systemEventService
            , setUpCurrentRequest: function (viewModel) {

                viewModel.currentRequest = { originalPath: "/", isTop: true };

                if (viewModel.$route.current) {
                    viewModel.currentRequest = viewModel.$route.current;
                    viewModel.currentRequest.locals = {};
                    viewModel.currentRequest.isTop = false;
                }

                viewModel.$log.log("setUpCurrentRequest firing:");
                viewModel.$log.debug(viewModel.currentRequest);
            }
            , showErrors: function (errorResponse) {
                for (var errorIndex in errorResponse.errors) {
                    var msg = errorResponse.errors[errorIndex];
                }
            }
        };

        base.getParentController = _getParentController;

        function _getParentController(controllerName) {

            var controller = null;

            if (this.$scope && this.$scope.$parent) {
                controller = this.$scope.$parent[controllerName];
            }

            return controller;

        }

        return base;
    }

})();