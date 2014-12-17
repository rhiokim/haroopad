/**
* Copyright (c) 2013, Leon Sorokin
* All rights reserved. (MIT Licensed)
*
* reMarked.js - HTML > markdown
*/

reMarked = function(opts) {

	var links = [];
	var cfg = {
		link_list:	false,			// render links as references, create link list as appendix
	//  link_near:					// cite links immediately after blocks
		h1_setext:	true,			// underline h1 headers
		h2_setext:	true,			// underline h2 headers
		h_atx_suf:	false,			// header suffixes (###)
	//	h_compact:	true,			// compact headers (except h1)
		gfm_code:	["```","~~~"][0],	// gfm code blocks
		trim_code:	true,			// trim whitespace within <pre><code> blocks (full block, not per line)
		li_bullet:	"*-+"[0],		// list item bullet style
	//	list_indnt:					// indent top-level lists
		hr_char:	"-_*"[0],		// hr style
		indnt_str:	["    ","\t","  "][0],	// indentation string
		bold_char:	"*_"[0],		// char used for strong
		emph_char:	"*_"[1],		// char used for em
		gfm_del:	true,			// ~~strikeout~~ for <del>strikeout</del>
		gfm_tbls:	true,			// markdown-extra tables
		tbl_edges:	false,			// show side edges on tables
		hash_lnks:	false,			// anchors w/hash hrefs as links
		br_only:	false,			// avoid using "  " as line break indicator
		col_pre:	"col ",			// column prefix to use when creating missing headers for tables
		nbsp_spc:	false,			// convert &nbsp; entities in html to regular spaces
		span_tags:	true,			// output spans (ambiguous) using html tags
		div_tags:	true,			// output divs (ambiguous) using html tags
	//	comp_style: false,			// use getComputedStyle instead of hardcoded tag list to discern block/inline
		unsup_tags: {				// handling of unsupported tags, defined in terms of desired output style. if not listed, output = outerHTML
			// no output
			ignore: "script style noscript",
			// eg: "<tag>some content</tag>"
			inline: "span sup sub i u b center big",
			// eg: "\n<tag>\n\tsome content\n</tag>"
		//	block1: "",
			// eg: "\n\n<tag>\n\tsome content\n</tag>"
			block2: "div form fieldset dl header footer address article aside figure hgroup section",
			// eg: "\n<tag>some content</tag>"
			block1c: "dt dd caption legend figcaption output",
			// eg: "\n\n<tag>some content</tag>"
			block2c: "canvas audio video iframe"
		},
		tag_remap: {				// remap of variants or deprecated tags to internal classes
			"i": "em",
			"b": "strong"
		}
	};

	// detect and tweak some stuff for IE 7 & 8
	// http://www.pinlady.net/PluginDetect/IE/
	var isIE = eval("/*@cc_on!@*/!1"),
		docMode = document.documentMode,
		ieLt9 = isIE && (!docMode || docMode < 9),
		textContProp = "textContent" in Element.prototype || !ieLt9 ? "textContent" : "innerText";

	extend(cfg, opts);

	function extend(a, b) {
		if (!b) return a;
		for (var i in a) {
			if (typeOf(b[i]) == "Object")
				extend(a[i], b[i]);
			else if (typeof b[i] !== "undefined")
				a[i] = b[i];
		}
	}

	function typeOf(val) {
		return Object.prototype.toString.call(val).slice(8,-1);
	}

	function rep(str, num) {
		var s = "";
		while (num-- > 0)
			s += str;
		return s;
	}

	function trim12(str) {
		var	str = str.replace(/^\s\s*/, ''),
			ws = /\s/,
			i = str.length;
		while (ws.test(str.charAt(--i)));
		return str.slice(0, i + 1);
	}

	function lpad(targ, padStr, len) {
		return rep(padStr, len - targ.length) + targ;
	}

	function rpad(targ, padStr, len) {
		return targ + rep(padStr, len - targ.length);
	}

	function otag(tag, e) {
		if (!tag) return "";

		var buf = "<" + tag;

		for (var attr, i = 0; i < e.attributes.length; i++) {
			attr = e.attributes.item(i);
			buf += " " + attr.nodeName + '="' + attr.nodeValue + '"';
		}

		return buf + ">";
	}

	function ctag(tag) {
		if (!tag) return "";
		return "</" + tag + ">";
	}

	function pfxLines(txt, pfx)	{
		return txt.replace(/^/gm, pfx);
	}

	function nodeName(e) {
		return (e.nodeName == "#text" ? "txt" : e.nodeName).toLowerCase();
	}

	function wrap(str, opts) {
		var pre, suf;

		if (opts instanceof Array) {
			pre = opts[0];
			suf = opts[1];
		}
		else
			pre = suf = opts;

		pre = pre instanceof Function ? pre.call(this, str) : pre;
		suf = suf instanceof Function ? suf.call(this, str) : suf;

		return pre + str + suf;
	}

	// http://stackoverflow.com/a/3819589/973988
	function outerHTML(node) {
		// if IE, Chrome take the internal method otherwise build one
		return node.outerHTML || (
		  function(n){
			  var div = document.createElement('div'), h;
			  div.appendChild( n.cloneNode(true) );
			  h = div.innerHTML;
			  div = null;
			  return h;
		  })(node);
	}

	this.render = function(ctr) {
		links = [];

		var holder = document.createElement("div");

		holder.innerHTML = typeof ctr == "string" ? ctr : outerHTML(ctr);

		var s = new lib.tag(holder, null, 0);
		var re = s.rend().replace(/^[\t ]+[\n\r]+/gm, "\n").replace(/^[\n\r]+|[\n\r]+$/g, "");
		if (cfg.link_list && links.length > 0) {
			// hack
			re += "\n\n";
			var maxlen = 0;
			// get longest link href with title, TODO: use getAttribute?
			for (var y = 0; y < links.length; y++) {
				if (!links[y].e.title) continue;
				var len = links[y].e.href.length;
				if (len && len > maxlen)
					maxlen = len;
			}

			for (var k = 0; k < links.length; k++) {
				var title = links[k].e.title ? rep(" ", (maxlen + 2) - links[k].e.href.length) + '"' + links[k].e.title + '"' : "";
				re += "  [" + (+k+1) + "]: " + (nodeName(links[k].e) == "a" ? links[k].e.href : links[k].e.src) + title + "\n";
			}
		}

		return re.replace(/^[\t ]+\n/gm, "\n");
	};

	var lib = {};

	lib.tag = klass({
		wrap: "",
		lnPfx: "",		// only block
		lnInd: 0,		// only block
		init: function(e, p, i)
		{
			this.e = e;
			this.p = p;
			this.i = i;
			this.c = [];
			this.tag = nodeName(e);

			this.initK();
		},

		initK: function()
		{
			var i;
			if (this.e.hasChildNodes()) {
				// inline elems allowing adjacent whitespace text nodes to be rendered
				var inlRe = cfg.unsup_tags.inline, n, name;

				// if no thead exists, detect header rows or make fake cols
				if (nodeName(this.e) == "table") {
					if (this.e.hasChildNodes() && !this.e.tHead) {
						var thead = document.createElement("thead");

						var tbody0 = this.e.tBodies[0],
							row0 = tbody0.rows[0],
							cell0 = row0.cells[0];

						if (nodeName(cell0) == "th")
							thead.appendChild(row0);
						else {
							var hcell,
								i = 0,
								len = row0.cells.length,
								hrow = thead.insertRow();

							while (i++ < len) {
								hcell = document.createElement("th");
								hcell[textContProp] = cfg.col_pre + i;
								hrow.appendChild(hcell);
							}
						}

						this.e.insertBefore(thead, tbody0);
					}
				}

				for (i in this.e.childNodes) {
					if (!/\d+/.test(i)) continue;

					n = this.e.childNodes[i];
					name = nodeName(n);

					// remap of variants
					if (name in cfg.tag_remap)
						name = cfg.tag_remap[name];

					// ignored tags
					if (cfg.unsup_tags.ignore.test(name))
						continue;

					// empty whitespace handling
					if (name == "txt" && !nodeName(this.e).match(inlRe) && /^\s+$/.test(n[textContProp])) {
						// ignore if first or last child (trim)
						if (i == 0 || i == this.e.childNodes.length - 1)
							continue;

						// only ouput when has an adjacent inline elem
						var prev = this.e.childNodes[i-1],
							next = this.e.childNodes[i+1];
						if (prev && !nodeName(prev).match(inlRe) || next && !nodeName(next).match(inlRe))
							continue;
					}

					var wrap = null;

					if (!lib[name]) {
						var unsup = cfg.unsup_tags;

						if (unsup.inline.test(name)) {
							if (name == "span" && !cfg.span_tags)
								name = "inl";
							else
								name = "tinl";
						}
						else if (unsup.block2.test(name)) {
							if (name == "div" && !cfg.div_tags)
								name = "blk";
							else
								name = "tblk";
						}
						else if (unsup.block1c.test(name))
							name = "ctblk";
						else if (unsup.block2c.test(name)) {
							name = "ctblk";
							wrap = ["\n\n", ""];
						}
						else
							name = "rawhtml";
					}

					var node = new lib[name](n, this, this.c.length);

					if (wrap)
						node.wrap = wrap;

					if (node instanceof lib.a && n.href || node instanceof lib.img) {
						node.lnkid = links.length;
						links.push(node);
					}

					this.c.push(node);
				}
			}
		},

		rend: function()
		{
			return this.rendK().replace(/\n{3,}/gm, "\n\n");		// can screw up pre and code :(
		},

		rendK: function()
		{
			var n, buf = "";
			for (var i = 0; i < this.c.length; i++) {
				n = this.c[i];
				buf += (n.bef || "") + n.rend() + (n.aft || "");
			}
			return buf.replace(/^\n+|\n+$/, "");
		}
	});

	lib.blk = lib.tag.extend({
		wrap: ["\n\n", ""],
		wrapK: null,
		tagr: false,
		lnInd: null,
		init: function(e, p ,i) {
			this.supr(e,p,i);

			// kids indented
			if (this.lnInd === null) {
				if (this.p && this.tagr && this.c[0] instanceof lib.blk)
					this.lnInd = 4;
				else
					this.lnInd = 0;
			}

			// kids wrapped?
			if (this.wrapK === null) {
				if (this.tagr && this.c[0] instanceof lib.blk)
					this.wrapK = "\n";
				else
					this.wrapK = "";
			}
		},

		rend: function()
		{
			return wrap.call(this, (this.tagr ? otag(this.tag, this.e) : "") + wrap.call(this, pfxLines(pfxLines(this.rendK(), this.lnPfx), rep(" ", this.lnInd)), this.wrapK) + (this.tagr ? ctag(this.tag) : ""), this.wrap);
		},

		rendK: function()
		{
			var kids = this.supr();
			// remove min uniform leading spaces from block children. marked.js's list outdent algo sometimes leaves these
			if (this.p instanceof lib.li) {
				var repl = null, spcs = kids.match(/^[\t ]+/gm);
				if (!spcs) return kids;
				for (var i = 0; i < spcs.length; i++) {
					if (repl === null || spcs[i][0].length < repl.length)
						repl = spcs[i][0];
				}
				return kids.replace(new RegExp("^" + repl), "");
			}
			return kids;
		}
	});

	lib.tblk = lib.blk.extend({tagr: true});

	lib.cblk = lib.blk.extend({wrap: ["\n", ""]});

		lib.ctblk = lib.cblk.extend({tagr: true});

	lib.inl = lib.tag.extend({
		rend: function()
		{
			var kids = this.rendK(),
				parts = kids.match(/^((?: |\t|&nbsp;)*)(.*?)((?: |\t|&nbsp;)*)$/) || [kids, "", kids, ""];

			return parts[1] + wrap.call(this, parts[2], this.wrap) + parts[3];
		}
	});

		lib.tinl = lib.inl.extend({
			tagr: true,
			rend: function()
			{
				return otag(this.tag, this.e) + wrap.call(this, this.rendK(), this.wrap) + ctag(this.tag);
			}
		});

		lib.p = lib.blk.extend({
			rendK: function() {
				return this.supr().replace(/^\s+/gm, "");
			}
		});

		lib.list = lib.blk.extend({
			wrap: [function(){return this.p instanceof lib.li ? "\n" : "\n\n";}, ""]
		});

		lib.ul = lib.list.extend({});

		lib.ol = lib.list.extend({});

		lib.li = lib.cblk.extend({
			wrap: ["\n", function(kids) {
				return (this.c[0] && this.c[0] instanceof(lib.p)) || kids.match(/\n{2}/gm) ? "\n" : "";			// || this.kids.match(\n)
			}],
			wrapK: [function() {
				return this.p.tag == "ul" ? cfg.li_bullet + " " : (this.i + 1) + ".  ";
			}, ""],
			rendK: function() {
				return this.supr().replace(/\n([^\n])/gm, "\n" + cfg.indnt_str + "$1");
			}
		});

		lib.hr = lib.blk.extend({
			wrap: ["\n\n", rep(cfg.hr_char, 3)]
		});

		lib.h = lib.blk.extend({});

		lib.h_setext = lib.h.extend({});

			cfg.h1_setext && (lib.h1 = lib.h_setext.extend({
				wrapK: ["", function(kids) {
					return "\n" + rep("=", kids.length);
				}]
			}));

			cfg.h2_setext && (lib.h2 = lib.h_setext.extend({
				wrapK: ["", function(kids) {
					return "\n" + rep("-", kids.length);
				}]
			}));

		lib.h_atx = lib.h.extend({
			wrapK: [
				function(kids) {
					return rep("#", this.tag[1]) + " ";
				},
				function(kids) {
					return cfg.h_atx_suf ? " " + rep("#", this.tag[1]) : "";
				}
			]
		});
			!cfg.h1_setext && (lib.h1 = lib.h_atx.extend({}));

			!cfg.h2_setext && (lib.h2 = lib.h_atx.extend({}));

			lib.h3 = lib.h_atx.extend({});

			lib.h4 = lib.h_atx.extend({});

			lib.h5 = lib.h_atx.extend({});

			lib.h6 = lib.h_atx.extend({});

		lib.a = lib.inl.extend({
			lnkid: null,
			rend: function() {
				var kids = this.rendK(),
					href = this.e.getAttribute("href"),
					title = this.e.title ? ' "' + this.e.title + '"' : "";

				if (!this.e.hasAttribute("href") || href == kids || href[0] == "#" && !cfg.hash_lnks)
					return kids;

				if (cfg.link_list)
					return "[" + kids + "] [" + (this.lnkid + 1) + "]";

				return "[" + kids + "](" + href + title + ")";
			}
		});

		// almost identical to links, maybe merge
		lib.img = lib.inl.extend({
			lnkid: null,
			rend: function() {
				var kids = this.e.alt,
					src = this.e.getAttribute("src");

				if (cfg.link_list)
					return "![" + kids + "] [" + (this.lnkid + 1) + "]";

				var title = this.e.title ? ' "'+ this.e.title + '"' : "";

				return "![" + kids + "](" + src + title + ")";
			}
		});


		lib.em = lib.inl.extend({wrap: cfg.emph_char});

		lib.del = cfg.gfm_del ? lib.inl.extend({wrap: "~~"}) : lib.tinl.extend();

		lib.br = lib.inl.extend({
			wrap: ["", function() {
				var end = cfg.br_only ? "<br>" : "  ";
				// br in headers output as html
				return this.p instanceof lib.h ? "<br>" : end + "\n";
			}]
		});

		lib.strong = lib.inl.extend({wrap: rep(cfg.bold_char, 2)});

		lib.blockquote = lib.blk.extend({
			lnPfx: "> ",
			rend: function() {
				return this.supr().replace(/>[ \t]$/gm, ">");
			}
		});

		// can render with or without tags
		lib.pre = lib.blk.extend({
			tagr: true,
			wrapK: "\n",
			lnInd: 0
		});

		// can morph into inline based on context
		lib.code = lib.blk.extend({
			tagr: false,
			wrap: "",
			wrapK: function(kids) {
				return kids.indexOf("`") !== -1 ? "``" : "`";	// esc double backticks
			},
			lnInd: 0,
			init: function(e, p, i) {
				this.supr(e, p, i);

				if (this.p instanceof lib.pre) {
					this.p.tagr = false;

					if (cfg.gfm_code) {
						var cls = this.e.getAttribute("class");
						cls = (cls || "").split(" ")[0];

						if (cls.indexOf("lang-") === 0)			// marked uses "lang-" prefix now
							cls = cls.substr(5);

						this.wrapK = [cfg.gfm_code + cls + "\n", "\n" + cfg.gfm_code];
					}
					else {
						this.wrapK = "";
						this.p.lnInd = 4;
					}
				}
			},
			rendK: function() {
				if (this.p instanceof lib.pre) {
					var kids = this.e[textContProp];
					return cfg.trim_code ? kids.trim() : kids;
				}

				return this.supr();
			}
		});

		lib.table = cfg.gfm_tbls ? lib.blk.extend({
			cols: [],
			init: function(e, p, i) {
				this.supr(e, p, i);
				this.cols = [];
			},
			rend: function() {
				// run prep on all cells to get max col widths
				for (var tsec = 0; tsec < this.c.length; tsec++)
					for (var row = 0; row < this.c[tsec].c.length; row++)
						for (var cell = 0; cell < this.c[tsec].c[row].c.length; cell++)
							this.c[tsec].c[row].c[cell].prep();

				return this.supr();
			}
		}) : lib.tblk.extend();

		lib.thead = cfg.gfm_tbls ? lib.cblk.extend({
			wrap: ["\n", function(kids) {
				var buf = "";
				for (var i = 0; i < this.p.cols.length; i++) {
					var col = this.p.cols[i],
						al = col.a[0] == "c" ? ":" : " ",
						ar = col.a[0] == "r" || col.a[0] == "c" ? ":" : " ";

					buf += (i == 0 && cfg.tbl_edges ? "|" : "") + al + rep("-", col.w) + ar + (i < this.p.cols.length-1 || cfg.tbl_edges ? "|" : "");
				}
				return "\n" + trim12(buf);
			}]
		}) : lib.ctblk.extend();

		lib.tbody = cfg.gfm_tbls ? lib.cblk.extend() : lib.ctblk.extend();

		lib.tfoot = cfg.gfm_tbls ? lib.cblk.extend() : lib.ctblk.extend();

		lib.tr = cfg.gfm_tbls ? lib.cblk.extend({
			wrapK: [cfg.tbl_edges ? "| " : "", cfg.tbl_edges ? " |" : ""]
		}) : lib.ctblk.extend();

		lib.th = cfg.gfm_tbls ? lib.inl.extend({
			guts: null,
			// TODO: DRY?
			wrap: [function() {
				var col = this.p.p.p.cols[this.i],
					spc = this.i == 0 ? "" : " ",
					pad, fill = col.w - this.guts.length;

				switch (col.a[0]) {
					case "r": pad = rep(" ", fill); break;
					case "c": pad = rep(" ", Math.floor(fill/2)); break;
					default:  pad = "";
				}

				return spc + pad;
			}, function() {
				var col = this.p.p.p.cols[this.i],
					edg = this.i == this.p.c.length - 1 ? "" : " |",
					pad, fill = col.w - this.guts.length;

				switch (col.a[0]) {
					case "r": pad = ""; break;
					case "c": pad = rep(" ", Math.ceil(fill/2)); break;
					default:  pad = rep(" ", fill);
				}

				return pad + edg;
			}],
			prep: function() {
				this.guts = this.rendK();					// pre-render
				this.rendK = function() {return this.guts};

				var cols = this.p.p.p.cols;
				if (!cols[this.i])
					cols[this.i] = {w: null, a: ""};		// width and alignment
				var col = cols[this.i];
				col.w = Math.max(col.w || 0, this.guts.length);

				var align = this.e.align || this.e.style.textAlign;
				if (align)
					col.a = align;
			}
		}) : lib.ctblk.extend();

			lib.td = lib.th.extend();

		lib.txt = lib.inl.extend({
			initK: function()
			{
				this.c = this.e[textContProp].split(/^/gm);
			},
			rendK: function()
			{
				var kids = this.c.join("").replace(/\r/gm, "");

				// this is strange, cause inside of code, inline should not be processed, but is?
				if (!(this.p instanceof lib.code || this.p instanceof lib.pre)) {
					kids = kids
					.replace(/^\s*([#*])/gm, function(match, $1) {
						return match.replace($1, "\\" + $1);
					});
				}

				if (this.i == 0)
					kids = kids.replace(/^\n+/, "");
				if (this.i == this.p.c.length - 1)
					kids = kids.replace(/\n+$/, "");

				return kids.replace(/\u00a0/gm, cfg.nbsp_spc ? " " : "&nbsp;");
			}
		});

		lib.rawhtml = lib.blk.extend({
			initK: function()
			{
				this.guts = outerHTML(this.e);
			},
			rendK: function()
			{
				return this.guts;
			}
		});

		// compile regexes
		for (var i in cfg.unsup_tags)
			cfg.unsup_tags[i] = new RegExp("^(?:" + (i == "inline" ? "a|em|strong|img|code|del|" : "") + cfg.unsup_tags[i].replace(/\s/g, "|") + ")$");
};

/*!
  * klass: a classical JS OOP façade
  * https://github.com/ded/klass
  * License MIT (c) Dustin Diaz 2014
  */
!function(e,t,n){typeof define=="function"?define(n):typeof module!="undefined"?module.exports=n():t[e]=n()}("klass",this,function(){function i(e){return a.call(s(e)?e:function(){},e,1)}function s(e){return typeof e===t}function o(e,t,n){return function(){var i=this.supr;this.supr=n[r][e];var s={}.fabricatedUndefined,o=s;try{o=t.apply(this,arguments)}finally{this.supr=i}return o}}function u(e,t,i){for(var u in t)t.hasOwnProperty(u)&&(e[u]=s(t[u])&&s(i[r][u])&&n.test(t[u])?o(u,t[u],i):t[u])}function a(e,t){function n(){}function c(){this.init?this.init.apply(this,arguments):(t||a&&i.apply(this,arguments),f.apply(this,arguments))}n[r]=this[r];var i=this,o=new n,a=s(e),f=a?e:this,l=a?{}:e;return c.methods=function(e){return u(o,e,i),c[r]=o,this},c.methods.call(c,l).prototype.constructor=c,c.extend=arguments.callee,c[r].implement=c.statics=function(e,t){return e=typeof e=="string"?function(){var n={};return n[e]=t,n}():e,u(this,e,i),this},c}var e=this,t="function",n=/xyz/.test(function(){xyz})?/\bsupr\b/:/.*/,r="prototype";return i})
