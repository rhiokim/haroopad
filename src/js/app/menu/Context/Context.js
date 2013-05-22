define([
		'menu/Context/Editor',
		'menu/Context/Viewer'
	],
	function(Editor, Viewer) {

		$(window).mousedown(function(e, ev) { 
			var x, y;
			e.preventDefault();

			e = (ev) ? ev : e;
			x = (ev) ? $('#editor').width() + e.clientX : e.clientX;
			y = e.clientY;

			if (e.which === 3) {
				if(ev) {
					Viewer.popup(x, y);
				} else {
					Editor.popup(x, y);
				}
				return false;
	    }
		});

	});