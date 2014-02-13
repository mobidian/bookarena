﻿"use strict";

(function(app) {
    app.controller("RootCtrl", [
        "$scope", "$rootScope", "$location", "apiService", "notifierService", function($scope, $rootScope, $location, service, notifier) {
            $rootScope.authenticatedUser = {};
            $scope.notImplemented = function() {
                notifier.notify({
                    ResponseType: "error",
                    Message: "Sorry! This feature is not available yet."
                });
            };
            $scope.checkAuthentication = function() {
                service.call("/account/").then(function(result) {
                    if (result.Data) {
                        $rootScope.authenticatedUser = result.Data;
                        $rootScope.authenticatedUser.isAuthenticated = true;

                        if ($location.path() === "/account/login") {
                            $location.path("/");
                        }
                    }
                });
            };

            $scope.checkAuthentication();

            $scope.checkForPermisssionBefore = function(path) {
                if (!$rootScope.authenticatedUser.isAuthenticated) {
                    $rootScope.globalContainer = {
                        redirectTo: path,
                        response: {
                            ResponseType: "error",
                            Message: "Access Denied! You need to login first."
                        }
                    };

                    if ($location.path() === "/account/login") {
                        notifier.notify({
                            ResponseType: "error",
                            Message: "Access Denied! You need to login first."
                        });
                    } else {
                        $location.path("/account/login");
                    }
                } else {
                    $location.path(path);
                }
            };
            $scope.openModal = function(selector) {
                $(selector).foundation("reveal", "open");
            };
            $scope.closeModal = function(selector) {
                $(selector).foundation("reveal", "close");
            };

            $scope.logout = function() {
                service.call("/account/logoff").then(function(result) {
                    $rootScope.authenticatedUser = {};
                    $rootScope.globalContainer = {
                        response: result.Response
                    };
                    $location.path("/account/login");
                });
            };
        }
    ]);
})(angular.module("bookArenaApp"));