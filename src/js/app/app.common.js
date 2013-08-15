var _glo = {
	getEmailAdvertisementHTML: function() {
		return ''
			// + '<hr>'
			+ '<p style="display: block; width: 99.6%; line-height:1.6em; /*text-align: center; */padding: 5px 0; font-size:1em; border: 1px solid #e5e5e5;/* background-color:rgb(253,246,227);*/ border-radius: 3px;">'
			+ '	<span>'
			+ '   <img src="http://pad.haroopress.com/assets/images/logo-small.png" align="absmiddle" width="40" height="40" style="float:left; margin:0 10px;"/>'
			+ '   Sent from My <strong><a href="http://pad.haroopress.com/" target="_blank">Haroopad</a></strong> <br/>'
			+ '   The Next Document processor based on Markdown '
 			+ '	- <a href="http://pad.haroopress.com/user.html#download" target="_blank">Download</a>'
			+ ' </span>'
			+ '</p>';
	},

	getEmailAdvertisementMD: function() {
		return ''
			+ '\n* * * * * * * *  \n'
			+ '\t> Sent from My **[Haroopad](http://pad.haroopress.com)**  \n'
			+ '\t> The Next Document processor based on Markdown  \n'
			+ '\t> [Download Haroopad](http://pad.haroopress.com/user.html#download)  \n';
	}
}