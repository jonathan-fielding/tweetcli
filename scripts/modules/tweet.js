/*global $, jQuery, define, alert, require, window, Backbone */
/*jslint browser:true, devel:true, unused:false */

define([
	'backbone',
  'utility'
	],
function(Backbone, Utility) {
	'use strict';

  var tweet = {};

	tweet.View = Backbone.View.extend({
		manage: true,
		template: 'tweet',

    initialize: function(options, settings) {
      //Get request code
  
      if(settings.length > 0){
        this.result = "Tweeting...";
        this.sendTweet(settings);
      }
    },

    sendTweet: function(tweet){
      var oauth_token = localStorage.getItem('oauth_token');
      var oauth_token_secret = localStorage.getItem('oauth_token_secret');
      var postTweetURL = "https://query.yahooapis.com/v1/public/yql?q="+ encodeURIComponent('INSERT INTO twitter.status (status,oauth_consumer_key,oauth_consumer_secret,oauth_token,oauth_token_secret ) VALUES ("'+tweet+'","cfxYRuFkkcLqLXg9ukTGmA","XBg6tuWyqo991fCfsk0gMFXhg0ilZ9pjgQuxuceen8","'+ oauth_token+'","'+ oauth_token_secret+'" )') +"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?";

      $.getJSON(postTweetURL,this.tweetSent);
    },
    tweetSent: function(){

    },

    serialize: function() {
      return {results: this.result};
    },
    beforeRender: function() {

    }
	});

	return tweet;
});
