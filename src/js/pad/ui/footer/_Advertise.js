define([
	'store'
	],function(store) {

	var _cookie = store.get('_time') || { donate : 0};

	function loop() {
		var now = new Date().getTime();

		if (_cookie.donate < now) {
			$('#donate-btn>a').popover('show');
			_cookie.donate = now + Math.random() * 1000 * 60 * 60 * 8;
			// _cookie.donate = now + Math.random() * 1000 * 10;
			store.set('_time', _cookie);
		}
	}
	
	$('#donate-btn>a').popover();

	// window.setInterval(loop, 1000 * 60);
	window.setInterval(loop, 1000);

});