define([
		'editor/emoji.data',
		'editor/lang.data'
	], function(emojis, langs) {

    var _isWork = false;
	var KEY_CODE = {
      DOWN: 40,
      UP: 38,
      LEFT: 37,
      RIGHT: 39,
      ESC: 27,
      TAB: 9,
      ENTER: 13
    };

var header = [ '#', '##', '###', '####', '#####' ];
var header = $.map(header,function(value, i) {
    return { id: i+2, name: value, md: value };
});

	//http://a248.e.akamai.net/assets.github.com/images/icons/emoji/8.png
	var $at = $(".CodeMirror textarea").atwho({
        at: "#",
        data: header,
        tpl: "<li data-value='#${md}'> <small>H${id}</small> <b>#${md}</b></li>"
    }).atwho({
        at: "!",
        data: [ { name: '![alt text](url "title")', md: '![]()' } ],
        tpl: "<li data-value='${md}'> <small>image</small> ${name}</li>"
    }).atwho({
        at: "@",
        data: [ { name: '@[caption](url "style")', md: '@[]()' } ],
        tpl: "<li data-value='${md}'> <small>embed</small> @${name}</li>"
    }).atwho({
        at: "```",
        data: langs,
        tpl: "<li data-value='```${md}\n\n```'> <small>code block</small> ${name}</li>"
    }).atwho({
        at: "$",
        data: [ { name: '$$ ... $$', 'md': '$$\n\n$$' }, { name: '$$$ ... $$$', 'md': '$$$ $$$' } ],
        tpl: "<li data-value='${md}'> <small>block</small> ${name}</li>"
    }).atwho({
		at: ':',
		tpl: "<li data-value=':${key}:'><img src='http://a248.e.akamai.net/assets.github.com/images/icons/emoji/${name}.png' height='20' width='20'/> ${name} </li>",
		data: emojis,
    	display_timeout: 1
	});

	function _prevent(cm, e) {
		switch (e.keyCode) {
			case KEY_CODE.DOWN:
			case KEY_CODE.UP:
			// case KEY_CODE.LEFT:
			// case KEY_CODE.RIGHT:
			case KEY_CODE.ENTER:
			case KEY_CODE.TAB:
				e.preventDefault();
			break;
			// case KEY_CODE.ESC:
			// 	_unregister();
			// break;
		}
	}

	function _unregister() {
		nw.editor.off('keydown', _prevent);

		_isWork = false;
	}

	$at.on("matched.atwho", function(event, flag) {
		if (!_isWork) {
			nw.editor.on('keydown', _prevent);	
		}

		_isWork = true;
	});

	$at.on("inserted.atwho", function(event, flag) {
		_unregister();
	});

	$at.on("blur", function(event, flag) {
		console.log('blur')
	});

	$at.on('hide.atwho', function() {
		console.log('hide')
		_unregister();
	});

});