﻿"use strict";

(function(app) {
    app.controller("BookEditCtrl", [
        "$scope", "$rootScope", "$routeParams", "apiService", "notifierService", function($scope, $rootScope, $routeParams, service, notifier) {
            $rootScope.checkForPermisssionAfter();
            $scope.book = {};
            service.call("/api/book/" + $routeParams.id).then(function(result) {
                $scope.book = result.Data;
            });
            $scope.update = function() {
                if ($scope.BookEditForm.$valid && $rootScope.authenticatedUser.IsAuthenticated) {
                    service.call("/api/editbook/", $("form[name=BookEditForm]").serialize(), "POST").then(function(result) {
                        notifier.notify(result.Response);
                    });
                }
            };
        }
    ]);
})(angular.module("bookArenaApp"));