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

