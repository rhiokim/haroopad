define([], function() {
	var options = {
		link_list:  false,    // render links as references, create link list as appendix
		h1_setext:  false,     // underline h1 headers
		h2_setext:  false,     // underline h2 headers
		h_atx_suf:  false,    // header suffixes (###)
		gfm_code:   true,     // gfm code blocks (```)
		li_bullet:  "*",      // list item bullet style
		hr_char:    "-",      // hr style
		indnt_str:  "    ",   // indentation string
		bold_char:  "*",      // char used for strong
		emph_char:  "_",      // char used for em
		gfm_del:    true,     // ~~strikeout~~ for <del>strikeout</del>
		gfm_tbls:   true,     // markdown-extra tables
		tbl_edges:  false,    // show side edges on tables
		hash_lnks:  false,    // anchors w/hash hrefs as links
		br_only:    false,    // avoid using "  " as line break indicator
		col_pre:    "col ",   // column prefix to use when creating missing headers for tables
    nbsp_spc:   false,    // convert &nbsp; entities in html to regular spaces
    span_tags:  true,     // output spans (ambiguous) using html tags
    div_tags:   true,     // output divs (ambiguous) using html tags
    unsup_tags: {
      ignore: "script style noscript",
    },
    tag_remap: {
    	"i": "em",
      "b": "strong"
    }
	};
	
	var reMarker = new reMarked(options);

	return function(html) {
		var res, dummies, body = document.createElement('body');
		body.innerHTML = html;
		body.firstElementChild.remove();
		
		dummies = body.querySelectorAll('span.Apple-converted-space');
		dummies = Array.prototype.slice.call(dummies, 0);
		_.each(dummies, function(dummy) {
      dummy.parentElement.insertBefore(document.createTextNode(' '), dummy.nextSibling);
			dummy.remove();
		});

		res = reMarker.render(body);

		body = null;
		return res;
	};
});