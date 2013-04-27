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
 * Google analytics code
 */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-40491476-1', 'tweetcli.com');
  ga('send', 'pageview');

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