define([
		'core/plugins/Youtube',
		'core/plugins/Vimeo',
		'core/plugins/Twitter',
		'core/plugins/SlideShare',
		'core/plugins/SpeakerDeck',
		'core/plugins/Gist',
		'core/plugins/SoundCloud',
		'core/plugins/JSFiddle',
		'core/plugins/CodePen',
		'core/plugins/Map.Google'
	], function(Youtube, Vimeo, Twitter, SlideShare, SpeakerDeck, Gist, SoundCloud, JSFiddle, CodePen, Gmap) {

	return {
		youtube: Youtube,
		vimeo: Vimeo,
		tweet: Twitter,
		twitter: Twitter,
		slideshare: SlideShare,
		speakerdeck: SpeakerDeck,
		gist: Gist,
		soundcloud: SoundCloud,
		jsfiddle: JSFiddle,
		codepen: CodePen,
		gmap: Gmap 
	};
});