function parseRIFF(string){
	var offset = 0;
	var chunks = {};
	
	while (offset < string.length) {
		var id = string.substr(offset, 4);
		var len = parseInt(string.substr(offset + 4, 4).split('').map(function(i){
			var unpadded = i.charCodeAt(0).toString(2);
			return (new Array(8 - unpadded.length + 1)).join('0') + unpadded
		}).join(''),2);
		var data = string.substr(offset + 4 + 4, len);
		offset += 4 + 4 + len;
		chunks[id] = chunks[id] || [];
		
		if (id == 'RIFF' || id == 'LIST') {
			chunks[id].push(parseRIFF(data));
		} else {
			chunks[id].push(data);
		}
	}
	return chunks;
}



function parseWebP(riff){
	var VP8 = riff.RIFF[0].WEBP[0];
	
	var frame_start = VP8.indexOf('\x9d\x01\x2a'); //A VP8 keyframe starts with the 0x9d012a header
	for(var i = 0, c = []; i < 4; i++) c[i] = VP8.charCodeAt(frame_start + 3 + i);
	
	var width, horizontal_scale, height, vertical_scale, tmp;
	
	//the code below is literally copied verbatim from the bitstream spec
	tmp = (c[1] << 8) | c[0];
	width = tmp & 0x3FFF;
	horizontal_scale = tmp >> 14;
	tmp = (c[3] << 8) | c[2];
	height = tmp & 0x3FFF;
	vertical_scale = tmp >> 14;
	return {
		width: width,
		height: height,
		data: VP8,
		riff: riff
	}
}
  
function parseSimpleBlock(data){
	if (data.length < 4) {
		throw "Invalid Simple Block";
	}
	var buf = data.substr(0,4).split('').map(function(e){
		return e.charCodeAt(0)
	});
	if ((buf[0] & 0x80) != 0x80){
		throw "Invalid Simple Block: TrackNumber > 127 not supported";
	}
	var trackNum = buf[0] & 0x7f;
	var timecode = buf[1] << 8 | buf[2];
	var flags = buf[3] & 0xff;
	var keyframe = flags >> 7;
	var invisible = ((flags >> 3) & 0x1);
	var discardable = (flags  & 0x1);
	var lacing = (flags >> 1) & 0x3;
	//0 = no lacing, 1 = xiph lacing, 2 = fixed-size lacing, 3 = ebml lacing

	return {
		trackNum: trackNum,
		timecode: timecode,
		lacing: lacing,
		discardable: discardable,
		invisible: invisible,
		keyframe: keyframe,
		frame: data.substr(4)
	}
}


function makeSimpleBlock(data){
	var flags = 0;
	if (data.keyframe) flags |= 128;
	if (data.invisible) flags |= 8;
	if (data.lacing) flags |= (data.lacing << 1);
	if (data.discardable) flags |= 1;
	if (data.trackNum > 127) {
		throw "TrackNumber > 127 not supported";
	}
	var out = [data.trackNum | 0x80, data.timecode >> 8, data.timecode & 0xff, flags].map(function(e){
		return String.fromCharCode(e)
	}).join('') + data.frame;

	return out;
}

// actually there are some nice docs
// webm: http://www.webmproject.org/code/specs/container/
// matroska: http://www.matroska.org/technical/specs/index.html

/**
 * @param {String[]} images An array of WebP images as data URIs
 * @param {number} fps The number of frames per second for encoding
 * @return {String} The WebM video as a data URI
 */
function generateWebM(images, fps) {
	var firstImage = images[0];
	if (!(/^data:image\/webp;base64,/ig).test(firstImage)) {
		throw "Invalid input";
	}
	firstImage = parseWebP(parseRIFF(atob(firstImage.slice(23))));
	
	var frameLength = 1000 / fps, numImages = images.length;
	
	var EBML = {
		"EBML": [{
			"EBMLVersion": 1,
			"EBMLReadVersion": 1,
			"EBMLMaxIDLength": 4,
			"EBMLMaxSizeLength": 8,
			"DocType": "webm",
			"DocTypeVersion": 2,
			"DocTypeReadVersion": 2
		}],
		"Segment": [{
			"Info": [{
				"TimecodeScale": 1e6, //do things in milliseconds (number of nanosecs for duration scale)
				"MuxingApp": "whammy",
				"WritingApp": "whammy",
				"Duration": Math.round(frameLength * numImages) //milliseconds total
			}],
			"Tracks": [{
				"TrackEntry": [{
					"TrackNumber": 1,
					"TrackUID": 1,
					"FlagLacing": 0,
					"Language": "und",
					"CodecID": "V_VP8",
					"CodecName": "VP8",
					"TrackType": 1,
					// "DefaultDuration": Math.round(1e6 * frameLength), //nanosecs per frame
					"Video": {
						"PixelWidth": firstImage.width,
						"PixelHeight": firstImage.height,
						//"DisplayWidth": firstImage.width,
						//"DisplayHeight": firstImage.height,
						//"DisplayUnit": 3
					}
				}]
			}],
			"Cluster": [{
				"Timecode": 0,
				"SimpleBlock": []
			}]
		}]
	};
	
	images.forEach(function(image, i) {
		var webp = parseWebP(parseRIFF(atob(image.slice(23))))
		EBML.Segment[0].Cluster[0].SimpleBlock.push(makeSimpleBlock({
			discardable: 0,
			frame: webp.data.substr(4),
			invisible: 0,
			keyframe: 1,
			lacing: 0,
			timecode: Math.round(i * frameLength),
			trackNum: 1
		}));
	});
	
	var video = generateEBML(EBML);
	return 'data:video/webm;base64,' + btoa(video);
}

