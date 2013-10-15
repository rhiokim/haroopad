define([
		'core/plugins/Youtube',
		'core/plugins/Vimeo',
		'core/plugins/Twitter',
		'core/plugins/SlideShare',
		'core/plugins/SpeakerDeck',
		'core/plugins/Gist',
		'core/plugins/SoundCloud'
	], function(Youtube, Vimeo, Twitter, SlideShare, SpeakerDeck, Gist, SoundCloud) {

	return {
		youtube: Youtube,
		vimeo: Vimeo,
		tweet: Twitter,
		twitter: Twitter,
		slideshare: SlideShare,
		speakerdeck: SpeakerDeck,
		gist: Gist,
		soundcloud: SoundCloud 
	};
});