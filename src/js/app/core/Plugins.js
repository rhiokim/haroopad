define([
		'core/plugins/Youtube',
		'core/plugins/Vimeo',
		'core/plugins/Twitter',
		'core/plugins/SpeakerDeck'
	], function(Youtube, Vimeo, Twitter, SpeakerDeck) {

	return {
		youtube: Youtube,
		vimeo: Vimeo,
		tweet: Twitter,
		twitter: Twitter,
		speakerdeck: SpeakerDeck 
	};
});