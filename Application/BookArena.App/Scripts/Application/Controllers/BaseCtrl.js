﻿(function(app) {
    "use strict";

    app.controller("BaseCtrl", [
        "$scope", "$rootScope", "$location", "apiService", "notifierService", "identityService", function($scope, $rootScope, $location, service, notifierService, identityService) {
            $scope.notImplemented = function() {
                notifierService.notifyError("Sorry! This feature is not available yet.");
            };

            $scope.redirectToHome = function () {
                $location.path("/");
            };

            $scope.openModal = function(selector) {
                $(selector).foundation("reveal", "open");
            };

            $scope.closeModal = function(selector) {
                $(selector).foundation("reveal", "close");
            };

            $scope.logout = function() {
                identityService.logout().success(function(result) {
                    identityService.clearAccessToken();
                    identityService.clearAuthorizedUserData();
                    $rootScope.globalContainer = {
                        notifyType: "success",
                        message: result.message
                    };
                    $location.path("/account/login");
                });
            };

            $scope.displayErrors = function(errorResponse) {
                if (errorResponse.modelState) {
                    var errors = _.flatten(_.map(errorResponse.modelState, function(items) {
                        return items;
                    }));
                    notifierService.notifyError(errors);
                } else {
                    notifierService.notifyError(errorResponse.message);
                }
            };

            $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
        }
    ]);
})(angular.module("bookArena"));