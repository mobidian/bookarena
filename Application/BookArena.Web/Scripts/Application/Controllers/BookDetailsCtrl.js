﻿"use strict";

(function(app) {
    app.controller("BookDetailsCtrl", [
        "$scope", "$rootScope", "$routeParams", "$location", "apiService", function($scope, $rootScope, $routeParams, $location, service) {
            $scope.init = function() {
                $(document).foundation();
                $scope.book = {};
                $scope.data = {};
                $scope.searchedStudent = {};

                service.call("/books/book/" + $routeParams.id).then(function(result) {
                    result.Data = $.parseJSON(result.Data);
                    $scope.book = result.Data;
                });
            }();
            $scope.loginToEditBook = function() {
                $rootScope.globalContainer = {
                    redirectTo: "/books/edit/" + $routeParams.id
                };
                $location.path("/account/login/");
            };
            $scope.searchStudent = function() {
                if ($rootScope.authenticatedUser.IsAuthenticated && $scope.data.idCardNumber) {
                    $scope.searchStudentInProgress = true;
                    service.call("/students/studentbyidcard?idCard=" + $scope.data.idCardNumber).then(function(result) {
                        $scope.searchStudentInProgress = false;
                        if (result.Data) {
                            $scope.searchedStudent = result.Data;
                        } else {
                            $scope.searchedStudent = {};
                        }
                    });
                }
            };
            $scope.borrowBook = function(studentId, bookId) {
                if ($rootScope.authenticatedUser.IsAuthenticated) {
                    service.call("/books/borrow?studentId=" + studentId + "&bookId=" + bookId, null, "POST").then(function(result) {
                        if (result.Data) {
                        } else {
                        }
                    });
                }
            };
            $scope.displayBorrowButton = function() {
                if ($rootScope.authenticatedUser.IsAuthenticated && $scope.book.Quantity) {
                    return true;
                }
                return false;
            };
        }
    ]);
})(angular.module("bookArenaApp"));