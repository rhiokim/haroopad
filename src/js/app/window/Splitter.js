define([
		'keyboard'
	], 
	function(HotKey) {
		var $editor = $('#editor');
		// var $spliter = $('#spliter');
		var $viewer = $('#haroo iframe');

		var left = 50;
		var right = 50;
		var gap = 5;

		HotKey('defmod-]', function(e) {
			$editor.show().css({ width: '100%' });
			$viewer.hide();
		});
		HotKey('defmod-[', function(e) {
			$editor.hide();
			$viewer.show().css({ width: '100%' });
		});
		HotKey('defmod-\\', function(e) {
			$editor.show().css({ width: '50%' });
			$viewer.show().css({ width: '50%' });
		});

		HotKey('defmod-alt-]', function(e) {
			if(right <= 20) {
				return;
			}
			left = left + gap;
			right = right - gap;
			$editor.show().css({ width: left+'%' });
			$viewer.show().css({ width: right+'%' });
		});

		HotKey('defmod-alt-[', function(e) {
			if(left <= 20) {
				return;
			}
			left = left - gap;
			right = right + gap;
			$editor.show().css({ width: left+'%' });
			$viewer.show().css({ width: right+'%' });
		});
});