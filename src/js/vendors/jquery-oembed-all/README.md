Jquery-Oembed-All
=================

This is a fork (with a lot of changes) of the jquery-oembed located at http://code.google.com/p/jquery-oembed/.

Instead of using oohembed or other such services it tries to embed the object natively without having to use some kind of local server.
This project will happily use native oembed services when it can, however it also use other types of embedding whenever oembed is not possible.

Using the Open Graph protocol (http://ogp.me/) over Yahoo's YQL (http://developer.yahoo.com/yql/), as a fallback, will display some kind of information for a lot of pages.
Sites like TED, Ifixit, Ars Technica, twitpic can use this service. However some sites like bandcamp stop YQL from working because of their robots.txt file.
Over time I'll be removing the some providers that have been hardcoded and using OGP instead to provide a standard embed layout and reduce the file size.

This project tries to use embedding techniques in the following order of preference:

* oEmbed - JSONP available - e.g.  flickr, meetup etc
* embedding (IFRAME/Object) based on URL information - e.g.  youtube
* oEmbed - JSONP not Available - use YQL to correct - e.g. Ustream, viddler
* OGP over YQL - used as a fall back.
* YQL Screenscape to get embedding details
* YQL Screenscrape - e.g. pastie
* JSONP Api lookups Source - With HTML and CSS built in this project - e.g. github, Myspace, Facebook

Quick Start
-----------
Add this to your javascript file.
````
$(function(){
   $("a.embed").oembed();
});
````

Add `class="embed"` to anchor tag which contains the URL you wish to embed.  
Ex: `<a href="http://www.youtube.com/watch?v=8mwKq7_JlS8" class="embed"></a>`

Shortened Urls
------------
This project now handles shortened url's using the JSONP service from http://longurl.org. e.g. http://bit.ly/oP77mm will first lengthen the URL 
to http://tinychat.com/omginternetparty and then embed as normal. This is experimental - so let me know of problems!




to use...
````
<a href="https://github.com/starfishmod/jquery-oembed-all" class="oembed">https://github.com/starfishmod/jquery-oembed-all</a>
````

1. url 
2. options

````
$(".oembed").oembed(null,{
    embedMethod: 'auto',	// "auto", "append", "fill"	
    apikeys: {
      amazon : '<your amazon key>',
    }
});
````


Current 3rd party sources include:
---------------------------------
####Video

* Youtube - oembed - YQL
  http://www.youtube.com/watch?v=oHg5SJYRHA0
* Sapo - oembed YQL
  http://videos.sapo.pt/vz0UeKVkl92vQ2bDhIYl
* Blip - oEmbed
  http://blip.tv/linuxconfau/lightning-talks-incl-html5-media-accessibility-update-4870511
* Hulu - oEmbed
  http://www.hulu.com/watch/337246/e-news-now-steven-tyler-picks-next-idol-winner
* Vimeo - oEmbed
  http://vimeo.com/36549221
* National film board of Canada - oEmbed
  http://www.nfb.ca/film/turning_tides/
* Qik - oEmbed
  http://qik.com/video/1331325
* Dotsub - oEmbed
  http://dotsub.com/view/6a7db231-4d64-407d-8026-a845eaf6c4a9
* Clikthrough - oEmbed
  http://www.clikthrough.com/theater/video/7
* Kino Map - oEmbed
  http://www.kinomap.com/#!kms-f2xsjx
* Funny Or Die - Embedded
  http://www.funnyordie.com/videos/0d46e70a1a/yo-no-se-performed-by-will-ferrell?playlist=featured_videos
* College Humour - Embedded
  http://www.collegehumor.com/video/6736895/the-fresh-prince-of-downton-abbey
* Metacafe - Embedded
  http://www.metacafe.com/watch/8202430/airmail_trailer/
* embedr - Embedded
  http://embedr.com/playlist/my-video-playlist_25683
* 5min - oEmbed is XML only - using YQL to translate it
  http://www.5min.com/Video/iPad-to-Embrace-New-Name-517297508
* ustream.tv - oEmbed is not JSONP enabled - using YQL to translate it
  http://www.ustream.tv/recorded/20144582
* viddler - OGP
  http://www.viddler.com/v/4a7e233c 
* twitvid - Embedded
* bambuser - Embedded
* xtranormal - Embedded
* Gametrailers - Embedded
* Vzarr - Embedded
* VHX - oembed
* bambuser - oembed
* dailymotion.com - oembed
* animoto - oembed
* justin.tv - YQL JSON
* livestream - OGP
  http://www.livestream.com/globalrevolution
* scivee - embedded
* veoh - embedded
  http://www.veoh.com/watch/v21193116NBT83Enw?h1=Lady+GaGa+and+Kanye+West+Invest+in+Turntable.FM!+-+Diggnation
* minoto-video - oembed using YQL
  http://embed.minoto-video.com/90/ZfMaq5kow9ki
* TrailerAddict - OGP
  http://www.traileraddict.com/trailer/abraham-lincoln-vampire-hunter/trailer-b
* vodpod - oembed YQL - broken as the oembed has absolute positioning which breaks the display
  http://vodpod.com/watch/16225320-blind-erhu-street-performer-in-hong-kong?u=brianjonestownmassacre&c=brianjonestownmassac
* fora.tv -OGP YQL
  http://fora.tv/2011/09/21/GENERATOR_Turntablefm_Discussion__Demonstration
* TED - OGP YQL
  http://www.ted.com/talks/scott_summit_beautiful_artificial_limbs.html
* Aniboom - embedded
  http://www.aniboom.com/animation-video/187178/The-Flower/
* Comedy Central - OGP
  http://www.comedycentral.com/video-clips/qdybr3/cc-studios-tiny-hands-tiny-hands--glove-shopping
* snotr - embedded
  http://www.snotr.com/video/9125/Fun_at_work
* zapiks - OGP
  http://www.zapiks.com/teva-slopestyle-2012.html
* youku - embedded
  http://v.youku.com/v_show/id_XMzgxNzY3NTU2.html
* wistia - Oembed
  http://home.wistia.com/m/NI3bSQ

  
  
####Audio 

* Soundcloud - oEmbed
* HuffDuffer - oEmbed
* BandCamp - YQL and Embedded
  http://clearsoulforces.bandcamp.com/album/detroit-revolution-s - Seems to be broken
* podomatic - OGP
  http://wahwah.podomatic.com/
* rdio.com - oEmbed
* hark.com - OGP
  http://www.hark.com/clips/bgqbwlkvwb-your-king-is-a-vile-bag-of-filth
* chirb.it - YQL and oembed
* official.fm - YQL and oembed
* mixcloud - YQL and oembed
* shoudio - oembed
* audioboo.fm - OGP 
  http://audioboo.fm/boos/710079-geofencing-and-the-future
* Spotify - Oembed
  http://open.spotify.com/album/1YwzJz7CrV9fd9Qeb6oo1d
 

#### Photo

* flickr - oEmbed
* photobucket - oEmbed
* instagram - oEmbed
* yfrog - oEmbed
* 23HQ - oEmbed
* Smugmug - oEmbed
* twitpic - OGP YQL
  http://twitpic.com/8wpcby
* 500px.com - OGP
  http://500px.com/photo/5926615
* visual.ly - YQL Lookup
* img.ly - Thumbnail view
  http://img.ly/fwVM
* imgur.com - Thumbnail view
  http://imgur.com/gallery/t4i8O
* twitgoo.com - Thumbnail view
  http://twitgoo.com/5met93
* gravatar - Thumbnail view when using mailto:email@address.com
* pintrest - YQL - Embedded view of a sort.
  http://pinterest.com/pin/147422587771702052/
* circuitlab - image view
  https://www.circuitlab.com/circuit/z242cn/555-timer-as-pulse-width-modulation-pwm-generator/
* skitch - YQL oembed
  http://skitch.com/sethferreira/nmbr8/the-kings-new-toy
* graphic.ly  - OGP
  http://graphicly.com/eldritch/eldritch/2  
* dribble - jsonp lookup
  http://dribbble.com/shots/464661-Rebounding-Station-Shot
* Lockerz - YQL lookup
  http://lockerz.com/d/5504214
* AsciiArtFarts - YQL Lookup
  http://www.asciiartfarts.com/20111016.html
* lego cusoo - OGP over YQL
  http://lego.cuusoo.com/ideas/view/96
* plannary - OGP over YQL
  http://svihackathon3.plannary.com/
* propic - OGP
  http://propic.com/254
* avairy.com - OGP
  http://advanced.aviary.com/artists/jas7229/creations/glowing_orb
* lomography - ogp
  http://www.lomography.com/photos/cameras/3334141-lomo-lc-wide/popular/14660387
* weheartit - ogp 
  http://weheartit.com/entry/26832936
* glogster - ogp
  http://www.glogster.com/lacocom/glog/g-6m025lt047et8od1f3iona0
* chart.ly - embedded
  http://chart.ly/v3eemh9
* twitrpix - OGP
  http://twitrpix.com/l39c
* chictopia - OGP
  http://www.chictopia.com/photo/show/641423-homeless-black-leather-vintage-shorts-beige-forever-21-jacket

####Rich

* Meetup - oEmbed
* gigapans - Embedded
* Slideshare - oEmbed
* ebay - Embedded
* scribd - Embedded
* screenr - Embedded
* tumblr- JSONP lookup
* imdb - JSONP lookup via imdbapi.com
* wikipedia- JSONP lookup
* github- JSONP lookup (CSS) 
  https://github.com/starfishmod/jquery-oembed-all
* eventful - OGP
  http://eventful.com/brisbane/venues/rna-showgrounds-/V0-001-000481663-9
  http://eventful.com/brisbane/events/supafest-2012-/E0-001-042915503-4
* myspace - OGP
  http://www.myspace.com/historionyx
* live Journal - JSONP Lookup (CSS)
* wordpress - oEmbed (wordpress.com, wp.me, blogs.cnn.com, techcrunch.com). I can add other wordpress sites as well.
* circuitbee -Embedded
* stack overflow - JSONP Lookup (CSS)
* Facebook - JSONP Lookup (CSS)
* Pastebin - Embedded
* Pastie - YQL lookup
* kickstarter - Embedded
* issuu - OGP
  http://issuu.com/2bemag/docs/issue__20
* reelapp.com - Embedded
* Etsy - OGP over YQL
  http://www.etsy.com/listing/88613710/1950s-mid-century-modern-chair?ref=fp_treasury_1
* Amazon - Embedded - Requires Affiliate code
  http://www.amazon.com/gp/product/B000026ZFW/ref=s9_simh_gw_p15_d22_g15_i6?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=center-3&pf_rd_r=0XY8PM8ER1K0W1SPFJEF&pf_rd_t=101&pf_rd_p=470938811&pf_rd_i=507846
* linkedin - Embedded IFRAME - found a link that works :)
  http://www.linkedin.com/pub/andrew-mee/32/a06/546
* Lanyrd - YQL (CSS)
  http://lanyrd.com/2012/agile/
* twitter - Oembed - status only - but that is ok I think
  https://twitter.com/#!/starfish_mod/status/176794900875051009
* github gist - oembed
  https://gist.github.com/1321768
* speakerdeck - yql oembed
* dipity - yql oembed
* dailymile - oembed
* deviantart - oembed
* Roomshare Japan - oembed
  http://roomshare.jp/post/122511
* mobypictures - oembed
* prezi - embedded
  http://prezi.com/row6dzyapfic/jr-inside-out-project/
* popplet - embedded
  http://popplet.com/app/#/489
* authorstream - OGP
  http://www.authorstream.com/Presentation/avalok-1367833-ever-imagine-this/
* googlecalendar - Iframe
* cacoo - oembed
* pearltrees - embedded
  http://www.pearltrees.com/#/N-f=1_4339252&N-s=1_4339252&N-p=36189761&N-u=1_359252&N-fa=3269727
* urtak - oembed - is broken in iframe return atm -seems to be an embed.ly issue??
  https://urtak.com/u/6588
* jotform - embedded
  http://form.jotform.co/form/20740907897868
* Urban Dictionary - YQL lookup
  http://www.urbandictionary.com/define.php?term=qwerty%20nosedive&defid=6423917
* Ars Technica - YQL Lookup
  http://arstechnica.com/tech-policy/news/2012/03/op-ed-imminent-six-strikes-copyright-alert-system-needs-antitrust-scrutiny.ars
* Eventbrite - OGP YQL
  http://ynbrismarchconway-ehometext.eventbrite.com/
* last.fm OGP YQL
  http://www.last.fm/music/Doubting+Thomas
* Rotten Tomatoes - OGP YQL
  http://www.rottentomatoes.com/m/john_carter/
* iFixit - OGP
  http://www.ifixit.com/Guide/Installing-MacBook-Core-2-Duo-AirPort-Card/519/1
* qwiki - OGP
  http://www.qwiki.com/q/Damascus
* brighttalk - Meta info
  http://www.brighttalk.com/webcast/499/42317
* tinychat - OGP
  http://tinychat.com/omginternetparty
* tourwrist - embedded
  http://tourwrist.com/tours/27406
* bnter - OGP  
  https://banters.com/p/55840
* bigthink - OGP
  http://bigthink.com/series/43542
* wirewax - OGP
  http://www.wirewax.com/5001608
* whosay - OGP
  http://www.whosay.com/EvaLongoria/photos/159328
* timetoast - embedded
  http://www.timetoast.com/timelines/225819
* tripline - OGP
  http://tripline.net/trip/Experience_Art_in_Barcelona__buycatalunya-0523526613621005B2BAA989B5068FDD
* jsfiddle - embedded
  http://jsfiddle.net/x3NaN/
* gmep - oembed
  https://gmep.org/media/11041
* sketchfab - oembed YQL
  https://sketchfab.com/show/9lVs96AuFUAjKjwvsMG0Uf7Yy7b
  
---

####TODO:

* delicious
* digg?
* picasa
* http://www.scoreexchange.com/scores/78287.html
* http://pdfobject.com/generator.php
* http://www.surveygizmo.com/
* http://www.4shared.com/
* http://cubbi.es/oembed ?Not sure how this one works
* Apple trailers - http://trailers.apple.com/trailers/wb/wrathofthetitans/
* XKCD
* TwitLonger
* http://robohash.org/
* http://infogr.am/british-council/burma/


Plus a lot more :) Feel free to submit
