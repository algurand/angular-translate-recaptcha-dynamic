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
    $scope.response = null;
  };
  
  $scope.verified = function (response) {
    $scope.response = response;
	};

	$scope.expired = function() {
		$scope.response = null;
	};

  $scope.register = function(form) {
    alert($scope.response);
  };
});
