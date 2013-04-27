/*global $, jQuery, alert, require, window, Backbone, define, Handlebars */
/*jslint browser:true, devel:true, unused:false */

/**
 * Load twitter widget javascript file.
 */
(function(d, s, id) {
	'use strict';

	var js, fjs = d.getElementsByTagName(s)[0];
	if(!d.getElementById(id)) {
		js = d.createElement(s);
		js.id = id;
		js.src = '//platform.twitter.com/widgets.js';
		fjs.parentNode.insertBefore(js, fjs);
	}
}(document, 'script', 'twitter-wjs'));

/**
 * Load Facebook LIke widget javascript file.
 */
(function(d, s, id) {
	'use strict';
	var js, fjs = d.getElementsByTagName(s)[0];
	if(d.getElementById(id)) {
		return;
	}
	js = d.createElement(s);
	js.id = id;
	js.src = '//connect.facebook.net/en_GB/all.js#xfbml=1&appId=136292643197914';
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/**
 * Google Plus Widget code
 */

(function() {
	'use strict';
	var po = document.createElement('script');
	po.type = 'text/javascript';
	po.async = true;
	po.src = 'https://apis.google.com/js/plusone.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(po, s);
})();