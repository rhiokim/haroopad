define([], function() {

	var config = store.get('General') || {};

	function loadJs(url, cb) {
	  var head = document.getElementsByTagName('head')[0];
	  var script = document.createElement('script');
	      script.type = 'text/javascript';
	      script.src = url;
	      script.onload = cb;

	   head.appendChild(script);
	}

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

  loadJs(getExecPath() + 'Libraries/MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML', function() {
    MathJax.Hub.Config({
      showProcessingMessages: true,
      tex2jax: {
        inlineMath: [ ['$$$','$$$'], ["\\(","\\)"] ],
        displayMath: [ ['$$','$$'], ["\\[","\\]"] ]
      }
    });
    MathJax.Hub.config.menuSettings.renderer = 'HTML-CSS'; //'SVG', 'NativeMML'
  });

  window.ee.on('math', processMathJax);

});