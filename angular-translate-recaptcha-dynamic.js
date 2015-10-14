'use strict';
//google recaptcha v2

angular.module('pascalprecht.translate')
	.directive('agrRecaptcha', function ($rootScope, $window, $translate) {

    var lang;
    
    var updateRecaptcha = function(scope, element, attrs){
      if (lang == $translate.use() && $translate.use())
          return;
      lang = $translate.use();  
      
      
      angular.element(document).find('#captchaScript').remove();
      
      var po = document.createElement('script'); 
      po.id="captchaScript";
      po.type = 'text/javascript';
      po.async = true;
      po.src =  '//www.google.com/recaptcha/api.js?render=explicit&onload=agrRecaptchaLoaded&hl=' + lang;
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      
      //var s = angular.element('<script id="captchaScript" src="//www.google.com/recaptcha/api.js?render=explicit&onload=agrRecaptchaLoaded&hl=' + lang + '"><\/script>');
      //angular.element(document).find('head').append(s);
      
      $window.agrRecaptchaLoaded = function(){
        element.html('');
        angular.element(document).find('.pls-container').remove();
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