define([
	], 
	function() {

		var marked = require('marked');
		var renderer = new marked.Renderer();

		function getExt(str) {
	    var ext, sts;
	    str = str || '';
	    sts = str.split('.');

	    return sts.length <= 1 ? '' : '.'+ sts[sts.length-1];
	  }
	  
		function genStyle(props) {
			var key, value, tmp = {};
			props = !props ? '' : props ;

			if (props) {
				props = props.split(';');
				props.forEach(function(prop) {
					prop = prop.split(':');

					if (prop[0] && prop[1]) {
						tmp[prop[0].trim()] = prop[1].trim();
					}
				});
				props = JSON.stringify(tmp);
				props = encodeURIComponent(props);
			}

			return props
		}

		renderer.listitem = function(text) {
			if (/^(\s|<p>)*\[[x ]\]\s*/.test(text)) {
				text = text
					.replace(/^(\s|<p>)*\[ \]\s*/, '$1<input type="checkbox" class="task-list-item" /> ')
					.replace(/^(\s|<p>)*\[[x]\]\s*/, '$1<input type="checkbox" class="task-list-item" checked /> ');
				return '<li style="list-style: none">' + text + '</li>';
			} else {
				return '<li>' + text + '</li>';
			}
		};

		renderer.oembed = function(caption, href, props) {
			var link;

			if (!href) {
				return '';
			}

			props = genStyle(props) ;

			link = '<a href="'+ href +'" data-props="'+ props +'" target="_blank">'+ (caption?caption:href) +'</a>';

			return '<p class="oembed">'+ link +'</p>';
		}
	
		renderer.math = function(text, block) {
			if (block === '$$') {
				return '<p class="mathjax">$$'
					+ text
					+ '$$</p>';
			} else {
				return '<span class="mathjax">'
					+ block
					+ text
					+ block
					+ '</span>';
			}
		}

		renderer.toc = function(props) {
			style = props ? ' style="'+ props +'"' : '';
		  return '<div class="toc"'+ style +'></div>';
		}

		renderer.hr = function(text) {
		  switch(text.trim()) {
		    case '*':
		      text = 'page';//'asterisk';
		    break;
		    case '-':
		      text = 'section';//'hypen';
		    break;
		    case '_':
		      text = 'underscore';
		    break;
		  }
		  return '<hr class="'+ text +'">\n';
		}

		var anchorList = {};
		renderer.heading = function(text, level, raw) {
			//<a name="verlet-js" class="anchor" href="#verlet-js"><span class="octicon octicon-link"></span></a>
			raw = raw.replace(/(<([^>]+)>)/gi,'').toLowerCase().trim().replace(/[\s]+/g, '-');

      var index = 0;
      anchor = raw;
      while (anchorList.hasOwnProperty(anchor)) {
        anchor = raw + "-" + (++index);
      }
      anchorList[anchor] = true;

		  return '<h'
		    + level
		    + ' id="'
		    + this.options.headerPrefix
		    + anchor
		    + '">'
		    + '<a name="'+ anchor +'" href="#'+ anchor +'"></a>'
		    + text
		    + '</h'
		    + level
		    + '>\n';
		};

		function image(href, title, text, props) {
		  var out = '<img src="' + href + '" alt="' + text + '"';

		  if (title) {
		    out += ' title="' + title + '"';
		  }
		  if (props) {
		    out += ' style="' + props + '"';
		  }
		  out += '>';
		  return out;
		}

		function audio(href, ext, title, text, props) {
		  var out = '<audio controls';

		  if (props) {
		  	out += ' style="'+ props +'"';
		  }

		  out += '>';
	    out += '<source src="'+ href +'" type="audio/'+ ext +'" />';
	    out += i18n.t('Your browser does not support the audio tag!');
		  out += '</audio>';

		  return out;
		}

		function video(href, ext, title, text, props) {
		  var out = '<video controls';

		  if (props) {
		  	out += ' style="'+ props +'"';
		  }

		  out += '>';
	    out += '<source src="'+ href +'" type="video/'+ ext +'" />';
	    out += i18n.t('Your browser does not support the video tag!');
		  out += '</video>';

		  return out;
		}

		renderer.image = function(href, title, text, props) {
			var res, ext = getExt(href);
			ext = ext.substr(1, ext.length);

			switch(ext) {
				case 'mp3':
				case 'ogg':
					res = audio(href, ext, title, text, props);
				break;
				case 'mp4':
				case 'webm':
				case 'ogv':
					res = video(href, ext, title, text, props);
				break;
				default:
					res = image(href, title, text, props);
				break;
			}

			return res;
		};

		renderer.finish = function() {
			anchorList = {};
		}

		return renderer;
});