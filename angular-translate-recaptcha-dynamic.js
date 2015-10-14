'use strict';
//google recaptcha v2

angular.module('pascalprecht.translate')
	.directive('agrRecaptcha', function ($rootScope, $window, $translate) {
    
    var lang;
    
    var updateRecaptcha = function(scope, element, attrs){
      if (lang == $translate.use())
          return;
      lang = $translate.use();  
      
      angular.element('#captchaScript').remove();
      var s = angular.element('<script id="captchaScript" src="//www.google.com/recaptcha/api.js?render=explicit&onload=agrRecaptchaLoaded&hl=' + lang + '"></script>').appendTo(angular.element('head'));
      
      $window.agrRecaptchaLoaded = function(){
        element.html('');
        angular.element('.pls-container').remove();
        var par = {};
        attrs.key ? par.sitekey = attrs.key : null;
        attrs.theme ? par.theme = attrs.theme : null;
        attrs.size ? par.size = attrs.key : null;
        attrs.tabindex ? par.tabindex = attrs.key : null;
        
        par.callback = function (response){
          scope.onSuccess({response: response});
        }
        
        par['expired-callback'] = function (){
          scope.onExpire();
        }
        
        $window.grecaptcha.render(element[0], par);
        scope.onCreate();
      }
    };
    
    
    var rc = {
      restrict: 'A',
      scope:{
        onSuccess: '&',
        onExpire: '&',
        onCreate: '&'
      },
      
      link: function(scope, element, attrs){
        if (!attrs.key) 
           throw new Error('You need to set the "key" attribute to your public reCaptcha key. If you don\'t have a key, please get one from https://www.google.com/recaptcha/admin/create');
         
        updateRecaptcha(scope, element, attrs);
        $rootScope.$on('$translateChangeSuccess', function (event, data) {
          updateRecaptcha(scope, element, attrs);
        });
      }
    }
    
    return rc;
	});