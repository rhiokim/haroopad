define([], function() {

		var iframe = $('#haroo iframe')[0];
		var _viewer = iframe.contentWindow;

		_viewer.ee.on('toc', function(str) {
			$('#toc').html(str);
		});
});