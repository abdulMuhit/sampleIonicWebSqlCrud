'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var db;

angular.module('starter', ['ionic', 'starter.controllers', 'utils'])

.run(function($ionicPlatform, $database, $ionicPopup, $state) {
  $ionicPlatform.ready(function() {

        $ionicPlatform.registerBackButtonAction(function(event) {

      // Handle Android back button to avoid the application exits accidentaly
      if ($state.current.name=="landing.menu") {
        $ionicPopup.confirm({
          title: 'Peringatan',
          template: 'Berhenti menggunakan aplikasi ini?'
        }).then(function(res) {
          if (res) {
          ionic.Platform.exitApp();
          }
        });
      } else {
          $ionicHistory.clearCache();
          $ionicHistory.nextViewOptions({
            historyRoot: true
          });
          $state.go('landing.menu');
        }
      }, 100);

        db = $database.initDB();


    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('landing', {
    url: '/landing',
    abstract: true,
    templateUrl: 'templates/landing.html'
  })
  .state('landing.menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })
  .state('landing.contoh', {
    cache: false,
    url: '/contoh',
    templateUrl: 'templates/contoh.html',
    controller: 'contohCtrl'
  });
  
  $urlRouterProvider.otherwise('/landing/menu');

});



