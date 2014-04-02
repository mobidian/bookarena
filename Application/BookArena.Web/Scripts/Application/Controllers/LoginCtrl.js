﻿"use strict";

(function(app) {
    app.controller("LoginCtrl", [
        "$scope", "$rootScope", "$location", "apiService", "notifierService", "identityService", function($scope, $rootScope, $location, service, notifier, identityService) {
            var tempGlobalContainer = $.extend(true, {}, $rootScope.globalContainer);
            $rootScope.globalContainer = null;

            if (identityService.isAuthenticated()) {
                $location.path("/").replace();
            }
            if (tempGlobalContainer && tempGlobalContainer.response) {
                notifier.notify(tempGlobalContainer.response);
            }
            $scope.data = {
                userName: "admin",
                password: "HakunaMatata"
            };

            $scope.login = function() {
                if ($scope.LoginForm.$valid) {
                    service.call("/account/login/", $("#LoginForm").serialize(), "POST").then(function(result) {
                        if (result.Data) {
                            identityService.setAuthorizationData(result.Data);

                            if (tempGlobalContainer && tempGlobalContainer.redirectTo) {
                                $location.path(tempGlobalContainer.redirectTo).replace();
                            } else {
                                $location.path("/").replace();
                            }
                        } else {
                            notifier.notify(result.response);
                        }
                    });
                }
            };
        }
    ]);
})(angular.module("bookArenaApp"));