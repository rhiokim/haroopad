define([
		'store'
	], 
	function(store) {
		var gui = require('nw.gui');
		var win = gui.Window.get();

		var defaults = {
				x: 0,
				y: 0,
				width: 1024,
				height: 600,
				isFullscreen: false,
				zoom: 1,
				mode: 1, // view mode 0 is dual, 1 is only editor
				viewerWidth: 50
			};

		var opt = localStorage.getItem('Window');

		if(opt) {
			opt = JSON.parse(opt);
		} else {
			store.set('Window', defaults);
			opt = defaults;
		}

		return {
			toJSON: function() {
				return opt;
			},
			
			save: function() {
				store.set('Window', {
					x: win.x,
					y: win.y,
					width: win.width,
					height: win.height,
					isFullscreen: win.isFullscreen,
					isKioskMode: win.isKioskMode,
					zoom: win.zoom,
					mode: 0,
					viewerWidth: 50
				});
			}
		}

		// var Model = Backbone.Model.extend({
		// 	defaults: {
		// 		x: 0,
		// 		y: 0,
		// 		width: 1024,
		// 		height: 600,
		// 		isFullscreen: false,
		// 		zoom: 1,
		// 		mode: 1, // view mode 0 is dual, 1 is only editor
		// 		viewerWidth: 50
		// 	},

		// 	initialize: function() {
		// 		var opt = localStorage.getItem('Window');

		// 		this.bind('change', function() {
		// 			store.set('Window', this.toJSON());
		// 		});

		// 		if(opt) {
		// 			this.set(JSON.parse(opt));
		// 		} else {
		// 			this.set(this.defaults);
		// 			store.set('Window', this.toJSON());
		// 		}
		// 	},

		// 	save: function() {
		// 		this.set({
		// 			x: win.x,
		// 			y: win.y,
		// 			width: win.width,
		// 			height: win.height,
		// 			isFullscreen: win.isFullscreen,
		// 			isKioskMode: win.isKioskMode,
		// 			zoom: win.zoom,
		// 			mode: this.get('mode'),
		// 			viewerWidth: this.get('viewerWidth')
		// 		});
		// 	}
		// });

		// return new Model();
});