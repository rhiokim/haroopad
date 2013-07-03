define([
		'keyboard',
		'ui/file/File.opt',
		'ui/dialog/Save',
		'ui/dialog/Posts'
	], 
	function(HotKey, FileOpt, Save, Posts) {
		var dialogs;

		var SaveDialog = new Save,
				PostsDialog = new Posts;


		window.ee.on('file.posts.tumblr', PostsDialog.show.bind(PostsDialog));
		
		PostsDialog.bind('post', function(mailInfo) {
			window.parent.ee.emit('posts.tumblr', FileOpt.toJSON(), mailInfo);
		});

		window.ee.on('posted.tumblr', PostsDialog.hide.bind(PostsDialog));

		window.ee.on('fail.post.tumblr', function(err) {
			if(err.name == 'AuthError') {
				PostsDialog.error('Email and Password not accepted');
			}
		});

		HotKey('cmd-shift-t', function() {
			window.ee.emit('file.posts.tumblr');
		});

		return dialogs = {
			save: SaveDialog,
			posts: PostsDialog
		}
});