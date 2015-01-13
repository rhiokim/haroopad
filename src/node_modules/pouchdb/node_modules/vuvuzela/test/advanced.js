// copied from clarinet
/* jshint ignore:start */
var docs = { empty_array: { text: '[]', events: [
  ['openarray' , undefined],

  ['closearray' , undefined],

  ['end'        , undefined],

  ['ready'      , undefined]
]
}, just_slash: { text: '["\\\\"]', events: [
  ['openarray'  , undefined],

  ["value"      , "\\"],

  ['closearray' , undefined],

  ['end'        , undefined],

  ['ready'      , undefined]
]
}, zero_byte: { text: '{"foo": "\\u0000"}', events: [
  ["openobject"  , "foo"],

  ["value"       , "\u0000"],

  ["closeobject" , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, empty_value: { text: '{"foo": ""}', events: [
  ["openobject"  , "foo"],

  ["value"       , ""],

  ["closeobject" , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, three_byte_utf8: { text: '{"matzue": "松江", "asakusa": "浅草"}', events: [
  ["openobject"  , "matzue"],

  ["value"       , "松江"],

  ["key"         , "asakusa"],

  ["value"       , "浅草"],

  ["closeobject" , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, four_byte_utf8: { text: '{ "U+10ABCD": "������" }', events: [
  ["openobject"  , "U+10ABCD"],

  ["value"       , "������"],

  ["closeobject" , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, bulgarian: { text: '["Да Му Еба Майката"]', events: [
  ["openarray"   , undefined],

  ["value"       , "Да Му Еба Майката"],

  ["closearray"  , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, codepoints_from_unicodes: { text: '["\\u004d\\u0430\\u4e8c\\ud800\\udf02"]', events: [
  ["openarray"   , undefined],

  ["value"       , "\u004d\u0430\u4e8c\ud800\udf02"],

  ["closearray"  , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, empty_object: { text: '{}', events: [
  ["openobject"  , undefined],

  ["closeobject" , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, foobar: { text: '{"foo": "bar"}', events: [
  ["openobject"  , "foo"],

  ["value"       , "bar"],

  ["closeobject" , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, as_is: { text: "{\"foo\": \"its \\\"as is\\\", \\\"yeah\", \"bar\": false}", events: [
  ["openobject"  , "foo"],

  ["value"       , 'its "as is", "yeah'],

  ["key"         , "bar"],

  ["value"       , false],

  ["closeobject" , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, array: { text: '["one", "two"]', events: [
  ['openarray'  , undefined],

  ['value'      , 'one'],

  ['value'      , 'two'],

  ['closearray' , undefined],

  ['end'        , undefined],

  ['ready'      , undefined]
]
}, array_fu: { text: '["foo", "bar", "baz",true,false,null,{"key":"value"},' +
  '[null,null,null,[]]," \\\\ "]', events: [
  ['openarray'   , undefined],

  ['value'       , 'foo'],

  ['value'       , 'bar'],

  ['value'       , 'baz'],

  ['value'       , true],

  ['value'       , false],

  ['value'       , null],

  ['openobject'  , 'key'],

  ['value'       , "value"],

  ["closeobject" , undefined],

  ['openarray'   , undefined],

  ['value'       , null],

  ['value'       , null],

  ['value'       , null],

  ['openarray'   , undefined],

  ['closearray'  , undefined],

  ['closearray'  , undefined],

  ['value'       , " \\ "],

  ['closearray'  , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, simple_exp: { text: '[10e-01]', events: [
  ['openarray'  , undefined],

  ['value'      , 10e-01],

  ['closearray' , undefined],

  ['end'        , undefined],

  ['ready'      , undefined]
]
}, nested: { text: '{"a":{"b":"c"}}', events: [
  ["openobject"  , "a"],

  ["openobject"  , "b"],

  ["value"       , "c"],

  ["closeobject" , undefined],

  ["closeobject" , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, nested_array: { text: '{"a":["b", "c"]}', events: [
  ["openobject"  , "a"],

  ['openarray'   , undefined],

  ['value'       , 'b'],

  ['value'       , 'c'],

  ['closearray'  , undefined],

  ["closeobject" , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, array_of_objs: { text: '[{"a":"b"}, {"c":"d"}]', events: [
  ['openarray'   , undefined],

  ["openobject"  , 'a'],

  ['value'       , 'b'],

  ["closeobject" , undefined],

  ["openobject"  , 'c'],

  ['value'       , 'd'],

  ["closeobject" , undefined],

  ['closearray'  , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, two_keys: { text: '{"a": "b", "c": "d"}', events: [
  ["openobject"  , "a"],

  ["value"       , "b"],

  ["key"         , "c"],

  ["value"       , "d"],

  ["closeobject" , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, key_true: { text: '{"foo": true, "bar": false, "baz": null}', events: [
  ["openobject"  , "foo"],

  ["value"       , true],

  ["key"         , "bar"],

  ["value"       , false],

  ["key"         , "baz"],

  ["value"       , null],

  ["closeobject" , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, obj_strange_strings: { text: '{"foo": "bar and all\\\"", "bar": "its \\\"nice\\\""}', events: [
  ["openobject"    , "foo"],

  ["value"         , 'bar and all"'],

  ["key"           , "bar"],

  ["value"         , 'its "nice"'],

  ["closeobject"   , undefined],

  ['end'           , undefined],

  ['ready'         , undefined]
]
}, bad_foo_bar: { text: '["foo", "bar"', events: [
  ["openarray"   , undefined],

  ["value"       , 'foo'],

  ["value"       , 'bar'],

  ['error'       , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, string_invalid_escape: { text: '["and you can\'t escape thi\s"]', events: [
  ["openarray"   , undefined],

  ["value"       , 'and you can\'t escape this'],

  ["closearray"  , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, nuts_and_bolts: { text: '{"boolean, true": true' +
  ', "boolean, false": false' +
  ', "null": null }', events: [
  ["openobject"   , "boolean, true"],

  ["value"        , true],

  ["key"          , "boolean, false"],

  ["value"        , false],

  ["key"          , "null"],

  ["value"        , null],

  ["closeobject"  , undefined],

  ['end'          , undefined],

  ['ready'        , undefined]
]
}, frekin_string: { text: '["\\\\\\"\\"a\\""]', events: [
  ["openarray"   , undefined],

  ["value"       , '\\\"\"a\"'],

  ["closearray"  , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, array_of_string_insanity: { text: '["\\\"and this string has an escape at the beginning",' +
  '"and this string has no escapes"]', events: [
  ["openarray"   , undefined],

  ["value"       , "\"and this string has an escape at the beginning"],

  ["value"       , "and this string has no escapes"],

  ["closearray"  , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, non_utf8: { text: '{"CoreletAPIVersion":2,"CoreletType":"standalone",' +
  '"documentation":"A corelet that provides the capability to upload' +
  ' a folder’s contents into a user’s locker.","functions":[' +
  '{"documentation":"Displays a dialog box that allows user to ' +
  'select a folder on the local system.","name":' +
  '"ShowBrowseDialog","parameters":[{"documentation":"The ' +
  'callback function for results.","name":"callback","required":' +
  'true,"type":"callback"}]},{"documentation":"Uploads all mp3 files' +
  ' in the folder provided.","name":"UploadFolder","parameters":' +
  '[{"documentation":"The path to upload mp3 files from."' +
  ',"name":"path","required":true,"type":"string"},{"documentation":' +
  ' "The callback function for progress.","name":"callback",' +
  '"required":true,"type":"callback"}]},{"documentation":"Returns' +
  ' the server name to the current locker service.",' +
  '"name":"GetLockerService","parameters":[]},{"documentation":' +
  '"Changes the name of the locker service.","name":"SetLockerSer' +
  'vice","parameters":[{"documentation":"The value of the locker' +
  ' service to set active.","name":"LockerService","required":true' +
  ',"type":"string"}]},{"documentation":"Downloads locker files to' +
  ' the suggested folder.","name":"DownloadFile","parameters":[{"' +
  'documentation":"The origin path of the locker file.",' +
  '"name":"path","required":true,"type":"string"},{"documentation"' +
  ':"The Window destination path of the locker file.",' +
  '"name":"destination","required":true,"type":"integer"},{"docum' +
  'entation":"The callback function for progress.","name":' +
  '"callback","required":true,"type":"callback"}]}],' +
  '"name":"LockerUploader","version":{"major":0,' +
  '"micro":1,"minor":0},"versionString":"0.0.1"}', events: [
  [ "openobject"  , "CoreletAPIVersion"],

  [ "value"       , 2 ],

  [ "key"         , "CoreletType"],

  [ "value"       , "standalone" ],

  [ "key"         , "documentation"],

  [ "value"       , "A corelet that provides the capability to upload a folder’s contents into a user’s locker."],

  ["key"          , "functions"],

  [ "openarray"   , undefined],

  [ "openobject"  , "documentation"],

  [ "value"       , "Displays a dialog box that allows user to select a folder on the local system."],

  [ "key"         , "name"],

  [ "value"       , "ShowBrowseDialog"],

  [ "key"         , "parameters"],

  [ "openarray"   , undefined],

  [ "openobject"  , "documentation"],

  [ "value"       , "The callback function for results."],

  [ "key"         , "name"],

  [ "value"       , "callback"],

  [ "key"         , "required"],

  [ "value"       , true],

  [ "key"         , "type"],

  [ "value"       , "callback"],

  [ "closeobject" , undefined],

  [ "closearray"  , undefined],

  [ "closeobject" , undefined],

  [ "openobject"  , "documentation"],

  [ "value"       , "Uploads all mp3 files in the folder provided."],

  [ "key"         , "name"],

  [ "value"       , "UploadFolder"],

  [ "key"         , "parameters"],

  [ "openarray"   , undefined],

  [ "openobject"  , "documentation"],

  [ "value"       , "The path to upload mp3 files from."],

  [ "key"         , "name"],

  [ "value"       , "path"],

  [ "key"         , "required"],

  [ "value"       , true],

  [ "key"         , "type"],

  [ "value"       , "string"],

  [ "closeobject" , undefined],

  [ "openobject"  , "documentation"],

  [ "value"       , "The callback function for progress."],

  [ "key"         , "name"],

  [ "value"       , "callback"],

  [ "key"         , "required"],

  [ "value"       , true ],

  [ "key"         , "type"],

  [ "value"       , "callback"],

  [ "closeobject" , undefined],

  [ "closearray"  , undefined],

  [ "closeobject" , undefined],

  [ "openobject"  , "documentation"],

  [ "value"       , "Returns the server name to the current locker service."],

  [ "key"         , "name"],

  [ "value"       , "GetLockerService"],

  [ "key"         , "parameters"],

  [ "openarray"   , undefined],

  [ "closearray"  , undefined],

  [ "closeobject" , undefined],

  [ "openobject"  , "documentation"],

  [ "value"       , "Changes the name of the locker service."],

  [ "key"         , "name"],

  [ "value"       , "SetLockerService"],

  [ "key"         , "parameters"],

  [ "openarray"   , undefined],

  [ "openobject"  , "documentation"],

  [ "value"       , "The value of the locker service to set active."],

  [ "key"         , "name"],

  [ "value"       , "LockerService" ],

  [ "key"         , "required" ],

  [ "value"       , true],

  [ "key"         , "type"],

  [ "value"       , "string"],

  [ "closeobject" , undefined],

  [ "closearray"  , undefined],

  [ "closeobject" , undefined],

  [ "openobject"  , "documentation"],

  [ "value"       , "Downloads locker files to the suggested folder."],

  [ "key"         , "name"],

  [ "value"       , "DownloadFile"],

  [ "key"         , "parameters"],

  [ "openarray"   , undefined],

  [ "openobject"  , "documentation"],

  [ "value"       , "The origin path of the locker file."],

  [ "key"         , "name"],

  [ "value"       , "path"],

  [ "key"         , "required"],

  [ "value"       , true],

  [ "key"         , "type"],

  [ "value"       , "string"],

  [ "closeobject" , undefined],

  [ "openobject"  , "documentation"],

  [ "value"       , "The Window destination path of the locker file."],

  [ "key"         , "name"],

  [ "value"       , "destination"],

  [ "key"         , "required"],

  [ "value"       , true],

  [ "key"         , "type"],

  [ "value"       , "integer"],

  [ "closeobject" , undefined],

  [ "openobject"  , "documentation"],

  [ "value"       , "The callback function for progress."],

  [ "key"         , "name"],

  [ "value"       , "callback"],

  [ "key"         , "required"],

  [ "value"       , true],

  [ "key"         , "type"],

  [ "value"       , "callback"],

  [ "closeobject" , undefined],

  [ "closearray"  , undefined],

  [ "closeobject" , undefined],

  [ "closearray"  , undefined],

  [ "key"         , "name"],

  [ "value"       , "LockerUploader"],

  [ "key"         , "version"],

  [ "openobject"  , "major"],

  [ "value"       , 0],

  [ "key"         , "micro"],

  [ "value"       , 1],

  [ "key"         , "minor"],

  [ "value"       , 0],

  [ "closeobject" , undefined],

  [ "key"         , "versionString"],

  [ "value"       , "0.0.1"],

  [ "closeobject" , undefined],

  [ "end"         , undefined],

  [ "ready"       , undefined]
]
}, array_of_arrays: { text: '[[[["foo"]]]]', events: [
  ['openarray'  , undefined],

  ['openarray'  , undefined],

  ['openarray'  , undefined],

  ['openarray'  , undefined],

  ["value"      , "foo"],

  ['closearray' , undefined],

  ['closearray' , undefined],

  ['closearray' , undefined],

  ['closearray' , undefined],

  ['end'        , undefined],

  ['ready'      , undefined]
]
}, low_overflow: { text: '[-9223372036854775808]', events: [
  ['openarray'  , undefined],

  ["value"      , -9223372036854775808],

  ['closearray' , undefined],

  ['end'        , undefined],

  ['ready'      , undefined]
]
}, high_overflow: { text: '[9223372036854775808]', events: [
  ['openarray'  , undefined],

  ["value"      , 9223372036854775808],

  ['closearray' , undefined],

  ['end'        , undefined],

  ['ready'      , undefined]
]
}, floats: { text: '[0.1e2, 1e1, 3.141569, 10000000000000e-10]', events: [
  ['openarray'  , undefined],

  ["value"      , 0.1e2],

  ["value"      , 1e1],

  ["value"      , 3.141569],

  ["value"      , 10000000000000e-10],

  ['closearray' , undefined],

  ['end'        , undefined],

  ['ready'      , undefined]
]
}, numbers_game: { text: '[1,0,-1,-0.3,0.3,1343.32,3345,3.1e124,' +
  ' 9223372036854775807,-9223372036854775807,0.1e2, ' +
  '1e1, 3.141569, 10000000000000e-10,' +
  '0.00011999999999999999, 6E-06, 6E-06, 1E-06, 1E-06,' +
  '"2009-10-20@20:38:21.539575", 9223372036854775808,' +
  '123456789,-123456789,' +
  '2147483647, -2147483647]', events: [
  ['openarray'  , undefined],

  ["value"      , 1],

  ["value"      , 0],

  ["value"      , -1],

  ["value"      , -0.3],

  ["value"      , 0.3],

  ["value"      , 1343.32],

  ["value"      , 3345],

  ["value"      , 3.1e124],

  ["value"      , 9223372036854775807],

  ["value"      , -9223372036854775807],

  ["value"      , 0.1e2],

  ["value"      , 1e1],

  ["value"      , 3.141569],

  ["value"      , 10000000000000e-10],

  ["value"      , 0.00011999999999999999],

  ["value"      , 6E-06],

  ["value"      , 6E-06],

  ["value"      , 1E-06],

  ["value"      , 1E-06],

  ["value"      , "2009-10-20@20:38:21.539575"],

  ["value"      , 9223372036854775808],

  ["value"      , 123456789],

  ["value"      , -123456789],

  ["value"      , 2147483647],

  ["value"      , -2147483647],

  ['closearray' , undefined],

  ['end'        , undefined],

  ['ready'      , undefined]
]
}, johnsmith: { text: '{ "firstName": "John", "lastName" : "Smith", "age" : ' +
  '25, "address" : { "streetAddress": "21 2nd Street", ' +
  '"city" : "New York", "state" : "NY", "postalCode" : ' +
  ' "10021" }, "phoneNumber": [ { "type" : "home", ' +
  '"number": "212 555-1234" }, { "type" : "fax", ' +
  '"number": "646 555-4567" } ] }', events: [
  ["openobject"   , "firstName"],

  ["value"        , "John"],

  ["key"          , "lastName"],

  ["value"        , "Smith"],

  ["key"          , "age"],

  ["value"        , 25],

  ["key"          , "address"],

  ["openobject"   , "streetAddress"],

  ["value"        , "21 2nd Street"],

  ["key"          , "city"],

  ["value"        , "New York"],

  ["key"          , "state"],

  ["value"        , "NY"],

  ["key"          , "postalCode"],

  ["value"        , "10021"],

  ["closeobject"  , undefined],

  ["key"          , "phoneNumber"],

  ["openarray"    , undefined],

  ["openobject"   , "type"],

  ["value"        , "home"],

  ["key"          , "number"],

  ["value"        , "212 555-1234"],

  ["closeobject"  , undefined],

  ["openobject"   , "type"],

  ["value"        , "fax"],

  ["key"          , "number"],

  ["value"        , "646 555-4567"],

  ["closeobject"  , undefined],

  ["closearray"   , undefined],

  ["closeobject"  , undefined]
]
}, array_null: { text: '[null,false,true]', events: [
  ["openarray"   , undefined],

  ["value"       , null],

  ["value"       , false],

  ["value"       , true],

  ["closearray"  , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, empty_array_comma: { text: '{"a":[],"c": {}, "b": true}', events: [
  ["openobject"  , "a"],

  ["openarray"   , undefined],

  ["closearray"  , undefined],

  ["key"         , "c"],

  ["openobject"  , undefined],

  ["closeobject" , undefined],

  ["key"         , "b"],

  ["value"       , true],

  ["closeobject" , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}, incomplete_json_terminates_ending_in_number: { text: '[[1,2,3],[4,5', events: [
  ["openarray"   , undefined],

  ["openarray"   , undefined],

  ["value"       , 1],

  ["value"       , 2],

  ["value"       , 3],

  ["closearray"  , undefined],

  ["openarray"   , undefined],

  ["value"       , 4],

  ["error"       , undefined]
]
}, incomplete_json_terminates_ending_in_comma: { text: '[[1,2,3],', events: [
  ["openarray"   , undefined],

  ["openarray"   , undefined],

  ["value"       , 1],

  ["value"       , 2],

  ["value"       , 3],

  ["closearray"  , undefined],

  ["error"       , undefined]
]
}, json_org: { text: ('{\r\n' +
  '          "glossary": {\n' +
  '              "title": "example glossary",\n\r' +
  '      \t\t"GlossDiv": {\r\n' +
  '                  "title": "S",\r\n' +
  '      \t\t\t"GlossList": {\r\n' +
  '                      "GlossEntry": {\r\n' +
  '                          "ID": "SGML",\r\n' +
  '      \t\t\t\t\t"SortAs": "SGML",\r\n' +
  '      \t\t\t\t\t"GlossTerm": "Standard Generalized ' +
  'Markup Language",\r\n' +
  '      \t\t\t\t\t"Acronym": "SGML",\r\n' +
  '      \t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n' +
  '      \t\t\t\t\t"GlossDef": {\r\n' +
  '                              "para": "A meta-markup language,' +
  ' used to create markup languages such as DocBook.",\r\n' +
  '      \t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\r\n' +
  '                          },\r\n' +
  '      \t\t\t\t\t"GlossSee": "markup"\r\n' +
  '                      }\r\n' +
  '                  }\r\n' +
  '              }\r\n' +
  '          }\r\n' +
  '      }\r\n'), events: [
  ["openobject"  , "glossary"],

  ["openobject"  , "title"],

  ['value'       , "example glossary"],

  ["key"         , "GlossDiv"],

  ["openobject"  , "title"],

  ['value'       , "S"],

  ["key"         , "GlossList"],

  ["openobject"  , "GlossEntry"],

  ["openobject"  , "ID"],

  ['value'       , "SGML"],

  ["key"         , "SortAs"],

  ['value'       , "SGML"],

  ["key"         , "GlossTerm"],

  ['value'       , "Standard Generalized Markup Language"],

  ["key"         , "Acronym"],

  ['value'       , "SGML"],

  ["key"         , "Abbrev"],

  ['value'       , 'ISO 8879:1986'],

  ["key"         , "GlossDef"],

  ["openobject"  , "para"],

  ['value'       , 'A meta-markup language, used to create markup languages such as DocBook.'],

  ["key"         , "GlossSeeAlso"],

  ['openarray'   , undefined],

  ['value'       , "GML"],

  ['value'       , "XML"],

  ['closearray'  , undefined],

  ["closeobject" , undefined],

  ["key"         , "GlossSee"],

  ["value"       , "markup"],

  ["closeobject" , undefined],

  ["closeobject" , undefined],

  ["closeobject" , undefined],

  ["closeobject" , undefined],

  ["closeobject" , undefined],

  ['end'         , undefined],

  ['ready'       , undefined]
]
}
};
module.exports = docs;

/* jshint ignore:end */