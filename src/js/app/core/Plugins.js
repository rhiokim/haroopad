define([
		'core/plugins/Youtube',
		'core/plugins/Vimeo',
		'core/plugins/Twitter',
		'core/plugins/Flickr',
		'core/plugins/SlideShare',
		'core/plugins/SpeakerDeck',
		'core/plugins/Gist',
		'core/plugins/SoundCloud',
		'core/plugins/JSFiddle',
		'core/plugins/JSBin',
		'core/plugins/CodePen',
		'core/plugins/Map.Google'
	], function(Youtube, Vimeo, Twitter, Flickr, SlideShare, SpeakerDeck, Gist, SoundCloud, JSFiddle, JSBin, CodePen, Gmap) {

	return {
		youtube: Youtube,
		vimeo: Vimeo,
		tweet: Twitter,
		flickr: Flickr,
		twitter: Twitter,
		slideshare: SlideShare,
		speakerdeck: SpeakerDeck,
		gist: Gist,
		soundcloud: SoundCloud,
		jsfiddle: JSFiddle,
		jsbin: JSBin,
		codepen: CodePen,
		gmap: Gmap 
	};
});