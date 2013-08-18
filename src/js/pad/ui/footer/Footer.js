define([
	'editor/Editor',
	'ui/footer/Status',
	'ui/footer/Column',
	'ui/footer/Indentation'
], function(Editor, Status, Column, Indentation) {

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

	window.ee.on('dom', Status.update.bind(Status));
});