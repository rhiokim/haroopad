define([
	'store',
	'editor/Editor',
	'ui/footer/Status',
	'ui/footer/Column',
	'ui/footer/Indentation',
	'ui/footer/_Advertise',
	'ui/footer/_Share'
], function(store, Editor, Status, Column, Indentation, Advertise, Share) {
	var shell = gui.Shell;

	Indentation.on('change', function(tabSize) {
		Editor.setOption('tabSize', tabSize);
		Editor.setOption('indentUnit', tabSize);
		Editor.setOption('indentWithTabs', true);
	});

	Indentation.on('use.tab', function(use) {
		Editor.setOption('indentWithTabs', use);
		// Editor.setOption('showTrailingSpace', use);
	});

	Column.on('change', function(column) {
		window.ee.emit('change.column', column);
	});

	Advertise.on('donate', function() {
		shell.openExternal('http://pad.haroopress.com/page.html?f=grow-up-donate');
	});

	Share.on('click', function(service) {
		var url;

		switch(service) {
			case 'digg':
				url = 'http://digg.com/submit?phase=2&url=http%3A%2F%2Fpad.haroopress.com&title=Haroopad%20-%20The%20Next%20Document%20processor%20based%20on%20Markdown&bodytext=Haroopad%20is%20a%20markdown%20enabled%20document%20processor%20for%20creating%20web-friendly%20documents.%0A%0AYou%20can%20author%20various%20formats%20of%20documents%20such%20as%20blog%20article%2C%20slide%2C%20presentation%2C%20report%2C%20and%20e-mail%20as%20if%20experts%20did.%0A%0AHaroopad%20gives%20you%20same%20experiences%20in%20editing%20regardless%20of%20the%20platform%20you%20are%20working%20on.%20It%20runs%20on%20all%20three%20major%20operating%20systems—Windows%2C%20Mac%20OS%20X%2C%20and%20Linux.&topic=software';
			break;
			case 'twitter':
				url = 'https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fpad.haroopress.com%2F&text=Haroopad%20-%20The%20Next%20Document%20processor%20based%20on%20Markdown%20%23markdown%20%23editor%20%23GFM%20%23haroopad%0A&tw_p=tweetbutton&url=http%3A%2F%2Fpad.haroopress.com&via=haroopad';
			break;
			case 'google':
				url = 'https://plus.google.com/share?url=pad.haroopress.com'
			break;
			case 'facebook':
				url = 'https://www.facebook.com/sharer/sharer.php?u=pad.haroopress.com'
			break;
			case 'hackernews':
				url = 'https://news.ycombinator.com/submitlink?u=http://pad.haroopress.com&t=Haroopad%20-%20The%20Next%20Document%20processor%20based%20on%20Markdown'
			break;
		}

		url && shell.openExternal(url);
	});

	window.ee.on('dom', Status.update.bind(Status));
});