define([], 
	function() {

    var gui = require('nw.gui'),
        win = gui.Window.get();

    var Google = new gui.MenuItem({
    	label: 'Google',
    	click: function() {
    	}
    });

		return Google;
});