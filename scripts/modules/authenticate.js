/*global $, jQuery, define, alert, require, window, Backbone,Handlebars */
/*jslint browser:true, devel:true, unused:false */

define([
	'backbone',
	'app',
	'jquery'
],
function(Backbone, App, $) {
	'use strict';

	var authenticate = {};

	authenticate.View = Backbone.View.extend({
		manage: true,
		template: 'authenticate',
		collection: authenticate.Results,

		initialize: function(a, b) {
			if(b){
				authenticate.Results.setKeyword(b);
				this.collection.once('reset', this.render, this);
			}
		}
	});

	return authenticate;
});