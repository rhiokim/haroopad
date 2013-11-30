var Benchmark = require('benchmark')
  , i18n = require('../index')
  , os = require('os');

var opts = {
  lng: 'en-US',
  preload: [],
  supportedLngs: [],
  lowerCaseLng: false,
  ns: 'translation',
  resGetPath: 'test/locales/__lng__/__ns__.json',
  saveMissing: false,
  resStore: false,
  returnObjectTrees: false,
  debug: false
};

var resStore = {
  dev: { translation: { 'simple_dev': 'ok_from_dev' } },
  en: { translation: { 'simple_en': 'ok_from_en' } },            
  'en-US': { translation: { 'simple_en-US': 'ok_from_en-US' } }
};

var suite = new Benchmark.Suite();


// add tests
suite
  .add('getSpecific#lvl1', function() {
    i18n.t('simple_en-US');
  })
  .add('getUnspecific#lvl2', function() {
    i18n.t('simple_en');
  })
  .add('getFallback#lvl3', function() {
    i18n.t('simple_dev');
  });

// add listeners
suite
  .on('cycle', function(event) {
    console.log(os.hostname() + ' v' + i18n.version + ': ' + String(event.target));
  })
  .on('complete', function() { 
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  });
      
i18n.init( i18n.functions.extend(opts, { resStore: resStore }), function(t) { 
  // run async
  suite.run({ 'async': true });
});


