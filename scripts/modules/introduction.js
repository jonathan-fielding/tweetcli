/*global $, jQuery, define, alert, require, window, Backbone */
/*jslint browser:true, devel:true, unused:false */

define([
	'backbone',
  'utility'
	],
function(Backbone, Utility) {
	'use strict';

  var Introduction = {};

	Introduction.Model = Backbone.Model.extend({
		defaults: {
			dateandtime: 'Loading Local Date &amp; Time ...',
			ua: '...',
			ip: '0.0.0.0',
			url: '/',
			breathTime: '...'
		},
		initialize: function() {
      var _this = this;

      setInterval(function() {
        _this.refresh();
      }, 1000);

      Utility.getIP().done(function(data) {
        _this.set('ip', data.ip);
      });
    },

    refresh: function() {
      this.set({
        'dateandtime': Utility.getDateTime()
      });
    }
	});

	Introduction.View = Backbone.View.extend({
		manage: true,
		template: 'introduction',
    initialize: function() {
      this.model.on('change', this.render, this);
    },

    serialize: function() {
      return this.model.toJSON();
    }
	});

  Introduction.ViewHistory = Backbone.View.extend({
    manage: true,
    template: 'viewhistory',

    serialize: function() {
      return this.model;
    }
  });

	return Introduction;
});
