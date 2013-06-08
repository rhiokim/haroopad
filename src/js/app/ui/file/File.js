define([
	  'keyboard',
	  'ui/file/Open',
	  'ui/file/Save'
	], 

	function(HotKey, Open, Save) {

	  HotKey('defmod-o', Open.show.bind(Open));

	  Open.on('file.open', function(file) {
	  	alert(file);
	  });	
});