define([
		'keyboard',
		'ui/file/File.opt',
		'ui/dialog/Save',
		'ui/dialog/Email'
	], 
	function(HotKey, FileOpt, Save, Email) {
		var dialogs;

		var SaveDialog = new Save,
			EmailDialog = new Email;


		window.ee.on('file.posts.tumblr', EmailDialog.show.bind(EmailDialog));
		
		EmailDialog.bind('post', function(mailInfo) {
			window.parent.ee.emit('posts.tumblr', FileOpt.toJSON(), mailInfo);
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
			posts: EmailDialog
		}
});