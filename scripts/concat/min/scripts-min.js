var testingVar = {

//	
	
	intialize: function() {
	variableThing = document.getElementById('main-header-nameplate');

	this.initListeners();
		
		return this
	
	},
	
	initListeners: function (){
	var self = this;
	
		console.log('vax' + variableThing);

		variableThing.addEventListener("click", self.doStuff);

//function myFunction() {
  //  alert ("Hello World!");
//}

	},
	
	
	doStuff: function() {
	
		console.log('yo!');
	}
	
	};



(function() {


testingVar.intialize();



// this adds the links to the items in the footer
function addLink (target, link) {
	orgHtml = document.getElementById(target).innerHTML;
	newHtml = link + orgHtml + "</a>";
	document.getElementById(target).innerHTML = newHtml;
}

linkCounter = 0;
links = ['email-link', 'twitter-link', 'facebook-link'];
urls = ['<a href="mailto:david@davidputney.com?Subject=Website%20feedback" target="_top">', '<a href="https://twitter.com/putneydm">', '<a href="https://www.facebook.com/david.putney">']
		
while (linkCounter < links.length) {   	
	addLink (links[linkCounter], urls[linkCounter])
	linkCounter++;
}

// this swaps out the hero image for a higher res version on page load
var window_width = window.innerWidth; // finds width of browser window
var getPageType = document.getElementsByTagName('Body')[0];
var pageType = getPageType.getAttribute('data-pagetype');//reads page type data off body tag
	getImage = document.getElementById('hero-image');
	image = getImage.getAttribute('data-image');	//reads name of hero image off data tag on hero image tag
		console.log(getImage);
			console.log('works');

function set_background(image) {
	if (pageType === 'index-page' && window_width < 700) {
		image_url = 'siteart/med_hero_' + image + '.jpg';	
		}
	if (pageType === 'index-page' && window_width > 700 && window_width < 5000) {
		image_url = 'siteart/hero_' + image + '.jpg';
		}
	if (pageType === 'section-page' && window_width < 700) {
		var image_url = '../siteart/med_hero_' + image + '.jpg';	
		}	
	if (pageType === 'section-page' && window_width > 700 && window_width < 5000) {
		 image_url = '../siteart/hero_' + image + '.jpg';
		}

	if (pageType === 'portfolio-page' && window_width < 700) {
		image_url = '../../siteart/med_hero_' + image + '.jpg';	
		}	
	if (pageType === 'portfolio-page' && window_width > 700 && window_width < 5000) {
		image_url = '../../siteart/hero_' + image + '.jpg';
		}
		var img = new Image();
		img.onload = function(){
		document.getElementById('hero-image').style.backgroundImage = 'url('+image_url+')';		  
		};
		img.src = image_url; 
		}	
set_background(image)	// sets background image

// this does the nameplate animations on load
var nameplate = document.getElementById('main-header-nameplate');
var navigation = document.getElementById('navigation-menu');
var heroImage = document.getElementById('hero-image');
var siteSubhead = document.getElementById('main-subhead');

function nameplateAnimate(nameplate, navigation, heroImage, siteSubhead) {		
		if (nameplate !== null)	{
		nameplate.classList.add('main-header-nameplate-active');
		navigation.classList.add('navigation-menu-active');
		siteSubhead.classList.toggle('triple-module-head-active');
		}
		if (heroImage !== null)	{
		heroImage.classList.remove('filter-me');
		}		
	}

nameplateAnimate(nameplate, navigation, heroImage, siteSubhead); // animates nameplate on load

// animates scroll to top with the scroll to top button on mobile	
document.getElementById('scroll-to-top').onclick = function () {
    scrollTo(document.body, 0, 500);   
}
function scrollTo(element, to, duration) {
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

    var animateScroll = function(){        
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);                        
        element.scrollTop = val; 
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}
//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};	

var menuId = document.getElementById('inside-header');		
var menu_height = menuId.clientHeight;			            
var menuButton = document.getElementById('menu-button');
var menuIcon = menuButton.getElementsByClassName('icon')[0];
var menuText = menuButton.getElementsByTagName('SPAN')[0];
	menuButton.addEventListener("click", expandMenu);
	menuButton.getElementsByTagName('A')[0].addEventListener("click", function(e){
    	e.preventDefault()
	});

function expandMenu() { 	 	
 	menuText.classList.toggle('button-active');
  	menuIcon.classList.toggle('button-active');
 if (menu_height < 51) {
 	 menuId.classList.toggle("menu-active");
	}	
 else {
 	menuId.classList.toggle("menu-active");
	}	
} 

var getHeroHeight = document.getElementById("main")
var heroHeight = getHeroHeight.offsetTop - 190;	
var scrollButton = document.getElementById('scroll-to-top');
	heroTarget = image;
	fadeCounter = 0;
	activeCounter = 0;
	scrollTopCounter = 0;

function scroll_up (document_top) {	
	if (document_top > 300 && window_width < 900 && scrollTopCounter === 0) {
	scrollButton.classList.toggle('scroll-to-top-active');
	scrollTopCounter = 1;
	}
	
	if (document_top < 300 && scrollTopCounter === 1) {
	scrollButton.classList.toggle('scroll-to-top-active');
	scrollTopCounter = 0;
	}						
} 

var targetHeader = document.getElementById('inside-header');
var targetImage = document.getElementById('hero-image');
		
function scrollChange(scroll_position) {	
	if (heroHeight < scroll_position + 80 && activeCounter === 0) {
		targetHeader.classList.toggle("inside-header-ready");
		activeCounter = 1;
	}	
	if (heroHeight > scroll_position + 80 && activeCounter === 1) {
		targetHeader.classList.toggle("inside-header-ready");	
		activeCounter = 0;
	}	
	if (heroHeight - 160 < scroll_position && fadeCounter === 0) {
		targetImage.classList.toggle("hero-fadeout");
		targetHeader.classList.toggle('inside-header-active');
		fadeCounter = 1;	
	}		
	if (heroHeight > scroll_position && fadeCounter === 1) {
		targetImage.classList.toggle('hero-fadeout');
		targetHeader.classList.toggle("inside-header-active");
		fadeCounter = 0;	
	}		
}	





window.onscroll = function () {
	var scroll_position = window.scrollY;
	scrollChange(scroll_position)
	scroll_up (scroll_position)
}
})();

/*
$(window) .resize (function () {		
	$('#secondary-header, #inside-header') .removeClass ('menu-active');
	$('.button_hidden') .hide ();
	$('.button_visible') .show ();
	});
	
*/	


window.Modernizr=function(e,t,n){function r(e){g.cssText=e}function o(e,t){return r(b.join(e+";")+(t||""))}function i(e,t){return typeof e===t}function a(e,t){return!!~(""+e).indexOf(t)}function c(e,t){for(var r in e){var o=e[r];if(!a(o,"-")&&g[o]!==n)return"pfx"==t?o:!0}return!1}function l(e,t,r){for(var o in e){var a=t[e[o]];if(a!==n)return r===!1?e[o]:i(a,"function")?a.bind(r||t):a}return!1}function s(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),o=(e+" "+j.join(r+" ")+r).split(" ");return i(t,"string")||i(t,"undefined")?c(o,t):(o=(e+" "+w.join(r+" ")+r).split(" "),l(o,t,n))}var u="2.8.3",f={},d=!0,p=t.documentElement,m="modernizr",h=t.createElement(m),g=h.style,v,y={}.toString,b=" -webkit- -moz- -o- -ms- ".split(" "),E="Webkit Moz O ms",j=E.split(" "),w=E.toLowerCase().split(" "),S={svg:"http://www.w3.org/2000/svg"},C={},k={},x={},N=[],F=N.slice,O,M={}.hasOwnProperty,T;T=i(M,"undefined")||i(M.call,"undefined")?function(e,t){return t in e&&i(e.constructor.prototype[t],"undefined")}:function(e,t){return M.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=F.call(arguments,1),r=function(){if(this instanceof r){var o=function(){};o.prototype=t.prototype;var i=new o,a=t.apply(i,n.concat(F.call(arguments)));return Object(a)===a?a:i}return t.apply(e,n.concat(F.call(arguments)))};return r}),C.multiplebgs=function(){return r("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(g.background)},C.backgroundsize=function(){return s("backgroundSize")},C.borderradius=function(){return s("borderRadius")},C.cssgradients=function(){var e="background-image:",t="gradient(linear,left top,right bottom,from(#9f9),to(white));",n="linear-gradient(left top,#9f9, white);";return r((e+"-webkit- ".split(" ").join(t+e)+b.join(n+e)).slice(0,-e.length)),a(g.backgroundImage,"gradient")},C.svg=function(){return!!t.createElementNS&&!!t.createElementNS(S.svg,"svg").createSVGRect};for(var z in C)T(C,z)&&(O=z.toLowerCase(),f[O]=C[z](),N.push((f[O]?"":"no-")+O));return f.addTest=function(e,t){if("object"==typeof e)for(var r in e)T(e,r)&&f.addTest(r,e[r]);else{if(e=e.toLowerCase(),f[e]!==n)return f;t="function"==typeof t?t():t,"undefined"!=typeof d&&d&&(p.className+=" "+(t?"":"no-")+e),f[e]=t}return f},r(""),h=v=null,function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=y.elements;return"string"==typeof e?e.split(" "):e}function o(e){var t=g[e[m]];return t||(t={},h++,e[m]=h,g[h]=t),t}function i(e,n,r){if(n||(n=t),v)return n.createElement(e);r||(r=o(n));var i;return i=r.cache[e]?r.cache[e].cloneNode():d.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!i.canHaveChildren||f.test(e)||i.tagUrn?i:r.frag.appendChild(i)}function a(e,n){if(e||(e=t),v)return e.createDocumentFragment();n=n||o(e);for(var i=n.frag.cloneNode(),a=0,c=r(),l=c.length;l>a;a++)i.createElement(c[a]);return i}function c(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return y.shivMethods?i(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(y,t.frag)}function l(e){e||(e=t);var r=o(e);return y.shivCSS&&!p&&!r.hasCSS&&(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),v||c(e,r),e}var s="3.7.0",u=e.html5||{},f=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,d=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,p,m="_html5shiv",h=0,g={},v;!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",p="hidden"in e,v=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){p=!0,v=!0}}();var y={elements:u.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:s,shivCSS:u.shivCSS!==!1,supportsUnknownElements:v,shivMethods:u.shivMethods!==!1,type:"default",shivDocument:l,createElement:i,createDocumentFragment:a};e.html5=y,l(t)}(this,t),f._version=u,f._prefixes=b,f._domPrefixes=w,f._cssomPrefixes=j,f.testProp=function(e){return c([e])},f.testAllProps=s,p.className=p.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(d?" js "+N.join(" "):""),f}(this,this.document),function(e,t,n){function r(e){return"[object Function]"==m.call(e)}function o(e){return"string"==typeof e}function i(){}function a(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function c(){var e=h.shift();g=1,e?e.t?d(function(){("c"==e.t?N.injectCss:N.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),c()):g=0}function l(e,n,r,o,i,l,s){function u(t){if(!m&&a(f.readyState)&&(E.r=m=1,!g&&c(),f.onload=f.onreadystatechange=null,t)){"img"!=e&&d(function(){b.removeChild(f)},50);for(var r in C[n])C[n].hasOwnProperty(r)&&C[n][r].onload()}}var s=s||N.errorTimeout,f=t.createElement(e),m=0,v=0,E={t:r,s:n,e:i,a:l,x:s};1===C[n]&&(v=1,C[n]=[]),"object"==e?f.data=n:(f.src=n,f.type=e),f.width=f.height="0",f.onerror=f.onload=f.onreadystatechange=function(){u.call(this,v)},h.splice(o,0,E),"img"!=e&&(v||2===C[n]?(b.insertBefore(f,y?null:p),d(u,s)):C[n].push(f))}function s(e,t,n,r,i){return g=0,t=t||"j",o(e)?l("c"==t?j:E,e,t,this.i++,n,r,i):(h.splice(this.i++,0,e),1==h.length&&c()),this}function u(){var e=N;return e.loader={load:s,i:0},e}var f=t.documentElement,d=e.setTimeout,p=t.getElementsByTagName("script")[0],m={}.toString,h=[],g=0,v="MozAppearance"in f.style,y=v&&!!t.createRange().compareNode,b=y?f:p.parentNode,f=e.opera&&"[object Opera]"==m.call(e.opera),f=!!t.attachEvent&&!f,E=v?"object":f?"script":"img",j=f?"script":E,w=Array.isArray||function(e){return"[object Array]"==m.call(e)},S=[],C={},k={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}},x,N;N=function(e){function t(e){var e=e.split("!"),t=S.length,n=e.pop(),r=e.length,n={url:n,origUrl:n,prefixes:e},o,i,a;for(i=0;r>i;i++)a=e[i].split("="),(o=k[a.shift()])&&(n=o(n,a));for(i=0;t>i;i++)n=S[i](n);return n}function a(e,o,i,a,c){var l=t(e),s=l.autoCallback;l.url.split(".").pop().split("?").shift(),l.bypass||(o&&(o=r(o)?o:o[e]||o[a]||o[e.split("/").pop().split("?")[0]]),l.instead?l.instead(e,o,i,a,c):(C[l.url]?l.noexec=!0:C[l.url]=1,i.load(l.url,l.forceCSS||!l.forceJS&&"css"==l.url.split(".").pop().split("?").shift()?"c":n,l.noexec,l.attrs,l.timeout),(r(o)||r(s))&&i.load(function(){u(),o&&o(l.origUrl,c,a),s&&s(l.origUrl,c,a),C[l.url]=2})))}function c(e,t){function n(e,n){if(e){if(o(e))n||(s=function(){var e=[].slice.call(arguments);u.apply(this,e),f()}),a(e,s,t,0,c);else if(Object(e)===e)for(p in d=function(){var t=0,n;for(n in e)e.hasOwnProperty(n)&&t++;return t}(),e)e.hasOwnProperty(p)&&(!n&&!--d&&(r(s)?s=function(){var e=[].slice.call(arguments);u.apply(this,e),f()}:s[p]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),f()}}(u[p])),a(e[p],s,t,p,c))}else!n&&f()}var c=!!e.test,l=e.load||e.both,s=e.callback||i,u=s,f=e.complete||i,d,p;n(c?e.yep:e.nope,!!l),l&&n(l)}var l,s,f=this.yepnope.loader;if(o(e))a(e,0,f,0);else if(w(e))for(l=0;l<e.length;l++)s=e[l],o(s)?a(s,0,f,0):w(s)?N(s):Object(s)===s&&c(s,f);else Object(e)===e&&c(e,f)},N.addPrefix=function(e,t){k[e]=t},N.addFilter=function(e){S.push(e)},N.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",x=function(){t.removeEventListener("DOMContentLoaded",x,0),t.readyState="complete"},0)),e.yepnope=u(),e.yepnope.executeStack=c,e.yepnope.injectJs=function(e,n,r,o,l,s){var u=t.createElement("script"),f,m,o=o||N.errorTimeout;u.src=e;for(m in r)u.setAttribute(m,r[m]);n=s?c:n||i,u.onreadystatechange=u.onload=function(){!f&&a(u.readyState)&&(f=1,n(),u.onload=u.onreadystatechange=null)},d(function(){f||(f=1,n(1))},o),l?u.onload():p.parentNode.insertBefore(u,p)},e.yepnope.injectCss=function(e,n,r,o,a,l){var o=t.createElement("link"),s,n=l?c:n||i;o.href=e,o.rel="stylesheet",o.type="text/css";for(s in r)o.setAttribute(s,r[s]);a||(p.parentNode.insertBefore(o,p),d(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/*! Picturefill - v2.0.0-beta - 2014-05-02
* http://scottjehl.github.io/picturefill
* Copyright (c) 2014 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT */
window.matchMedia||(window.matchMedia=function(){"use strict";var a=window.styleMedia||window.media;if(!a){var b=document.createElement("style"),c=document.getElementsByTagName("script")[0],d=null;b.type="text/css",b.id="matchmediajs-test",c.parentNode.insertBefore(b,c),d="getComputedStyle"in window&&window.getComputedStyle(b,null)||b.currentStyle,a={matchMedium:function(a){var c="@media "+a+"{ #matchmediajs-test { width: 1px; } }";return b.styleSheet?b.styleSheet.cssText=c:b.textContent=c,"1px"===d.width}}}return function(b){return{matches:a.matchMedium(b||"all"),media:b||"all"}}}()),function(a,b){"use strict";function c(a){var b,c,d,f,g,h;a=a||{},b=a.elements||e.getAllElements();for(var i=0,j=b.length;j>i;i++)if(c=b[i],d=c.nodeName.toUpperCase(),f=void 0,g=void 0,h=void 0,c[e.ns]||(c[e.ns]={}),a.reevaluate||!c[e.ns].evaluated){if("PICTURE"===d){if(e.removeVideoShim(c),f=e.getMatch(c),f===!1)continue;h=c.getElementsByTagName("img")[0]}else f=void 0,h=c;h&&(h[e.ns]||(h[e.ns]={}),h.srcset&&("PICTURE"===d||h.getAttribute("sizes"))&&e.dodgeSrcset(h),f?(g=e.processSourceSet(f),e.applyBestCandidate(g,h)):(g=e.processSourceSet(h),(void 0===h.srcset||h.getAttribute("sizes"))&&e.applyBestCandidate(g,h)),c[e.ns].evaluated=!0)}}function d(){c();var d=setInterval(function(){return a.picturefill(),/^loaded|^i|^c/.test(b.readyState)?void clearInterval(d):void 0},250);if(a.addEventListener){var e;a.addEventListener("resize",function(){a.clearTimeout(e),e=a.setTimeout(function(){c({reevaluate:!0})},60)},!1)}}if(!a.HTMLPictureElement){b.createElement("picture");var e={};e.ns="picturefill",e.srcsetSupported=void 0!==(new a.Image).srcset,e.trim=function(a){return a.trim?a.trim():a.replace(/^\s+|\s+$/g,"")},e.endsWith=function(a,b){return a.endsWith?a.endsWith(b):-1!==a.indexOf(b,a.length-b.length)},e.matchesMedia=function(b){return a.matchMedia&&a.matchMedia(b).matches},e.getDpr=function(){return a.devicePixelRatio||1},e.getWidthFromLength=function(a){return a=a&&parseFloat(a)>0?a:"100vw",a=a.replace("vw","%"),e.lengthEl||(e.lengthEl=b.createElement("div"),b.documentElement.insertBefore(e.lengthEl,b.documentElement.firstChild)),e.lengthEl.style.cssText="position: absolute; left: 0; width: "+a+";",e.lengthEl.offsetWidth},e.types={},e.types["image/svg+xml"]=b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),e.types["image/webp"]=function(){var b=new a.Image,d="image/webp";b.onerror=function(){e.types[d]=!1,c()},b.onload=function(){e.types[d]=1===b.width,c()},b.src="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="},e.verifyTypeSupport=function(a){var b=a.getAttribute("type");return null===b||""===b?!0:"function"==typeof e.types[b]?(e.types[b](),"pending"):e.types[b]},e.parseSize=function(a){var b=/(\([^)]+\))?\s*(.+)/g.exec(a);return{media:b&&b[1],length:b&&b[2]}},e.findWidthFromSourceSize=function(a){for(var b,c=e.trim(a).split(/\s*,\s*/),d=0,f=c.length;f>d;d++){var g=c[d],h=e.parseSize(g),i=h.length,j=h.media;if(i&&(!j||e.matchesMedia(j))){b=i;break}}return e.getWidthFromLength(b)},e.getCandidatesFromSourceSet=function(a,b){for(var c=e.trim(a).split(/,\s+/),d=b?e.findWidthFromSourceSize(b):"100%",f=[],g=0,h=c.length;h>g;g++){var i,j=c[g],k=j.split(/\s+/),l=k[1];!l||"w"!==l.slice(-1)&&"x"!==l.slice(-1)||(l=l.slice(0,-1)),i=b?parseFloat(parseInt(l,10)/d):l?parseFloat(l,10):1;var m={url:k[0],resolution:i};f.push(m)}return f},e.dodgeSrcset=function(a){a.srcset&&(a[e.ns].srcset=a.srcset,a.removeAttribute("srcset"))},e.processSourceSet=function(a){var b=a.getAttribute("srcset"),c=a.getAttribute("sizes"),d=[];return"IMG"===a.nodeName.toUpperCase()&&a[e.ns]&&a[e.ns].srcset&&(b=a[e.ns].srcset),b&&(d=e.getCandidatesFromSourceSet(b,c)),d},e.applyBestCandidate=function(a,b){var c,d,f;a.sort(e.ascendingSort),d=a.length,f=a[d-1];for(var g=0;d>g;g++)if(c=a[g],c.resolution>=e.getDpr()){f=c;break}e.endsWith(b.src,f.url)||(b.src=f.url,b.currentSrc=b.src)},e.ascendingSort=function(a,b){return a.resolution-b.resolution},e.removeVideoShim=function(a){var b=a.getElementsByTagName("video");if(b.length){for(var c=b[0],d=c.getElementsByTagName("source");d.length;)a.insertBefore(d[0],c);c.parentNode.removeChild(c)}},e.getAllElements=function(){for(var a=b.getElementsByTagName("picture"),c=[],d=b.getElementsByTagName("img"),f=0,g=a.length+d.length;g>f;f++)if(f<a.length)c[f]=a[f];else{var h=d[f-a.length];"PICTURE"!==h.parentNode.nodeName.toUpperCase()&&(e.srcsetSupported&&h.getAttribute("sizes")||null!==h.getAttribute("srcset"))&&c.push(h)}return c},e.getMatch=function(a){for(var b,c=a.childNodes,d=0,f=c.length;f>d;d++){var g=c[d];if(1===g.nodeType){if("IMG"===g.nodeName.toUpperCase())return b;if("SOURCE"===g.nodeName.toUpperCase()){var h=g.getAttribute("media");if(g.getAttribute("srcset")&&(!h||e.matchesMedia(h))){var i=e.verifyTypeSupport(g);if(i===!0){b=g;break}if("pending"===i)return!1}}}}return b},d(),c._=e,"object"==typeof module&&"object"==typeof module.exports?module.exports=c:"object"==typeof define&&define.amd?define(function(){return c}):"object"==typeof a&&(a.picturefill=c)}}(this,this.document);

