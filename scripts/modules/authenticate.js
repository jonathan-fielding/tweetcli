/*global $, jQuery, define, alert, require, window, Backbone */
/*jslint browser:true, devel:true, unused:false */

define([
	'backbone',
  'utility'
	],
function(Backbone, Utility) {
	'use strict';

  var authenticate = {};

	authenticate.View = Backbone.View.extend({
		manage: true,
		template: 'authenticate',

    initialize: function(options, settings) {
      //Get request code
      var requestTokenURL = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20twitter.oauth.requesttoken%20where%20oauth_consumer_key%3D%22cfxYRuFkkcLqLXg9ukTGmA%22%20%0A%09%09%09and%20oauth_consumer_secret%3D%22XBg6tuWyqo991fCfsk0gMFXhg0ilZ9pjgQuxuceen8%22%3B&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?';

      if(settings.length > 0){
        this.result = "Authentication complete";
        this.getAccessToken(settings);
      }
      else{
        $.getJSON(requestTokenURL, this.promptUser);
      }
    },

    promptUser: function(data){
     var oauth_token = Utility.getItemFromString(data.query.results.result, 'oauth_token');
     var oauth_token_secret = Utility.getItemFromString(data.query.results.result, 'oauth_token_secret');
     var url = 'https://api.twitter.com/oauth/authenticate?oauth_token='+oauth_token;
     
     localStorage.setItem('oauth_token',oauth_token);
     localStorage.setItem('oauth_token_secret',oauth_token_secret);

     $('#clickToAuthenticate').append('<p><a href="'+url+'" target="_blank">please click to authenticate</a></p>').attr('id','');
    },
    getAccessToken: function(oauth_pin){
      var oauth_token = localStorage.getItem('oauth_token');
      var oauth_token_secret = localStorage.getItem('oauth_token_secret');
      var requestAcessURL = "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20twitter.oauth.accesstoken%20WHERE%20oauth_consumer_key%3D%22cfxYRuFkkcLqLXg9ukTGmA%22%20and%20oauth_consumer_secret%3D%22XBg6tuWyqo991fCfsk0gMFXhg0ilZ9pjgQuxuceen8%22%20and%20oauth_token%3D%22"+oauth_token+"%22%20and%20oauth_token_secret%3D%22"+oauth_token_secret+"%22%20and%20oauth_verifier%3D%22"+oauth_pin+"%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?";

      localStorage.setItem('oauth_pin',oauth_pin);

      $.getJSON(requestAcessURL,this.processAccessToken);
    },
    processAccessToken: function(data){
      console.log(data);
      var oauth_token = Utility.getItemFromString(data.query.results.result, 'oauth_token');
      var oauth_token_secret = Utility.getItemFromString(data.query.results.result, 'oauth_token_secret');
      var user_id = Utility.getItemFromString(data.query.results.result, 'user_id');
      var screen_name = Utility.getItemFromString(data.query.results.result, 'screen_name');

      localStorage.setItem('oauth_token',oauth_token);
      localStorage.setItem('oauth_token_secret',oauth_token_secret);
      localStorage.setItem('user_id',user_id);
      localStorage.setItem('screen_name',screen_name);

      // var oauth_token = Utility.getItemFromString(data.query.results.result, 'oauth_token');
      // var oauth_token_secret = Utility.getItemFromString(data.query.results.result, 'oauth_token_secret');
    },

    serialize: function() {
      return {results: this.result};
    },
    beforeRender: function() {

    }
	});

	return authenticate;
});
