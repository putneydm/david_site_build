var pageFunctions = {
  intialize: function () {
  "use strict";
  console.log('works');

    // objects
    var siteNameplate = document.getElementById('main-header-nameplate'),
      navigation = document.getElementById('navigation-menu'),
      heroImage = document.getElementById('hero-image'),
      siteSubhead = document.getElementById('main-subhead'),
      scrollToTopButton = document.getElementById('scroll-to-top'),
      documentBody = document.body,
      menuButton = document.getElementById('menu-button'),
      topNav = document.getElementById('inside-header');
    //data
    var pageType = document.getElementsByTagName('Body')[0].getAttribute('data-pagetype');

    var heroImageName;
    if (heroImage) {
      var heroImageName = heroImage.getAttribute('data-image');
    }

    //measurements
    var windowWidth = window.innerWidth; // finds width of browser window
    var heroArtHeight;
    if (heroImage) {
      var heroArtHeight = heroImage.clientHeight * 0.70;
    }
    //js test
    this.initJsTest(documentBody);

    // init listeners
    this.initScrollButton(scrollToTopButton, documentBody);
    this.initMenuButton(topNav, menuButton);
    this.initFootnoteClick(topNav, menuButton);
    this.initScrollBackButton();

    this.initScrollListener(scrollToTopButton, heroImage, topNav, heroArtHeight);

    // onload actions
    this.nameplateAnimate(siteNameplate, navigation, heroImage, siteSubhead); // animates nameplate
    this.setBackground(heroImageName, pageType, windowWidth); // swaps out hero image on load.
    this.addLink();

    //scroll actions

  },
  initScrollListener: function (scrollToTopButton, heroImage, topNav, heroArtHeight) {
   var self=this;

   document.onscroll = function() {
    var scrollPosition = self.getScrollPosition(); // gets scroll position from function
    self.handleScrollButton(scrollPosition, scrollToTopButton);
    if (heroImage) {
      self.handleNav(scrollPosition, topNav, heroArtHeight);
      self.handleHeroArt(scrollPosition, heroImage, heroArtHeight);
    }
    self.handleSiteFooter(scrollPosition);
    self.handleScrollBackButton (scrollPosition);
    self.handleFootnoteButton (scrollPosition);
    return this;
  };

  },
  //   initializes stuff
  initJsTest: function (documentBody) {
    // checks for js and removes no-js tag from body
    document.getElementsByTagName('BODY')[0].classList.remove('no-js');
//    documentBody.className += ' no-js';
  },
  initScrollButton: function (scrollToTopButton){
    var self = this;
      scrollToTopButton.addEventListener("click", function(e){
      e.preventDefault();
      var scrollStart = self.getScrollPosition();
      self.scrollToGeneric(0, 500, scrollStart);
  });
  },
  initMenuButton: function (topNav, menuButton){
    var self = this;
    menuButton.addEventListener("click", function(e){
      e.preventDefault();
      self.expandMenu(topNav);
    });
  },
  initFootnoteClick: function () {
    // this adds listener to sup tags using event delegation
    var self = this;
    // Get the element, add a click listener
    var blogContainer =  document.getElementById("blog-container");

    if (blogContainer) {
      blogContainer.addEventListener("click", function(e) {
        var linkType = e.target.parentNode.tagName;  // checks if it is a sup tag
        // if it is, it gets an event handler added to it and prevent default
        if (linkType === 'SUP') {
          e.preventDefault();
          if(e.target && e.target.nodeName === "A") {
            var footNoteLink = document.getElementsByTagName('SUP');
            // tests if the clicked item is set to active state
            var activeState = self.hasClass(footNoteLink, 'footnote-link-active');
            if (activeState === true) {
              self.setInactiveState(false); // removes active state of other footnote links
            }
            var footnoteID =  e.target.getAttribute("href").slice(1); //gets id of footnote
            self.setActiveState (e.target.parentNode, footnoteID);
          }
        }
        else {
          // function normally
        }
      });
    }
  },
  initScrollBackButton: function () {
    var self = this;
    var footnoteReturnButton = document.getElementById("btn-footnote-return");
    if (footnoteReturnButton) {
    footnoteReturnButton.addEventListener("click", function(e) {
      e.preventDefault();
      self.setInactiveState(true);
      });
    }
  },
  // onload functions
  // animates nameplate on page load
  nameplateAnimate: function (siteNameplate, navigation, heroImage, siteSubhead) {
    if (siteNameplate)  {
      siteNameplate.classList.add('main-header-nameplate-active');
      navigation.classList.add('navigation-menu-active');
      siteSubhead.classList.add('triple-module-head-active');
    }
    if (heroImage)  {
      heroImage.classList.remove('filter-me');
    }
  },
  // sets bg image on hero image
  setBackground: function (heroImageName, pageType, windowWidth) {
   var self = this;
      var imageURL = self.setHeroURL(pageType, windowWidth) + heroImageName + '.jpg';
      var img = new Image();
      img.onload = function(){
      document.getElementById('hero-image').style.backgroundImage = 'url('+imageURL+')';
      };
      img.src = imageURL;
  },
  setHeroURL: function(pageType, windowWidth) {
   // tests page width and page type to set proper URL for image loader
    if (pageType === 'index-page' && windowWidth < 700) {
      return 'siteart/med_hero_';
      }
    if (pageType === 'index-page' && windowWidth > 700 && windowWidth < 5000) {
      return 'siteart/hero_';
      }
    if (pageType === 'section-page' && windowWidth < 700) {
      return '../siteart/med_hero_';
      }
    if (pageType === 'section-page' && windowWidth > 700 && windowWidth < 5000) {
       return '../siteart/hero_';
      }
    if (pageType === 'portfolio-page' && windowWidth < 700) {
      return '../../siteart/med_hero_';
      }
    if (pageType === 'portfolio-page' && windowWidth > 700 && windowWidth < 5000) {
      return '../../siteart/hero_';
      }
  },
  addLink: function() {
    var footerLinkCounter = 0;
    var objectData = ['email-link', 'twitter-link', 'facebook-link'];
    var links = ['<a href="mailto:david@davidputney.com?Subject=Website%20feedback" target="_top">', '<a href="https://twitter.com/putneydm">', '<a href="https://www.facebook.com/david.putney">'];

    while (footerLinkCounter < objectData.length) {
      var target = objectData[footerLinkCounter],
        addLink = links[footerLinkCounter],
        orgHtml = document.getElementById(target).innerHTML,
        newHtml = addLink + orgHtml + "</a>";
      document.getElementById(target).innerHTML = newHtml;
      footerLinkCounter++;
    }
  },
// sets interactive functions on page
  setActiveState: function (activeFootnoteLink, targetFootnote) {
    var self = this;
    var navHeight = document.getElementById('inside-header').offsetHeight,
      // find items
      activeFootnote  = document.getElementById(targetFootnote).parentNode,
      scrollBackButton = document.getElementById('btn-footnote-return'),
      // find locations
      linkLocation = self.getElemDistance( activeFootnoteLink ),
      targetFootnoteLocation = self.getElemDistance( activeFootnote ) - (navHeight + 150);

    // set active state of link
    self.addShit(activeFootnoteLink, 'footnote-link-active')
        .addShit(activeFootnote, 'list-item-active') // set active state of footnote
        .addShit(scrollBackButton, 'btn-footnote-return-active') // set active state of button
        .scrollToGeneric (targetFootnoteLocation, 200, linkLocation);  // scroll to location
  },
  setInactiveState: function (scrollBackOption) {
    var self = this;
    var activeFootnoteLink = document.getElementsByClassName('footnote-link-active')[0],
      activeFootnote = document.getElementsByClassName('list-item-active')[0],
      footNoteReturnButton = document.getElementById('btn-footnote-return');

      var scrollBackTo;
      var scrollBackFrom;
    if (activeFootnoteLink && activeFootnote && footNoteReturnButton) {
      var scrollBackTo = self.getElemDistance( activeFootnoteLink ) - 250;
      var scrollBackFrom = self.getElemDistance( activeFootnote );
    }
    // set links to inactive
    if (scrollBackOption === false) {
      self.handleInactiveState(activeFootnote, footNoteReturnButton, activeFootnoteLink);
    }
    if (scrollBackOption === true) {
      self.handleInactiveState(activeFootnote, footNoteReturnButton, activeFootnoteLink);
      self.scrollToGeneric (scrollBackTo, 200, scrollBackFrom);  // adds scrollback
    }
  },
  handleInactiveState: function(activeFootnote, footNoteReturnButton, activeFootnoteLink) {
    var self = this;
    var activeParagraph = activeFootnoteLink.parentNode;

    // remove active state of footnote
    self.removeShit(activeFootnote, 'list-item-active')
        .addShit(activeParagraph, 'footnote-paragraph-active')
        .removeShit(footNoteReturnButton, 'btn-footnote-return-active');

    // remove active state of button
//    self.removeShit(footNoteReturnButton, 'btn-footnote-return-active');

    // add active state to paragraph of text
  //  self.addShit(activeParagraph, 'footnote-paragraph-active');

    // remove active state of link and paragraph once active state is done
    setTimeout(function(){
      self.removeShit(activeFootnoteLink, 'footnote-link-active')
          .removeShit(activeParagraph, 'footnote-paragraph-active');
    }, 4000);

  },
  handleScrollBackButton: function (scrollPosition) {
      var self = this;
      var footnoteLinkSelected = document.getElementsByClassName('footnote-link-selected')[0],
        activeButton = document.getElementsByClassName('btn-footnote-return-active')[0],
        activeFootnote = document.getElementsByClassName('list-item-active')[0];

      if (footnoteLinkSelected && activeButton && activeFootnote) {
      var scrollBackTo = (self.getElemDistance( footnoteLinkSelected )) - 250,
        scrollBackNote = self.getElemDistance( activeFootnote );
      self.handleButton(scrollPosition,scrollBackTo,scrollBackNote);
      }
  },
  handleFootnoteButton: function (scrollPosition) {
    var self = this;
    var footnoteLinkSelected = document.getElementsByClassName('footnote-link-active')[0],
    		activeFootnote = document.getElementsByClassName('list-item-active')[0],
    		scrollBackTo,
    		scrollBackNote;

    if (footnoteLinkSelected && activeFootnote) {
      var scrollBackTo = (self.getElemDistance( footnoteLinkSelected )) - 250;
         scrollBackNote = self.getElemDistance( activeFootnote );
    }
    if (scrollPosition > scrollBackNote + 40) {
      this.setInactiveState(false);
    }
    if (scrollBackTo > scrollPosition) {
      this.setInactiveState(false);
    }
  },
  handleScrollButton: function (scrollPosition, scrollButton) {
    var self = this;
    var isButtonActive = scrollButton.classList.contains('scroll-to-top-active');
    if (scrollPosition > 300 && isButtonActive === false) {
      self.addShit(scrollButton, 'scroll-to-top-active');
    }
    if (scrollPosition < 300 && isButtonActive === true) {
      self.removeShit(scrollButton, 'scroll-to-top-active');
      self.addShit(scrollButton, 'scroll-to-top-inactive');
    }
  },
  handleNav: function (scrollPosition, topNav, heroArtHeight) {
    var self = this;
    var isNavReady = topNav.classList.contains('inside-header-ready'),
      isNavExtended = topNav.classList.contains('inside-header-extend'),
      isNavRetracted = topNav.classList.contains('inside-header-retract');

    if (scrollPosition > 80 && isNavReady === false) {
      self.addShit(topNav, 'inside-header-ready');
    }
    if (scrollPosition > heroArtHeight) {
      self.addShit(topNav, 'inside-header-extend');
    }
    if (scrollPosition < heroArtHeight && isNavExtended === true) {
      self.addShit(topNav, 'inside-header-retract');
    }
    if (scrollPosition < 80 && isNavRetracted === true) {
      self.removeShit(topNav, 'inside-header-retract');
      self.removeShit(topNav, 'inside-header-extend');
      self.removeShit(topNav, 'inside-header-ready');
    }
  },
  handleHeroArt: function (scrollPosition, heroArt, heroArtHeight) {
    var self = this;
    var isHeroArtActive = heroArt.classList.contains('hero-fadeout');

    if (scrollPosition > heroArtHeight - 20 && isHeroArtActive === false) {
      self.addShit(heroArt, 'hero-fadeout');
      }
    if (scrollPosition < heroArtHeight && isHeroArtActive === true) {
      self.removeShit(heroArt, 'hero-fadeout');
      }
  },
  handleSiteFooter: function(scrollPosition) {
    var self = this;
    var siteFooter = document.getElementById('site-footer'),
       isVisible = self.isElementVisible(siteFooter),
       isFooterActive = siteFooter.classList.contains('site-footer-active');

    if (scrollPosition > 300 && isFooterActive === false) {
      self.addShit(siteFooter, 'site-footer-inactive');
      }
    if (isVisible === true) {
      self.addShit(siteFooter, 'site-footer-active');
    }
  },
  // functions that return data or change elements
  getElemDistance: function ( elem ) {
    var location = 0;
    if (elem.offsetParent) {
      do {
        location += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }
    return location >= 0 ? location : 0;
  },
  addShit: function (object, style) {
    object.classList.add(style);
    return this;
  },
  removeShit: function (object, style) {
    object.classList.remove(style);
    return this;
  },
  scrollToGeneric: function(to, duration, start) {
    // slow scrolls to location send destination, duration of scroll and start point
    var self = this;
    var documentBody = document.body,
      html = document.getElementsByTagName('HTML')[0],
      scrollFunction = self.easeOutCubic,
      change = to - start,
      currentTime = 0,
      increment = 20;

  function animateScroll(){
      currentTime += increment;
      var val = scrollFunction(currentTime, change, duration, start);
      documentBody.scrollTop = val;
      html.scrollTop = val;
      if(currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    }
    animateScroll();
  },
  easeOutCubic: function (currentTime, change, duration, start) {
    currentTime /= duration;
    currentTime--;
    return change*(currentTime*currentTime*currentTime + 1) + start;
  },
  expandMenu: function(topNav) {
    topNav.classList.toggle("menu-active");
  },
  isElementVisible: function(el) {
    var rect   = el.getBoundingClientRect(),
      vWidth   = window.innerWidth || document.documentElement.clientWidth,
      vHeight  = window.innerHeight || document.documentElement.clientHeight,
      efp      = function (x, y) { return document.elementFromPoint(x, y); };
    // Return false if it's not in the viewport
    if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight) {
      return false;
      }

    // Return true if any of its four corners are visible
    return (
        el.contains(efp(rect.left,  rect.top)) ||  el.contains(efp(rect.right, rect.top)) ||  el.contains(efp(rect.right, rect.bottom)) ||  el.contains(efp(rect.left,  rect.bottom)) );
  },
  getElemDistance: function(elem) {
    var location = 0;
    if (elem.offsetParent) {
      do {
        location += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }
    return location >= 0 ? location : 0;
  },
  getScrollPosition: function () {
    var scrollPosition = window.scrollY;
    return scrollPosition;
  },
  hasClass: function (element, className) {
    // test if element has a class name or not
      var result = element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
        if (result === true) {
          return true;
        }
        else {
          return false;
        }
  }
};
(function() {
  pageFunctions.intialize();
})();
