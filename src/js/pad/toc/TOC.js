define([], function() {

		var iframe = $('#haroo iframe')[0];
		var _viewer = iframe.contentWindow;
		var aside = $('#main > aside');

		_viewer.ee.on('toc', function(str) {
			$('#toc').html(str);
		});

		window.ee.on('menu.view.doc.outline', function(show) {
			show ? _viewer.showOutline() : _viewer.hideOutline();
		});
		window.ee.on('menu.view.doc.toc', function(show) {
			show ? aside.fadeIn() : _viewer.fadeOut();
		});
});