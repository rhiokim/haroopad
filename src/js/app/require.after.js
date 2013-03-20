	/* 병합 시 require.js 가 window 스코프에서 수행되지 않는 점을 해결하기 위해 */
	window.requirejs = requirejs, window.require = require, window.define = define;