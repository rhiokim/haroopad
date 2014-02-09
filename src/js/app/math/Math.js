define([], function() {

	var config = store.get('General') || {};

	function processMathJax(target, cb) {
	  var mathEl = document.createElement('div');
	  mathEl.innerHTML = target.innerHTML;

	  MathJax.Hub.Queue(
	    ["Typeset", MathJax.Hub, mathEl],
	    [function() {
	      target.innerHTML = mathEl.innerHTML;
	      target.removeAttribute('class');
	    }],
	    [cb]
	  );
	}

  loadJs(global.PATHS.js + '/MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML', function() {
    MathJax.Hub.Config({
      showProcessingMessages: false,
      tex2jax: {
        inlineMath: [ ['$$$','$$$'], ['$','$'], ["\\(","\\)"] ],
        displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
      	processEscapes: true
      }
    });
    MathJax.Hub.config.menuSettings.renderer = 'HTML-CSS'; //'SVG', 'NativeMML'
  });

  window.ee.on('math', processMathJax);

});