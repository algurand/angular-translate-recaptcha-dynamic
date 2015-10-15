'use strict';

angular.module('test', ['pascalprecht.translate'])

.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    'GREETING': 'Hello, World!',
    'NAME':  'Name'
  });
  $translateProvider.translations('uk', {
    'GREETING': 'Привіт, Світ!',
    'NAME':  'Ім\'я'
  });
	$translateProvider.use('en');
})

.controller('testCtrl', function ($scope, $translate) {
  $scope.selectedLanguage = $translate.use();
  $scope.changeLanguage = function(){
    $translate.use($scope.selectedLanguage);
  };
  
	$scope.created = function(){
    console.log('created');
  };
  
  $scope.verified = function (response) {
    console.log('verified');
	};

	$scope.expired = function() {
		console.log('expired');
	};

  $scope.register = function(form) {
    alert($scope.res);
  };
});
