define([
	// 'editor/Editor',
	'ui/footer/State',
	'ui/footer/Column',
	'ui/footer/Indentation',
	'ui/footer/Document',
	'ui/footer/_Advertise',
	'ui/footer/_Share'
], function(State, Column, Indentation, Document, Advertise, Share) {
	var shell = gui.Shell;
	var editorOpt = store.get('Editor') || {};

	Column.set('single');
	
	Indentation.selectTabSize(editorOpt.tabSize || 4);
	Indentation.checkUseTab(editorOpt.indentWithTabs);

	State.on('hover', function() {
		global._gaq.push('haroopad', 'show current state', '');
	});

	Indentation.on('change', function(tabSize) {
		nw.editor.setOption('tabSize', tabSize);
		nw.editor.setOption('indentUnit', tabSize);

		global._gaq.push('haroopad', 'footer', 'change tab size: '+ tabSize);
	});

	Indentation.on('use.tab', function(use) {
		nw.editor.setOption('indentWithTabs', use);

		global._gaq.push('haroopad', 'footer', 'indent with tab: '+ use);
	});

	Indentation.on('click', function() {
		Advertise.hide();
	});

	Column.on('change', function(column) {
		window.ee.emit('change.column', column);

		global._gaq.push('haroopad', 'set column layout', column);
	});

	Column.on('click', function() {
		Advertise.hide();
	});

	// Advertise.on('donate', function() {
		// shell.openExternal('http://pad.haroopress.com/page.html?f=grow-up-donate');
	// });

	Document.on('click', function() {
		Advertise.hide();
	});

	Document.on('outline', function(show) {
		window.ee.emit('menu.view.doc.outline', show);

		global._gaq.push('haroopad', 'set outline view', show);
	});

	Document.on('toc', function(show) {
		window.ee.emit('menu.view.toggle.toc', show);

		global._gaq.push('haroopad', 'set toc view', show);
	});

	Document.on('help', function(show) {
		// window.ee.emit('menu.help.syntax'); 
		window.ee.emit('toggle.syntax.help');
		global._gaq.push('haroopad', 'show markdown syntax help', '');
	});

	Document.on('fullscreen', function(show) {
		window.ee.emit('view.fullscreen', show);
	});

	Share.on('click', function() {
		Advertise.hide();
	});

	Share.on('select', function(service) {
		var url;

		switch(service) {
			case 'digg':
				url = 'http://digg.com/submit?phase=2&url=http%3A%2F%2Fpad.haroopress.com&title=Haroopad%20-%20The%20Next%20Document%20processor%20based%20on%20Markdown&bodytext=Haroopad%20is%20a%20markdown%20enabled%20document%20processor%20for%20creating%20web-friendly%20documents.%0A%0AYou%20can%20author%20various%20formats%20of%20documents%20such%20as%20blog%20article%2C%20slide%2C%20presentation%2C%20report%2C%20and%20e-mail%20as%20if%20experts%20did.%0A%0AHaroopad%20gives%20you%20same%20experiences%20in%20editing%20regardless%20of%20the%20platform%20you%20are%20working%20on.%20It%20runs%20on%20all%20three%20major%20operating%20systems—Windows%2C%20Mac%20OS%20X%2C%20and%20Linux.&topic=software';

				global._gaq.push('haroopad', 'Share to digg', '');
			break;
			case 'twitter':
				url = 'https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fpad.haroopress.com%2F&text=Haroopad%20-%20The%20Next%20Document%20processor%20based%20on%20Markdown%20%23markdown%20%23editor%20%23GFM%20%23haroopad%0A&tw_p=tweetbutton&url=http%3A%2F%2Fpad.haroopress.com&via=haroopad';

				global._gaq.push('haroopad', 'Share to twitter', '');
			break;
			case 'google':
				url = 'https://plus.google.com/share?url=pad.haroopress.com'

				global._gaq.push('haroopad', 'Share to google+', '');
			break;
			case 'facebook':
				url = 'https://www.facebook.com/sharer/sharer.php?u=pad.haroopress.com'

				global._gaq.push('haroopad', 'Share to facebook', '');
			break;
			case 'hackernews':
				url = 'https://news.ycombinator.com/item?id=6171392'
				
				global._gaq.push('haroopad', 'Share to hackernews', '');
			break;
			case 'linkedin':
				url = 'http://www.linkedin.com/cws/share?url=http%3A%2F%2Fpad%2Eharoopress%2Ecom%2F'

				global._gaq.push('haroopad', 'Share to linkedin', '');
			break;
		}

		url && shell.openExternal(url);
	});

	nw.file.doc.on('change:dom', State.update.bind(State))
});