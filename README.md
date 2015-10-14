## Usage

### via Bower

```bash
$ bower install angular-translate-recaptcha-dynamic
```

## License

Licensed under MIT. See more details at https://github.com/algurand/angular-translate-recaptcha-dynamic/blob/master/LICENSE


Usage
-----

See [the example file](example/use.html) for a quick usage example.

    IMPORTANT: Keep in mind that the captcha only works when used from a real domain
    and with a valid re-captcha key, so this file won't work if you just load it in
    your browser.

- First, you need to get a valid recaptcha key for your domain. Go to http://www.google.com/recaptcha.

- Include the agr-recaptcha script.

```html
<script type="text/javascript" src="angular-translate-recaptcha-dynamic.js"></script>
```

- After that, you can place a container for the captcha widget in your view, and call the `agr-recaptcha` directive on it like this:

```html
<div
    agr-recaptcha
    key="'---- YOUR PUBLIC KEY GOES HERE ----'"
    on-create="created()"
    on-success="verified(response)"
    on-expire="expired()"
></div>
```

Here, the `key` attribute is passed to the directive's scope, so you can use either a property in your scope or just a hardcoded string. Be careful to use your public key, not your private one.

https://developers.google.com/recaptcha/docs/display#render_param



Listeners
---------

There are three listeners you can use with the directive, `on-create`, `on-success`, and `on-expire`.

* __on-create__: It's called right after the widget is created/recreated.
* __on-success__: It's called once the user resolves the captcha. It receives the response string you would need for verifying the response.
* __on-expire__: It's called when the captcha response expires and the user needs to solve a new captcha.

### Example

```js
app.controller('myCtrl', ['$scope', function ($scope) {
  
  $scope.created = function(){
    $scope.response = null;
  };
  
  $scope.verified = function (response) {
    $scope.response = response;
	};

	$scope.expired = function() {
		$scope.response = null;
	};

  //form submission
  $scope.register = function(form) {
    
    if(form.$valid && $scope.response) {
      Auth.createUser({
        name: $scope.user.name,
        email: $scope.user.email,
        password: $scope.user.password,
        captcha: $scope.response
      })
      .then( function() {
        ...
}]);
```
Response Validation
-------------------

To validate this object from your server, you need to use the API described in the [verify section](https://developers.google.com/recaptcha/docs/verify). Validation is outside of the scope of this tool, since is mandatory to do that at the server side.

Other Parameters
----------------

You can optionally pass additional parameters [grecaptcha.render parameters](https://developers.google.com/recaptcha/docs/display#render_param) __theme__, __type__, __size__, __tabindex__ the captcha should use, as an html attribute:

```html
    <div
        key="'---- YOUR PUBLIC KEY GOES HERE ----'"
        agr-recaptcha
        theme="light"
        type="image"
        size="compact"
        tabindex="0"
        on-create="created()"
        on-success="verified(response)"
        on-expire="expired()"
    ></div>
```