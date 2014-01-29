﻿"use strict";

(function() {
    var bookArenaApp = angular.module("bookArenaApp", ["ngRoute", "ngAnimate"]);

    bookArenaApp.config([
        "$routeProvider", function($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "Template/Home/Welcome.html",
                    controller: "HomeCtrl"
                })
                .when(
                    "/account/login", {
                        templateUrl: "Template/Account/Login.html",
                        controller: "LoginCtrl"
                    })
                .when(
                    "/account/profile", {
                        templateUrl: "Template/Account/Profile.html",
                        controller: "ProfileCtrl"
                    })
                .when(
                    "/books", {
                        templateUrl: "Template/Book/List.html",
                        controller: "BookListCtrl"
                    })
                .when(
                    "/books/transactions", {
                        templateUrl: "Template/Book/Transactions.html",
                        controller: "BookTransactionCtrl"
                    })
                .when(
                    "/books/transactions/:transactionId", {
                        templateUrl: "Template/Book/TransactionDetails.html",
                        controller: "BookTransactionCtrl"
                    })
                .when(
                    "/books/add", {
                        templateUrl: "Template/Book/Add.html",
                        controller: "BookAddCtrl"
                    })
                .when(
                    "/books/book/:id", {
                        templateUrl: "Template/Book/Details.html",
                        controller: "BookDetailsCtrl"
                    })
                .when(
                    "/books/edit/:id", {
                        templateUrl: "Template/Book/Edit.html",
                        controller: "BookEditCtrl"
                    })
                .when(
                    "/books/category/:categoryId", {
                        templateUrl: "Template/Book/List.html",
                        controller: "BookListCtrl"
                    })
                .when(
                    "/categories", {
                        templateUrl: "Template/Category/List.html",
                        controller: "CategoryCtrl"
                    })
                .when(
                    "/students", {
                        templateUrl: "Template/Student/List.html",
                        controller: "StudentListCtrl"
                    })
                .when(
                    "/students/page/:pageNumber", {
                        templateUrl: "Template/Student/List.html",
                        controller: "StudentListCtrl"
                    })
                .when(
                    "/students/add", {
                        templateUrl: "Template/Student/Add.html",
                        controller: "StudentAddCtrl"
                    }).when(
                    "/students/student/:id", {
                        templateUrl: "Template/Student/Details.html",
                        controller: "StudentDetailsCtrl"
                    })
                .when(
                    "/students/edit/:id", {
                        templateUrl: "Template/Student/Edit.html",
                        controller: "StudentEditCtrl"
                    })
                .otherwise({ redirectTo: "/" });
        }
    ]);
})();