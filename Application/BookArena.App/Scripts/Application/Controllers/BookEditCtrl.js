﻿"use strict";

(function(app) {
    app.controller("BookEditCtrl", [
        "$scope", "$rootScope", "$routeParams", "$location", "apiService", "notifierService", "identityService", function($scope, $rootScope, $routeParams, $location, apiService, notifierService, identityService) {
            if (identityService.isLoggedIn()) {
                $scope.book = {};
                $scope.categories = [];

                apiService.get("/api/books/" + $routeParams.id).success(function(result) {
                    if (result) {
                        $scope.book = result;

                        apiService.get("/api/categories/").success(function(categories) {
                            $scope.categories = categories;
                        });
                    } else {
                        $location.path("/").replace();
                    }
                });
            } else {
                identityService.createAccessDeniedResponse();
                $location.path("/account/login").replace();
            }
            $scope.update = function(book) {
                $scope.BookEditForm.submitted = true;
                if (identityService.isLoggedIn() && $scope.BookEditForm.$valid) {
                    $scope.editingBook = true;
                    var config = {
                        headers: identityService.getSecurityHeaders()
                    }

                    apiService.put("/api/books/", book, config).success(function(result) {
                        notifierService.notifySuccess(result.message);
                        $scope.editingBook = false;
                    }).error(function(error) {
                        notifierService.notifyError(error.message);
                        $scope.editingBook = false;
                    });
                }
            };
        }
    ]);
})(_app);