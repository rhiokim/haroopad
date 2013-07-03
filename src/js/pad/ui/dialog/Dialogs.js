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

		HotKey('shift-ctrl-space', function() {
			dialogs.shortcuts.show();
		});
		HotKey('cmd-shift-t', PostsDialog.show.bind(PostsDialog));

		window.ee.on('file.posts.tumblr', PostsDialog.show.bind(PostsDialog));
		
		PostsDialog.bind('post', function(mailInfo) {
			window.parent.ee.emit('posts.tumblr', FileOpt.toJSON(), mailInfo);
		});

		window.ee.on('fail.post.tumblr', function(err) {
			if(err.name == 'AuthError') {
				PostsDialog.error('Email and Password not accepted');
			}
		});

		window.ee.on('posted.tumblr', PostsDialog.hide.bind(PostsDialog));

		return dialogs = {
			save: SaveDialog,
			posts: PostsDialog
		}
});