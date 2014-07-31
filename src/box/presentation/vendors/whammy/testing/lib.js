//EBML JSON FORMAT
/*
Schema Definition:

{
  'abcdefg': { //element ID
    desc: //description
    name: //name
    mu: //multiple (boolean)
    level: //level
    def: //default
    type: //master element, binary, float, int, etc.
  }
}


Parsed JSON

{
  EBML: {
    EBMLVersion: 8,
    EBMLReadVersion: 8
  }
  
  Segment: [
    {
      SeekHead
    }
  ]
}
*/


var nameHexMap = {};
for(var i in schema) nameHexMap[schema[i].name] = i;


function toBinary(string){
  return string.split('').map(function(i){
    var unpadded = i.charCodeAt(0).toString(2);
    return (new Array(8 - unpadded.length + 1)).join('0') + unpadded;
  }).join('')
}


function toBinStr(bits){
  var data = '';
  var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
  bits = pad + bits;
  for(var i = 0; i < bits.length; i+= 8){
    data += String.fromCharCode(parseInt(bits.substr(i,8),2))
  }
  return data;
}

BinaryParser = function(bigEndian, allowExceptions){
    this.bigEndian = bigEndian, this.allowExceptions = allowExceptions;
};
with({p: BinaryParser.prototype}){
    p.encodeFloat = function(number, precisionBits, exponentBits){
        var bias = Math.pow(2, exponentBits - 1) - 1, minExp = -bias + 1, maxExp = bias, minUnnormExp = minExp - precisionBits,
        status = isNaN(n = parseFloat(number)) || n == -Infinity || n == +Infinity ? n : 0,
        exp = 0, len = 2 * bias + 1 + precisionBits + 3, bin = new Array(len),
        signal = (n = status !== 0 ? 0 : n) < 0, n = Math.abs(n), intPart = Math.floor(n), floatPart = n - intPart,
        i, lastBit, rounded, j, result;
        for(i = len; i; bin[--i] = 0);
        for(i = bias + 2; intPart && i; bin[--i] = intPart % 2, intPart = Math.floor(intPart / 2));
        for(i = bias + 1; floatPart > 0 && i; (bin[++i] = ((floatPart *= 2) >= 1) - 0) && --floatPart);
        for(i = -1; ++i < len && !bin[i];);
        if(bin[(lastBit = precisionBits - 1 + (i = (exp = bias + 1 - i) >= minExp && exp <= maxExp ? i + 1 : bias + 1 - (exp = minExp - 1))) + 1]){
            if(!(rounded = bin[lastBit]))
                for(j = lastBit + 2; !rounded && j < len; rounded = bin[j++]);
            for(j = lastBit + 1; rounded && --j >= 0; (bin[j] = !bin[j] - 0) && (rounded = 0));
        }
        for(i = i - 2 < 0 ? -1 : i - 3; ++i < len && !bin[i];);

        (exp = bias + 1 - i) >= minExp && exp <= maxExp ? ++i : exp < minExp &&
            (exp != bias + 1 - len && exp < minUnnormExp && this.warn("encodeFloat::float underflow"), i = bias + 1 - (exp = minExp - 1));
        (intPart || status !== 0) && (this.warn(intPart ? "encodeFloat::float overflow" : "encodeFloat::" + status),
            exp = maxExp + 1, i = bias + 2, status == -Infinity ? signal = 1 : isNaN(status) && (bin[i] = 1));
        for(n = Math.abs(exp + bias), j = exponentBits + 1, result = ""; --j; result = (n % 2) + result, n = n >>= 1);
        for(n = 0, j = 0, i = (result = (signal ? "1" : "0") + result + bin.slice(i, i + precisionBits).join("")).length, r = [];
            i; n += (1 << j) * result.charAt(--i), j == 7 && (r[r.length] = String.fromCharCode(n), n = 0), j = (j + 1) % 8);
        r[r.length] = n ? String.fromCharCode(n) : "";
        return (this.bigEndian ? r.reverse() : r).join("");
    };
    p.encodeInt = function(number, bits, signed){
        var max = Math.pow(2, bits), r = [];
        (number >= max || number < -(max >> 1)) && this.warn("encodeInt::overflow") && (number = 0);
        number < 0 && (number += max);
        for(; number; r[r.length] = String.fromCharCode(number % 256), number = Math.floor(number / 256));
        for(bits = -(-bits >> 3) - r.length; bits--; r[r.length] = "\0");
        return (this.bigEndian ? r.reverse() : r).join("");
    };
    p.decodeFloat = function(data, precisionBits, exponentBits){
        var b = ((b = new this.Buffer(this.bigEndian, data)).checkBuffer(precisionBits + exponentBits + 1), b),
            bias = Math.pow(2, exponentBits - 1) - 1, signal = b.readBits(precisionBits + exponentBits, 1),
            exponent = b.readBits(precisionBits, exponentBits), significand = 0,
            divisor = 2, curByte = b.buffer.length + (-precisionBits >> 3) - 1,
            byteValue, startBit, mask;
        do
            for(byteValue = b.buffer[ ++curByte ], startBit = precisionBits % 8 || 8, mask = 1 << startBit;
                mask >>= 1; (byteValue & mask) && (significand += 1 / divisor), divisor *= 2);
        while(precisionBits -= startBit);
        return exponent == (bias << 1) + 1 ? significand ? NaN : signal ? -Infinity : +Infinity
            : (1 + signal * -2) * (exponent || significand ? !exponent ? Math.pow(2, -bias + 1) * significand
            : Math.pow(2, exponent - bias) * (1 + significand) : 0);
    };
    p.decodeInt = function(data, bits, signed){
        var b = new this.Buffer(this.bigEndian, data), x = b.readBits(0, bits), max = Math.pow(2, bits);
        return signed && x >= max / 2 ? x - max : x;
    };
    with({p: (p.Buffer = function(bigEndian, buffer){
        this.bigEndian = bigEndian || 0, this.buffer = [], this.setBuffer(buffer);
    }).prototype}){
        p.readBits = function(start, length){
            //shl fix: Henri Torgemane ~1996 (compressed by Jonas Raoni)
            function shl(a, b){
                for(++b; --b; a = ((a %= 0x7fffffff + 1) & 0x40000000) == 0x40000000 ? a * 2 : (a - 0x40000000) * 2 + 0x7fffffff + 1);
                return a;
            }
            if(start < 0 || length <= 0)
                return 0;
            this.checkBuffer(start + length);
            for(var offsetLeft, offsetRight = start % 8, curByte = this.buffer.length - (start >> 3) - 1,
                lastByte = this.buffer.length + (-(start + length) >> 3), diff = curByte - lastByte,
                sum = ((this.buffer[ curByte ] >> offsetRight) & ((1 << (diff ? 8 - offsetRight : length)) - 1))
                + (diff && (offsetLeft = (start + length) % 8) ? (this.buffer[ lastByte++ ] & ((1 << offsetLeft) - 1))
                << (diff-- << 3) - offsetRight : 0); diff; sum += shl(this.buffer[ lastByte++ ], (diff-- << 3) - offsetRight)
            );
            return sum;
        };
        p.setBuffer = function(data){
            if(data){
                for(var l, i = l = data.length, b = this.buffer = new Array(l); i; b[l - i] = data.charCodeAt(--i));
                this.bigEndian && b.reverse();
            }
        };
        p.hasNeededBits = function(neededBits){
            return this.buffer.length >= -(-neededBits >> 3);
        };
        p.checkBuffer = function(neededBits){
            if(!this.hasNeededBits(neededBits))
                throw new Error("checkBuffer::missing bytes");
        };
    }
    p.warn = function(msg){
        if(this.allowExceptions)
            throw new Error(msg);
        return 1;
    };
    p.toSmall = function(data){return this.decodeInt(data, 8, true);};
    p.fromSmall = function(number){return this.encodeInt(number, 8, true);};
    p.toByte = function(data){return this.decodeInt(data, 8, false);};
    p.fromByte = function(number){return this.encodeInt(number, 8, false);};
    p.toShort = function(data){return this.decodeInt(data, 16, true);};
    p.fromShort = function(number){return this.encodeInt(number, 16, true);};
    p.toWord = function(data){return this.decodeInt(data, 16, false);};
    p.fromWord = function(number){return this.encodeInt(number, 16, false);};
    p.toInt = function(data){return this.decodeInt(data, 32, true);};
    p.fromInt = function(number){return this.encodeInt(number, 32, true);};
    p.toDWord = function(data){return this.decodeInt(data, 32, false);};
    p.fromDWord = function(number){return this.encodeInt(number, 32, false);};
    p.toFloat = function(data){return this.decodeFloat(data, 23, 8);};
    p.fromFloat = function(number){return this.encodeFloat(number, 23, 8);};
    p.toDouble = function(data){return this.decodeFloat(data, 52, 11);};
    p.fromDouble = function(number){return this.encodeFloat(number, 52, 11);};
}

var numparse = new BinaryParser(true, true);


function parseEBML(string){
  var offset = 0;
  var json = {};
  while(offset < string.length){
    var el_id = toBinary(string.substr(offset, 4));
    var segments = el_id.match(/^0*1/)[0].length;
    var id = el_id.substring(segments - 1, segments * 8);
    var hexid = parseInt(id, 2).toString(16);

    offset += segments;
    
    var el_size = toBinary(string.substr(offset, 8));
    var segments = el_size.match(/^0*1/)[0].length;
    var size = parseInt(el_size.substring(segments, segments * 8),2);
    
    offset += segments;

    var data = string.substr(offset, size);
    offset += size;
    var element = schema[hexid];
    var name = element ? element.name : hexid;
    var value = data;

    console.log(string.substr(offset, 4), name, el_id)
    if(element){
      var type = element.type;

      if(type == 'm'){
        value = parseEBML(data);
      }else if(type == 's'){
        value = data;
      }else if(type == 'u'){
        value = parseInt(toBinary(data),2);
      }else if(type == "8"){
        //TODO: parse UTF 8

        value = data;
      }else if(type == "b"){
        //binary
        value = data;
      }else if(type == "f"){
        //float
        value = numparse.toDouble(data)
      }else{
        console.log('unknown type', type)
      }
    }
    var parsed_data = value //{original: data, val: value}; //so that generateEBML can return original.
    if(!element || element.mu){
      if(!json[name]) json[name] = [];
      json[name].push(parsed_data);
    }else{
      json[name] = parsed_data;
    }
    //console.log(hexid, size, data);
    
  }

  return json;
}


function generateEBML(json){
  var ebml = '';
  for(var i in json){
    var el_len = json[i].pop ? json[i].length : 1;
    for(var k = 0; k < el_len; k++){
      var data = json[i].pop ? json[i][k] : json[i];
      console.log(i,k,data);
      var hexid = nameHexMap[i] || i;
      var type = schema[hexid].type
      if(typeof data == 'object'){
        
        //recurse
        //normal object yay
        data = generateEBML(data);
      }else if(typeof data == 'number'){
        //console.log(type, hexid, i)
        if(type == "f"){
          data = numparse.fromDouble(data)

        }else{
          data = toBinStr(data.toString(2));  
        }
        
      }
      if(typeof data == 'string'){
        var len = data.length;
        var zeroes = Math.ceil(Math.ceil(Math.log(len)/Math.log(2))/8);
        //(zeroes + 1) * 8 - (zeroes + 1) = zeroes * 7 - 7 = needed size
        var size_str = len.toString(2);
        var padded = (new Array((zeroes * 7 + 7 + 1) - size_str.length)).join('0') + size_str;
        var size = (new Array(zeroes + 1)).join('0') + '1' + padded;

        ebml += toBinStr(parseInt(hexid, 16).toString(2));
        //console.log(size, size_str, size.toString(16));
        ebml += toBinStr(size);
        ebml += data;
      }else{
        console.log('big error!?!?!?',i,data,json);
      }
    }
  }
  return ebml;
}

/*


var vEBML = {
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
      "Duration": 420 //milliseconds total
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
        "DefaultDuration": 42, //nanosecs per frame
        "Video": {
          "PixelWidth": 1337,
          "PixelHeight": 1996,
        }
      }]
    }],
    "Cluster": [{
      "Timecode": 0,
      "SimpleBlock": "pony"
    }]
  }]
};

function simplify(json){
  var ebml = [];
  for(var i in json){
    var el_len = json[i].pop ? json[i].length : 1;
    for(var k = 0; k < el_len; k++){
      var data = json[i].pop ? json[i][k] : json[i];
      //console.log(i,k,data);
      var hexid = nameHexMap[i] || i;
      var type = schema[hexid].type
      if(typeof data == 'object'){
        
        //recurse
        //normal object yay
        // ebml.push(simplify(data));
        ebml.push({
          hex: hexid,
          name: i,
          data: simplify(data)
        })
      }else{
        console.log(data)
        ebml.push({

          name: i,
          data: data,
          hex: hexid
        })
      }
    }
  }
  return ebml;
}


*/