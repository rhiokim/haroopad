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


		window.ee.on('file.posts.tumblr', EmailDialog.show.bind(EmailDialog));
		
		EmailDialog.bind('post', function(mailInfo) {
			window.parent.ee.emit('posts.tumblr', nw.file.toJSON(), mailInfo);
		});

		window.ee.on('posted.tumblr', EmailDialog.successHandler.bind(EmailDialog));

		window.ee.on('fail.post.tumblr', function(err) {
			if(err.name == 'AuthError') {
				EmailDialog.error('Email and Password not accepted');
			}
		});

		HotKey('cmd-shift-t', function() {
			window.ee.emit('file.posts.tumblr');
		});

		return dialogs = {
			save: SaveDialog,
			reload: ReloadDialog,
			email: EmailDialog
		}
});