define([
		'keyboard',
		// 'ui/file/File.opt',
		'ui/dialog/Save',
		'ui/dialog/Reload',
		'ui/dialog/Email'
	], 
	function(HotKey, /*FileOpt,*/ Save, Reload, Email) {
		var dialogs;

		var SaveDialog = new Save,
			EmailDialog = new Email,
			ReloadDialog = new Reload;


		window.ee.on('menu.file.send.email', function() {
			EmailDialog.show(nw.file.toJSON());
		});
		
		EmailDialog.bind('post', function(mailInfo) {
			window.parent.ee.emit('send.email', nw.file.toJSON(), mailInfo);
		});
		
		EmailDialog.bind('cancel', function() {
			window.parent.ee.emit('cancel.send.email');
		});

		window.ee.on('sent.email', EmailDialog.successHandler.bind(EmailDialog));

		window.ee.on('fail.send.email', function(err) {
			if(err.name == 'AuthError') {
				EmailDialog.error('Email and Password not accepted.');
			}
		});

		HotKey('defmod-shift-e', function() {
			window.ee.emit('menu.file.send.email');
		});

		return dialogs = {
			save: SaveDialog,
			reload: ReloadDialog,
			email: EmailDialog
		}
});