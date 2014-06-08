/*global $, jQuery, define, alert, require, window, Backbone,Handlebars */
/*jslint browser:true, devel:true, unused:false */

define([
	'backbone',
		'app',
		'jquery'
		],
function(Backbone, App, $) {
	'use strict';

	var tweetsearch = {};

	tweetsearch.endpoint = "https://query.yahooapis.com/v1/public/yql?q=";

	tweetsearch.Model = Backbone.Model.extend({
		defaults: {
				content: '',
				title: '',
				titleNoFormatting: '',
				url: '',
				visibleUrl: '',
				unescapedUrl: '',
				cacheUrl: ''
		},
		initialize: function() {

		}
	});

	tweetsearch.Collection = Backbone.Collection.extend({
		model: tweetsearch.Model,
		//url: Google.endpoint,

		parse: function(response) {

				return response.query.results.json.statuses;
		},
		setKeyword: function(k) {
				var _this = this;
				var oauth_token = localStorage.getItem('oauth_token');
      			var oauth_token_secret = localStorage.getItem('oauth_token_secret');
				var query = 'SELECT * FROM twitter.search.tweets WHERE q="'+k+'" AND consumer_key="cfxYRuFkkcLqLXg9ukTGmA" AND consumer_secret="XBg6tuWyqo991fCfsk0gMFXhg0ilZ9pjgQuxuceen8" AND access_token="'+ oauth_token+'" AND access_token_secret="'+ oauth_token_secret+'"';
				var urlString = tweetsearch.endpoint + encodeURIComponent(query) + "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?";

				this.reset();
				this.url = urlString;
				this.fetch();
		}
	});

	tweetsearch.Results = new tweetsearch.Collection();
		
	tweetsearch.View = Backbone.View.extend({
		manage: true,
		template: 'tweetsearch',
				collection: tweetsearch.Results,

				initialize: function(a, b) {
						if(b){
								tweetsearch.Results.setKeyword(b);
								this.collection.once('reset', this.render, this);
						}
				},

				serialize: function() {
						return {results: this.collection.toJSON()};
				}
	});

	return tweetsearch;
});