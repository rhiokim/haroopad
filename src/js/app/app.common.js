var _glo = {
	getEmailAdvertisementHTML: function() {
		return ''
			+ '<hr>'
			+ '<p style="display: block; width: 99.6%; text-align: center; padding: 5px 0; font-size:1em; border: 1px solid #e5e5e5;/* background-color:rgb(253,246,227);*/ border-radius: 3px;">'
			+ '	<span>'
			+ '   <img src="http://pad.haroopress.com/assets/images/logo-small.png" align="absmiddle" width="32" height="32" style="margin-right: 10px;"/>'
			+ '   Tip : The Next Document processor based on Markdown <a href="http://pad.haroopress.com/" target="_blank">Haroopad</a>, '
 			+ '		<a href="http://pad.haroopress.com/user.html#download" target="_blank">Download</a>'
			+ ' </span>'
			+ '</p>';
	},

	getEmailAdvertisementMD: function() {
		return ''
			+ '\n* * * * * * * *  \n'
			+ '\t> **Tip**  \n'
			+ '\t> Haroopad - The Next Document processor based on Markdown  \n'
			+ '\t> [Download Haroopad](http://pad.haroopress.com/user.html#download)  \n';
	}
}