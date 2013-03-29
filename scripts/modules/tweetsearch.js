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

	tweetsearch.endpoint = 'http://search.twitter.com/search.json?&rpp=5&include_entities=true&result_type=mixed&callback=?';

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
				return response.results;
		},
		setKeyword: function(k) {
				var _this = this;
				var urlString = tweetsearch.endpoint + '&q=' + k;
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