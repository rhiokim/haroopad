/*
 RequireJS 2.1.4 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/

var requirejs,require,define;(function(Y){function I(e){return"[object Function]"===L.call(e)}function J
(e){return"[object Array]"===L.call(e)}function x(e,t){if(e){var n;for(n=0;n<e.length&&(!e[n]||!t(e[n
],n,e));n+=1);}}function M(e,t){if(e){var n;for(n=e.length-1;-1<n&&(!e[n]||!t(e[n],n,e));n-=1);}}function r
(e,t){return da.call(e,t)}function i(e,t){return r(e,t)&&e[t]}function E(e,t){for(var n in e)if(r(e,n
)&&t(e[n],n))break}function Q(e,t,n,i){return t&&E(t,function(t,s){if(n||!r(e,s))i&&"string"!=typeof 
t?(e[s]||(e[s]={}),Q(e[s],t,n,i)):e[s]=t}),e}function t(e,t){return function(){return t.apply(e,arguments
)}}function Z(e){if(!e)return e;var t=Y;return x(e.split("."),function(e){t=t[e]}),t}function F(e,t,n
,r){return t=Error(t+"\nhttp://requirejs.org/docs/errors.html#"+e),t.requireType=e,t.requireModules=r
,n&&(t.originalError=n),t}function ea(e){function n(e,t,n){var r,s,o,u,a,f,l,c=t&&t.split("/");r=c;var h=
C.map,p=h&&h["*"];if(e&&"."===e.charAt(0))if(t){r=i(C.pkgs,t)?c=[t]:c.slice(0,c.length-1),t=e=r.concat
(e.split("/"));for(r=0;t[r];r+=1)if(s=t[r],"."===s)t.splice(r,1),r-=1;else if(".."===s){if(1===r&&(".."===
t[2]||".."===t[0]))break;0<r&&(t.splice(r-1,2),r-=2)}r=i(C.pkgs,t=e[0]),e=e.join("/"),r&&e===t+"/"+r.
main&&(e=t)}else 0===e.indexOf("./")&&(e=e.substring(2));if(n&&(c||p)&&h){t=e.split("/");for(r=t.length
;0<r;r-=1){o=t.slice(0,r).join("/");if(c)for(s=c.length;0<s;s-=1)if(n=i(h,c.slice(0,s).join("/")))if(
n=i(n,o)){u=n,a=r;break}if(u)break;!f&&p&&i(p,o)&&(f=i(p,o),l=r)}!u&&f&&(u=f,a=l),u&&(t.splice(0,a,u)
,e=t.join("/"))}return e}function s(e){z&&x(document.getElementsByTagName("script"),function(t){if(t.
getAttribute("data-requiremodule")===e&&t.getAttribute("data-requirecontext")===S.contextName)return t
.parentNode.removeChild(t),!0})}function o(e){var t=i(C.paths,e);if(t&&J(t)&&1<t.length)return s(e),t
.shift(),S.require.undef(e),S.require([e]),!0}function u(e){var t,n=e?e.indexOf("!"):-1;return-1<n&&(
t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function a(e,t,r,s){var o,a,f=null,l=t?t.name:null
,c=e,h=!0,p="";return e||(h=!1,e="_@r"+(D+=1)),e=u(e),f=e[0],e=e[1],f&&(f=n(f,l,s),a=i(M,f)),e&&(f?p=
a&&a.normalize?a.normalize(e,function(e){return n(e,l,s)}):n(e,l,s):(p=n(e,l,s),e=u(p),f=e[0],p=e[1],
r=!0,o=S.nameToUrl(p))),r=f&&!a&&!r?"_unnormalized"+(H+=1):"",{prefix:f,name:p,parentMap:t,unnormalized
:!!r,url:o,originalName:c,isDefine:h,id:(f?f+"!"+p:p)+r}}function f(e){var t=e.id,n=i(k,t);return n||
(n=k[t]=new S.Module(e)),n}function c(e,t,n){var s=e.id,o=i(k,s);r(M,s)&&(!o||o.defineEmitComplete)?"defined"===
t&&n(M[s]):f(e).on(t,n)}function h(e,t){var n=e.requireModules,r=!1;t?t(e):(x(n,function(t){if(t=i(k,
t))t.error=e,t.events.error&&(r=!0,t.emit("error",e))}),!r)&&l.onError(e)}function p(){R.length&&(fa.
apply(A,[A.length-1,0].concat(R)),R=[])}function d(e,t,n){var r=e.map.id;e.error?e.emit("error",e.error
):(t[r]=!0,x(e.depMaps,function(r,s){var o=r.id,u=i(k,o);u&&!e.depMatched[s]&&!n[o]&&(i(t,o)?(e.defineDep
(s,M[o]),e.check()):d(u,t,n))}),n[r]=!0)}function v(){var e,t,n,r,i=(n=1e3*C.waitSeconds)&&S.startTime+
n<(new Date).getTime(),u=[],a=[],f=!1,l=!0;if(!b){b=!0,E(k,function(n){e=n.map,t=e.id;if(n.enabled&&(
e.isDefine||a.push(n),!n.error))if(!n.inited&&i)o(t)?f=r=!0:(u.push(t),s(t));else if(!n.inited&&n.fetched&&
e.isDefine&&(f=!0,!e.prefix))return l=!1});if(i&&u.length)return n=F("timeout","Load timeout for modules: "+
u,null,u),n.contextName=S.contextName,h(n);l&&x(a,function(e){d(e,{},{})}),(!i||r)&&f&&(z||$)&&!N&&(N=
setTimeout(function(){N=0,v()},50)),b=!1}}function m(e){r(M,e[0])||f(a(e[0],null,!0)).init(e[1],e[2])
}function g(e){var e=e.currentTarget||e.srcElement,t=S.onScriptLoad;return e.detachEvent&&!V?e.detachEvent
("onreadystatechange",t):e.removeEventListener("load",t,!1),t=S.onScriptError,(!e.detachEvent||V)&&e.
removeEventListener("error",t,!1),{node:e,id:e&&e.getAttribute("data-requiremodule")}}function y(){var e
;for(p();A.length;){e=A.shift();if(null===e[0])return h(F("mismatch","Mismatched anonymous define() module: "+
e[e.length-1]));m(e)}}var b,w,S,T,N,C={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{},map:{},config
:{}},k={},L={},A=[],M={},_={},D=1,H=1;return T={require:function(e){return e.require?e.require:e.require=
S.makeRequire(e.map)},exports:function(e){e.usingExports=!0;if(e.map.isDefine)return e.exports?e.exports
:e.exports=M[e.map.id]={}},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map
.url,config:function(){return C.config&&i(C.config,e.map.id)||{}},exports:M[e.map.id]}}},w=function(e
){this.events=i(L,e.id)||{},this.map=e,this.shim=i(C.shim,e.id),this.depExports=[],this.depMaps=[],this
.depMatched=[],this.pluginMaps={},this.depCount=0},w.prototype={init:function(e,n,r,i){i=i||{},this.inited||
(this.factory=n,r?this.on("error",r):this.events.error&&(r=t(this,function(e){this.emit("error",e)}))
,this.depMaps=e&&e.slice(0),this.errback=r,this.inited=!0,this.ignore=i.ignore,i.enabled||this.enabled?
this.enable():this.check())},defineDep:function(e,t){this.depMatched[e]||(this.depMatched[e]=!0,this.
depCount-=1,this.depExports[e]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,S.startTime=(new 
Date).getTime();var e=this.map;if(!this.shim)return e.prefix?this.callPlugin():this.load();S.makeRequire
(this.map,{enableBuildCallback:!0})(this.shim.deps||[],t(this,function(){return e.prefix?this.callPlugin
():this.load()}))}},load:function(){var e=this.map.url;_[e]||(_[e]=!0,S.load(this.map.id,e))},check:function(
){if(this.enabled&&!this.enabling){var e,t,n=this.map.id;t=this.depExports;var r=this.exports,i=this.
factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){this.defining=!0
;if(1>this.depCount&&!this.defined){if(I(i)){if(this.events.error)try{r=S.execCb(n,i,t,r)}catch(s){e=
s}else r=S.execCb(n,i,t,r);this.map.isDefine&&((t=this.module)&&void 0!==t.exports&&t.exports!==this.
exports?r=t.exports:void 0===r&&this.usingExports&&(r=this.exports));if(e)return e.requireMap=this.map
,e.requireModules=[this.map.id],e.requireType="define",h(this.error=e)}else r=i;this.exports=r,this.map
.isDefine&&!this.ignore&&(M[n]=r,l.onResourceLoad)&&l.onResourceLoad(S,this.map,this.depMaps),delete 
k[n],this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.
emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var e=
this.map,s=e.id,o=a(e.prefix);this.depMaps.push(o),c(o,"defined",t(this,function(o){var u,p;p=this.map
.name;var d=this.map.parentMap?this.map.parentMap.name:null,v=S.makeRequire(e.parentMap,{enableBuildCallback
:!0});if(this.map.unnormalized){if(o.normalize&&(p=o.normalize(p,function(e){return n(e,d,!0)})||""),
o=a(e.prefix+"!"+p,this.map.parentMap),c(o,"defined",t(this,function(e){this.init([],function(){return e
},null,{enabled:!0,ignore:!0})})),p=i(k,o.id))this.depMaps.push(o),this.events.error&&p.on("error",t(
this,function(e){this.emit("error",e)})),p.enable()}else u=t(this,function(e){this.init([],function()
{return e},null,{enabled:!0})}),u.error=t(this,function(e){this.inited=!0,this.error=e,e.requireModules=
[s],E(k,function(e){0===e.map.id.indexOf(s+"_unnormalized")&&delete k[e.map.id]}),h(e)}),u.fromText=t
(this,function(t,n){var i=e.name,o=a(i),c=O;n&&(t=n),c&&(O=!1),f(o),r(C.config,s)&&(C.config[i]=C.config
[s]);try{l.exec(t)}catch(p){return h(F("fromtexteval","fromText eval for "+s+" failed: "+p,p,[s]))}c&&
(O=!0),this.depMaps.push(o),S.completeLoad(i),v([i],u)}),o.load(e.name,v,u,C)})),S.enable(o,this),this
.pluginMaps[o.id]=o},enable:function(){this.enabling=this.enabled=!0,x(this.depMaps,t(this,function(e
,n){var s,o;if("string"==typeof e){e=a(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap
),this.depMaps[n]=e;if(s=i(T,e.id)){this.depExports[n]=s(this);return}this.depCount+=1,c(e,"defined",
t(this,function(e){this.defineDep(n,e),this.check()})),this.errback&&c(e,"error",this.errback)}s=e.id
,o=k[s],!r(T,s)&&o&&!o.enabled&&S.enable(e,this)})),E(this.pluginMaps,t(this,function(e){var t=i(k,e.
id);t&&!t.enabled&&S.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var n=this.events
[e];n||(n=this.events[e]=[]),n.push(t)},emit:function(e,t){x(this.events[e],function(e){e(t)}),"error"===
e&&delete this.events[e]}},S={config:C,contextName:e,registry:k,defined:M,urlFetched:_,defQueue:A,Module
:w,makeModuleMap:a,nextTick:l.nextTick,configure:function(e){e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl
.length-1)&&(e.baseUrl+="/");var t=C.pkgs,n=C.shim,r={paths:!0,config:!0,map:!0};E(e,function(e,t){r[
t]?"map"===t?Q(C[t],e,!0,!0):Q(C[t],e,!0):C[t]=e}),e.shim&&(E(e.shim,function(e,t){J(e)&&(e={deps:e})
,(e.exports||e.init)&&!e.exportsFn&&(e.exportsFn=S.makeShimExports(e)),n[t]=e}),C.shim=n),e.packages&&
(x(e.packages,function(e){e="string"==typeof e?{name:e}:e,t[e.name]={name:e.name,location:e.location||
e.name,main:(e.main||"main").replace(ga,"").replace(aa,"")}}),C.pkgs=t),E(k,function(e,t){!e.inited&&!
e.map.unnormalized&&(e.map=a(t))}),(e.deps||e.callback)&&S.require(e.deps||[],e.callback)},makeShimExports
:function(e){return function(){var t;return e.init&&(t=e.init.apply(Y,arguments)),t||e.exports&&Z(e.exports
)}},makeRequire:function(t,s){function o(n,i,u){var c,p;return s.enableBuildCallback&&i&&I(i)&&(i.__requireJsBuild=!0
),"string"==typeof n?I(i)?h(F("requireargs","Invalid require call"),u):t&&r(T,n)?T[n](k[t.id]):l.get?
l.get(S,n,t):(c=a(n,t,!1,!0),c=c.id,r(M,c)?M[c]:h(F("notloaded",'Module name "'+c+'" has not been loaded yet for context: '+
e+(t?"":". Use require([])")))):(y(),S.nextTick(function(){y(),p=f(a(null,t)),p.skipMap=s.skipMap,p.init
(n,i,u,{enabled:!0}),v()}),o)}return s=s||{},Q(o,{isBrowser:z,toUrl:function(e){var r,i=e.lastIndexOf
("."),s=e.split("/")[0];return-1!==i&&("."!==s&&".."!==s||1<i)&&(r=e.substring(i,e.length),e=e.substring
(0,i)),e=S.nameToUrl(n(e,t&&t.id,!0),r||".fake"),r?e:e.substring(0,e.length-5)},defined:function(e){return r
(M,a(e,t,!1,!0).id)},specified:function(e){return e=a(e,t,!1,!0).id,r(M,e)||r(k,e)}}),t||(o.undef=function(
e){p();var n=a(e,t,!0),r=i(k,e);delete M[e],delete _[n.url],delete L[e],r&&(r.events.defined&&(L[e]=r
.events),delete k[e])}),o},enable:function(e){i(k,e.id)&&f(e).enable()},completeLoad:function(e){var t
,n,s=i(C.shim,e)||{},u=s.exports;for(p();A.length;){n=A.shift();if(null===n[0]){n[0]=e;if(t)break;t=!0
}else n[0]===e&&(t=!0);m(n)}n=i(k,e);if(!t&&!r(M,e)&&n&&!n.inited){if(C.enforceDefine&&(!u||!Z(u)))return o
(e)?void 0:h(F("nodefine","No define call for "+e,null,[e]));m([e,s.deps||[],s.exportsFn])}v()},nameToUrl
:function(e,t){var n,r,s,o,u,a;if(l.jsExtRegExp.test(e))o=e+(t||"");else{n=C.paths,r=C.pkgs,o=e.split
("/");for(u=o.length;0<u;u-=1){if(a=o.slice(0,u).join("/"),s=i(r,a),a=i(n,a)){J(a)&&(a=a[0]),o.splice
(0,u,a);break}if(s){n=e===s.name?s.location+"/"+s.main:s.location,o.splice(0,u,n);break}}o=o.join("/"
),o+=t||(/\?/.test(o)?"":".js"),o=("/"===o.charAt(0)||o.match(/^[\w\+\.\-]+:/)?"":C.baseUrl)+o}return C
.urlArgs?o+((-1===o.indexOf("?")?"?":"&")+C.urlArgs):o},load:function(e,t){l.load(S,e,t)},execCb:function(
e,t,n,r){return t.apply(r,n)},onScriptLoad:function(e){if("load"===e.type||ha.test((e.currentTarget||
e.srcElement).readyState))P=null,e=g(e),S.completeLoad(e.id)},onScriptError:function(e){var t=g(e);if(!
o(t.id))return h(F("scripterror","Script error",e,[t.id]))}},S.require=S.makeRequire(),S}var l,w,B,D,
s,H,P,K,ba,ca,ia=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,ja=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g
,aa=/\.js$/,ga=/^\.\//;w=Object.prototype;var L=w.toString,da=w.hasOwnProperty,fa=Array.prototype.splice
,z="undefined"!=typeof window&&!!navigator&&!!document,$=!z&&"undefined"!=typeof importScripts,ha=z&&"PLAYSTATION 3"===
navigator.platform?/^complete$/:/^(complete|loaded)$/,V="undefined"!=typeof opera&&"[object Opera]"===
opera.toString(),C={},q={},R=[],O=!1;if("undefined"==typeof define){if("undefined"!=typeof requirejs)
{if(I(requirejs))return;q=requirejs,requirejs=void 0}"undefined"!=typeof require&&!I(require)&&(q=require
,require=void 0),l=requirejs=function(e,t,n,r){var s,o="_";return!J(e)&&"string"!=typeof e&&(s=e,J(t)?
(e=t,t=n,n=r):e=[]),s&&s.context&&(o=s.context),(r=i(C,o))||(r=C[o]=l.s.newContext(o)),s&&r.configure
(s),r.require(e,t,n)},l.config=function(e){return l(e)},l.nextTick="undefined"!=typeof setTimeout?function(
e){setTimeout(e,4)}:function(e){e()},require||(require=l),l.version="2.1.4",l.jsExtRegExp=/^\/|:|\?|\.js$/
,l.isBrowser=z,w=l.s={contexts:C,newContext:ea},l({}),x(["toUrl","undef","defined","specified"],function(
e){l[e]=function(){var t=C._;return t.require[e].apply(t,arguments)}}),z&&(B=w.head=document.getElementsByTagName
("head")[0],D=document.getElementsByTagName("base")[0])&&(B=w.head=D.parentNode),l.onError=function(e
){throw e},l.load=function(e,t,n){var r=e&&e.config||{},i;if(z)return i=r.xhtml?document.createElementNS
("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script"),i.type=r.scriptType||"text/javascript"
,i.charset="utf-8",i.async=!0,i.setAttribute("data-requirecontext",e.contextName),i.setAttribute("data-requiremodule"
,t),i.attachEvent&&!(i.attachEvent.toString&&0>i.attachEvent.toString().indexOf("[native code"))&&!V?
(O=!0,i.attachEvent("onreadystatechange",e.onScriptLoad)):(i.addEventListener("load",e.onScriptLoad,!1
),i.addEventListener("error",e.onScriptError,!1)),i.src=n,K=i,D?B.insertBefore(i,D):B.appendChild(i),
K=null,i;$&&(importScripts(n),e.completeLoad(t))},z&&M(document.getElementsByTagName("script"),function(
e){B||(B=e.parentNode);if(s=e.getAttribute("data-main"))return q.baseUrl||(H=s.split("/"),ba=H.pop(),
ca=H.length?H.join("/")+"/":"./",q.baseUrl=ca,s=ba),s=s.replace(aa,""),q.deps=q.deps?q.deps.concat(s)
:[s],!0}),define=function(e,t,n){var r,i;"string"!=typeof e&&(n=t,t=e,e=null),J(t)||(n=t,t=[]),!t.length&&
I(n)&&n.length&&(n.toString().replace(ia,"").replace(ja,function(e,n){t.push(n)}),t=(1===n.length?["require"
]:["require","exports","module"]).concat(t)),O&&((r=K)||(P&&"interactive"===P.readyState||M(document.
getElementsByTagName("script"),function(e){if("interactive"===e.readyState)return P=e}),r=P),r&&(e||(
e=r.getAttribute("data-requiremodule")),i=C[r.getAttribute("data-requirecontext")])),(i?i.defQueue:R)
.push([e,t,n])},define.amd={jQuery:!0},l.exec=function(b){return eval(b)},l(q)}})(this);// keymage.js - Javascript keyboard event handling
// http://github.com/piranha/keymage
//
// (c) 2012 Alexander Solovyov
// under terms of ISC License

/**
 * @license RequireJS text 2.0.5 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

/* Copyright (c) 2010-2012 Marcus Westin
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function(e,t){e("keyboard",[],function(){function h(e){var t=e.split("-"),r=t[t.length-1],i={code:s[
r]};if(!i.code)throw'Unknown key "'+r+'" in keystring "'+e+'"';var o;for(var u=0;u<t.length-1;u++){r=
t[u],o=n[r];if(!o)throw'Unknown modifier "'+r+'" in keystring "'+e+'"';i[o]=!0}return i}function p(e)
{var t="";for(var n=0;n<r.length;n++)e[r[n]]&&(t+=r[n]+"-");return t+=u[e.code],t}function d(e){var t=
[],n=e.split(" ");for(var r=0;r<n.length;r++){var i=h(n[r]);i=p(i),t.push(i)}return t.original=e,t}function v
(t){var n={code:t.keyCode};for(var r=0;r<e.length;r++){var i=e[r];t[i]&&(n[i.slice(0,i.length-3)]=!0)
}return p(n)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r&&(e=e[r]);if(!e)break}return e}
function y(e){if(~i.indexOf(e.keyCode))return;var t=g.slice();t.push(v(e));var n=l.split("."),r,s,o;for(
var u=n.length;u>=0;u--){s=m(c,n.slice(0,u));if(!s)continue;r=!0;for(var a=0;a<t.length;a++){o=t[a];if(!
s[o]){r=!1;break}s=s[o]}if(r)break}var f=n.slice(0,u).join("."),h=s.preventDefault;if(r&&!s.handlers)
{g=t,h&&e.preventDefault();return}if(r)for(u=0;u<s.handlers.length;u++){var p=s.handlers[u],d=p._keymage
,y=p.call(d.context,e,{shortcut:d.original,scope:l,definitionScope:f});(y===!1||h)&&e.preventDefault(
)}g=[]}function b(e,t,n){var r=e.split("."),i=c;r=r.concat(t);for(var s=0,o=r.length;s<o;s++){var u=r
[s];if(!u)continue;i=i[u]||(i[u]={}),n._keymage.preventDefault&&(i.preventDefault=!0);if(s===o-1){var a=
i.handlers||(i.handlers=[]);a.push(n)}}}function w(e,n,r,i){if(n===t&&r===t)return function(t,n){return w
(e,t,n)};typeof n=="function"&&(i=r,r=n,n=e,e="");var s=d(n);r._keymage=i||{},r._keymage.original=n,b
(e,s,r)}var e=["shiftKey","ctrlKey","altKey","metaKey"],n={shift:"shift",ctrl:"ctrl",control:"ctrl",alt
:"alt",option:"alt",win:"meta",cmd:"meta","super":"meta",meta:"meta",defmod:~navigator.userAgent.indexOf
("Mac OS X")?"meta":"ctrl"},r=["shift","ctrl","alt","meta"],i=[16,17,18,91],s={backspace:8,tab:9,enter
:13,"return":13,pause:19,caps:20,capslock:20,escape:27,esc:27,space:32,pgup:33,pageup:33,pgdown:34,pagedown
:34,end:35,home:36,ins:45,insert:45,del:46,"delete":46,left:37,up:38,right:39,down:40,"*":106,"+":107
,plus:107,"-":109,minus:109,";":186,"=":187,",":188,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'"
:222},o;for(o=0;o<10;o++)s["num-"+o]=o+95;for(o=0;o<10;o++)s[o.toString()]=o+48;for(o=1;o<25;o++)s["f"+
o]=o+111;for(o=65;o<91;o++)s[String.fromCharCode(o).toLowerCase()]=o;var u={};for(var a in s){var f=s
[a];if(!u[f]||u[f].length<a.length)u[f]=a}var l="",c={},g=[];return w.parse=h,w.stringify=p,w.bindings=
c,w.setScope=function(e){l=e?e:""},w.getScope=function(){return l},w.pushScope=function(e){return l=(
l?l+".":"")+e,l},w.popScope=function(e){var t;return e?(l=l.replace(new RegExp("(^|\\.)"+e+"(\\.|$).*"
),""),e):(t=l.lastIndexOf("."),e=l.slice(t+1),l=l.slice(0,t),e)},window.addEventListener("keydown",y,!1
),w})})(typeof define!="undefined"?define:function(e){window.keymage=e()}),define("editor",["module","keyboard"
],function(e,t){var n=CodeMirror.fromTextArea(document.getElementById("code"),{mode:"markdown",lineNumbers
:!0,theme:"solarized dark",viewportMargin:40,lineWrapping:!0,autofocus:!0,extraKeys:{Enter:"newlineAndIndentContinueMarkdownList"
}});t("super-ctrl-l",function(){alert("")}),t("shift-ctrl-v",function(){var e=n.getOption("keyMap");alert
(e),n.setOption(e=="vim"?"":"vim")}),e.exports=n}),define("viewer",["module"],function(e){var t=$("#haroo iframe"
).contents().find("body");e.exports={update:function(e){t.html(e)}}}),define("html",["module"],function(
e){var t,n,r=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],i=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im
,s=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,o=typeof location!="undefined"&&location.href,u=o&&location
.protocol&&location.protocol.replace(/\:/,""),a=o&&location.hostname,f=o&&(location.port||undefined),
l=[],c=e.config&&e.config()||{};t={version:"2.0.5",strip:function(e){if(e){e=e.replace(i,"");var t=e.
match(s);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace
(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r"
).replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:c.createXhr||function(){var e
,t,n;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;if(typeof ActiveXObject!="undefined"
)for(t=0;t<3;t+=1){n=r[t];try{e=new ActiveXObject(n)}catch(i){}if(e){r=[n];break}}return e},parseName
:function(e){var t,n,r,i=!1,s=e.indexOf("."),o=e.indexOf("./")===0||e.indexOf("../")===0;return s!==-1&&
(!o||s>1)?(t=e.substring(0,s),n=e.substring(s+1,e.length)):t=e,r=n||t,s=r.indexOf("!"),s!==-1&&(i=r.substring
(s+1)==="strip",r=r.substring(0,s),n?n=r:t=r),{moduleName:t,ext:n,strip:i}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/
,useXhr:function(e,n,r,i){var s,o,u,a=t.xdRegExp.exec(e);return a?(s=a[2],o=a[3],o=o.split(":"),u=o[1
],o=o[0],(!s||s===n)&&(!o||o.toLowerCase()===r.toLowerCase())&&(!u&&!o||u===i)):!0},finishLoad:function(
e,n,r,i){r=n?t.strip(r):r,c.isBuild&&(l[e]=r),i(r)},load:function(e,n,r,i){if(i.isBuild&&!i.inlineText
){r();return}c.isBuild=i.isBuild;var s=t.parseName(e),l=s.moduleName+(s.ext?"."+s.ext:""),h=n.toUrl(l
),p=c.useXhr||t.useXhr;!o||p(h,u,a,f)?t.get(h,function(n){t.finishLoad(e,s.strip,n,r)},function(e){r.
error&&r.error(e)}):n([l],function(e){t.finishLoad(s.moduleName+"."+s.ext,s.strip,e,r)})},write:function(
e,n,r,i){if(l.hasOwnProperty(n)){var s=t.jsEscape(l[n]);r.asModule(e+"!"+n,"define(function () { return '"+
s+"';});\n")}},writeFile:function(e,n,r,i,s){var o=t.parseName(n),u=o.ext?"."+o.ext:"",a=o.moduleName+
u,f=r.toUrl(o.moduleName+u)+".js";t.load(a,r,function(n){var r=function(e){return i(f,e)};r.asModule=
function(e,t){return i.asModule(e,f,t)},t.write(e,a,r,s)},s)}};if(c.env==="node"||!c.env&&typeof process!="undefined"&&
process.versions&&!!process.versions.node)n=require.nodeRequire("fs"),t.get=function(e,t){var r=n.readFileSync
(e,"utf8");r.indexOf("﻿")===0&&(r=r.substring(1)),t(r)};else if(c.env==="xhr"||!c.env&&t.createXhr())
t.get=function(e,n,r,i){var s=t.createXhr(),o;s.open("GET",e,!0);if(i)for(o in i)i.hasOwnProperty(o)&&
s.setRequestHeader(o.toLowerCase(),i[o]);c.onXhr&&c.onXhr(s,e),s.onreadystatechange=function(t){var i
,o;s.readyState===4&&(i=s.status,i>399&&i<600?(o=new Error(e+" HTTP status: "+i),o.xhr=s,r(o)):n(s.responseText
))},s.send(null)};else if(c.env==="rhino"||!c.env&&typeof Packages!="undefined"&&typeof java!="undefined"
)t.get=function(e,t){var n,r,i="utf-8",s=new java.io.File(e),o=java.lang.System.getProperty("line.separator"
),u=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),i)),a="";
try{n=new java.lang.StringBuffer,r=u.readLine(),r&&r.length()&&r.charAt(0)===65279&&(r=r.substring(1)
),n.append(r);while((r=u.readLine())!==null)n.append(o),n.append(r);a=String(n.toString())}finally{u.
close()}t(a)};return t}),define("html!tpl/file.html",[],function(){return'<input class="hide" id="openFile" type="file" />\n<input class="hide" id="saveFile" type="file" nwsaveas />\n'
}),function(){function o(){try{return r in t&&t[r]}catch(e){return!1}}var e={},t=window,n=t.document,
r="localStorage",i="__storejs__",s;e.disabled=!1,e.set=function(e,t){},e.get=function(e){},e.remove=function(
e){},e.clear=function(){},e.transact=function(t,n,r){var i=e.get(t);r==null&&(r=n,n=null),typeof i=="undefined"&&
(i=n||{}),r(i),e.set(t,i)},e.getAll=function(){},e.serialize=function(e){return JSON.stringify(e)},e.
deserialize=function(e){if(typeof e!="string")return undefined;try{return JSON.parse(e)}catch(t){return e||
undefined}};if(o())s=t[r],e.set=function(t,n){return n===undefined?e.remove(t):(s.setItem(t,e.serialize
(n)),n)},e.get=function(t){return e.deserialize(s.getItem(t))},e.remove=function(e){s.removeItem(e)},
e.clear=function(){s.clear()},e.getAll=function(){var t={};for(var n=0;n<s.length;++n){var r=s.key(n)
;t[r]=e.get(r)}return t};else if(n.documentElement.addBehavior){var u,a;try{a=new ActiveXObject("htmlfile"
),a.open(),a.write('<script>document.w=window</script><iframe src="/favicon.ico"></frame>'),a.close()
,u=a.w.frames[0].document,s=u.createElement("div")}catch(f){s=n.createElement("div"),u=n.body}function l
(t){return function(){var n=Array.prototype.slice.call(arguments,0);n.unshift(s),u.appendChild(s),s.addBehavior
("#default#userData"),s.load(r);var i=t.apply(e,n);return u.removeChild(s),i}}var c=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]"
,"g");function h(e){return e.replace(c,"___")}e.set=l(function(t,n,i){return n=h(n),i===undefined?e.remove
(n):(t.setAttribute(n,e.serialize(i)),t.save(r),i)}),e.get=l(function(t,n){return n=h(n),e.deserialize
(t.getAttribute(n))}),e.remove=l(function(e,t){t=h(t),e.removeAttribute(t),e.save(r)}),e.clear=l(function(
e){var t=e.XMLDocument.documentElement.attributes;e.load(r);for(var n=0,i;i=t[n];n++)e.removeAttribute
(i.name);e.save(r)}),e.getAll=l(function(t){var n=t.XMLDocument.documentElement.attributes;t.load(r);
var i={};for(var s=0,o;o=n[s];++s)i[o]=e.get(o);return i})}try{e.set(i,i),e.get(i)!=i&&(e.disabled=!0
),e.remove(i)}catch(f){e.disabled=!0}e.enabled=!e.disabled,typeof module!="undefined"&&typeof module!="function"?
module.exports=e:typeof define=="function"&&define.amd?define("store",e):this.store=e}(),define("file/Recents"
,["module","store"],function(e,t){var n=t.get("recents")||[];e.exports={push:function(e){n=[e].concat
(n),n=_.uniq(n),t.set("recents",n)},get:function(e){return _.first(e,5)},clear:function(e){e=[],t.remove
("recents")}}}),define("file/File",["module","html!tpl/file.html","keyboard","editor","file/Recents"]
,function(e,t,n,r,i){function f(){$("#openFile").trigger("click")}function l(){if(u){view.save(u);return}
$("#saveFile").trigger("click")}function c(){var e=window.screenX+10,t=window.screenY+10;window.open("pad.html"
,"_blank","screenX="+e+",screenY="+t)}var s=require("fs"),o=!1,u,a;$("#fields").append(t);var h=Backbone
.View.extend({el:"#fields",events:{"change #saveFile":"saveHandler","change #openFile":"openHandler"}
,initialize:function(){n("super-o",f),n("super-s",l),n("super-n",c)},saveHandler:function(e){u=$(e.target
).val(),this.save(u)},openHandler:function(e){u=$(e.target).val();if(!u)return;a=s.readFileSync(u,"utf8"
),i.push(u),r.setValue(a)},save:function(e){s.writeFileSync(u,r.getValue(),"utf8")}});e.exports=view=new 
h}),define("html!tpl/preferences.html",[],function(){return'<div class="modal container hide fade _preferences" tabindex="-1">\n  <div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\n    <h3><i class="icon-cog"></i> Preferences</h3>\n  </div>\n  <div class="modal-body">\n    <div class="tabbable tabs-left"> <!-- Only required for left/right tabs -->\n      <ul class="nav nav-tabs">\n        <li class="active"><a href="#tab1" data-toggle="tab">default</a></li>\n        <li><a href="#tab2" data-toggle="tab">editor</a></li>\n        <li><a href="#tab2" data-toggle="tab">viewer</a></li>\n        <li><a href="#tab3" data-toggle="tab">export</a></li>\n      </ul>\n      <div class="tab-content">\n        <div class="tab-pane active" id="tab1">\n          <p>Howdy, I\'m in Section 2.</p>\n        </div>\n        <div class="tab-pane" id="tab2">\n          <p>Howdy, I\'m in Section 2.</p>\n        </div>\n        <div class="tab-pane" id="tab3">\n          <p>Howdy, I\'m in Section 2.</p>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="modal-footer">\n    <button type="button" data-dismiss="modal" class="btn">Close</button>\n    <button type="button" class="btn btn-primary">Save changes</button>\n  </div>\n</div>'
}),define("preferences/Preferences",["module","html!tpl/preferences.html","keyboard"],function(e,t,n)
{$("#dialogs").append(t);var r=Backbone.View.extend({initialize:function(){n("super-,",function(e){$("._preferences"
).modal("show")})},clickHandler:function(){}});e.exports=new r}),requirejs.config({baseUrl:"js/app",waitSeconds
:30,locale:"ko-kr",paths:{tpl:"../../tpl",vendors:"../vendors",editor:"editor/Editor",viewer:"viewer/Viewer"
,html:"../vendors/text",store:"../vendors/store",keyboard:"../vendors/keymage"},config:{text:{env:"xhr"
}},urlArgs:"v0.1.0"}),requirejs.onError=function(e){alert("requireJS Error raised, check the console"
),console.log(e)},requirejs(["editor","viewer","file/File","preferences/Preferences"],function(e,t,n)
{function i(){r=marked(e.getValue()),t.update(r)}var r;marked.setOptions({gfm:!0,tables:!0,breaks:!1,
pedantic:!1,sanitize:!0,smartLists:!0,langPrefix:"",highlight:function(e,t){var n;if(!t)return e;switch(
t){case"js":t="javascript"}try{n=hljs.highlight(t,e).value}catch(r){}finally{return n||e}}}),e.on("change"
,i)}),define("main",function(){});