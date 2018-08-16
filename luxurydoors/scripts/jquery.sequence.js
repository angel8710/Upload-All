/*
Sequence.js (http://www.sequencejs.com)
Version: 1.0
Author: Ian Lunn @IanLunn
Author URL: http://www.ianlunn.co.uk/
Github: https://github.com/IanLunn/Sequence

This is a FREE script and is available under a MIT License:
http://www.opensource.org/licenses/mit-license.php

Sequence.js and its dependencies are (c) Ian Lunn Design 2012 - 2013 unless otherwise stated.

Sequence also relies on the following open source scripts:

- jQuery imagesLoaded 2.1.0 (http://github.com/desandro/imagesloaded)
	Paul Irish et al
	Available under a MIT License: http://www.opensource.org/licenses/mit-license.php

- jQuery TouchWipe 1.1.1 (http://www.netcu.de/jquery-touchwipe-iphone-ipad-library)
	Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
	Available under a MIT License: http://www.opensource.org/licenses/mit-license.php

- Modernizr 2.6.1 Custom Build (http://modernizr.com/)
	Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
	Available under the BSD and MIT licenses: www.modernizr.com/license/
	*/

;(function($) {
	var windowLoaded = false;
	$(window).bind("load", function() {
		windowLoaded = true;
	});

	function Sequence(element, options, defaults, get) {
		var self = this;
		self.container = $(element); //the Sequence containing element
		self.canvas = self.container.children('.sequence-canvas'); //the Sequence canvas which holds Sequence's frames (<li> elements)
		self.frames = self.canvas.children('li'); //the Sequence frames (top level <li> elements within the Sequence canvas)

		try { //is Modernizr.prefixed installed?
			Modernizr.prefixed;
			if(Modernizr.prefixed === undefined){
				throw "undefined";
			}
		}
		catch(err) { //if not...get the custom build necessary for Sequence
			get.modernizr();
		}

		var prefixes = { //convert JS transition names to CSS names
			'WebkitTransition' : '-webkit-',
			'MozTransition'    : '-moz-',
			'OTransition'      : '-o-',
			'msTransition'     : '-ms-',
			'transition'       : ''
		},
		transitions = { //convert JS transition names to JS transition end and animation end event names (also apply a classname of .sequence to the event)
			'WebkitTransition' : 'webkitTransitionEnd.sequence webkitAnimationEnd.sequence',
			'MozTransition'    : 'transitionend.sequence animationend.sequence',
			'OTransition'      : 'otransitionend.sequence oanimationend.sequence',
			'msTransition'     : 'MSTransitionEnd.sequence MSAnimationEnd.sequence',
			'transition'       : 'transitionend.sequence animationend.sequence'
		};

		self.prefix = prefixes[Modernizr.prefixed('transition')], //work out the CSS prefix for the browser being used (-webkit- for example)
		self.transitionProperties = {},
		self.transitionEnd = transitions[Modernizr.prefixed('transition')], //work out the JS transitionEnd name for the browser being used (webkitTransitionEnd webkitAnimationEnd for example)
		self.numberOfFrames = self.frames.length, //number of frames (<li>) Sequence consists of

		self.transitionsSupported = (self.prefix !== undefined) ? true : false, //determine if transitions are supported
		self.hasTouch = ("ontouchstart" in window) ? true : false, //determine if this is a touch enabled device
		self.isPaused = false, //whether Sequence is paused
		self.isBeingHoveredOver = false, //whether the Sequence canvas is currently being hovered over

		self.container.removeClass('sequence-destroyed'); //if Sequence is destroyed using .destroy(), it is given a clas of "destroy", remove that now if present

		//CALLBACKS
		self.paused = function() {},												//executes when Sequence is paused
		self.unpaused = function() {},											//executes when Sequence is unpaused

		self.beforeNextFrameAnimatesIn = function() {},			//executes before the next frame animates in
		self.afterNextFrameAnimatesIn = function() {},			//executes after the next frame animates in
		self.beforeCurrentFrameAnimatesOut = function() {},	//executes before the current frame animates out
		self.afterCurrentFrameAnimatesOut = function() {},	//executes after the current frame animates out

		self.afterLoaded = function() {};										//executes after Sequence is initiated
		self.destroyed = function() {};											//executes when Sequence is destroyed via the destory() function

		//INIT
		self.settings = $.extend({}, defaults, options); //combine default options with developer defined ones
		self.settings.preloader = renderUiElements(self, self.settings.preloader, '.sequence-preloader'); //set up the preloader and save it
		self.isStartingFrame = (self.settings.animateStartingFrameIn) ? true : false; //determine if the first frame should animate in
		self.settings.unpauseDelay = (self.settings.unpauseDelay === null) ? self.settings.autoPlayDelay : self.settings.unpauseDelay; //if the unpauseDelay is not specified, make it the same as the autoPlayDelay speed
		self.getHashTagFrom = (self.settings.hashDataAttribute) ? "data-sequence-hashtag": "id"; //get the hashtag from the ID or data attribute?
		self.frameHashID = []; //array that matches frames with has IDs
		self.direction = self.settings.autoPlayDirection;

		if(self.settings.hideFramesUntilPreloaded && self.settings.preloader !== undefined  && self.settings.preloader !== false) { //if using a preloader and hiding frames until preloading has completed...
			self.frames.hide(); //hide Sequence's frames
		}

		if(self.prefix === "-o-") { //if Opera prefixes are required...
			self.transitionsSupported = get.operaTest(); //run a test to see if Opera correctly supports transitions (Opera 11 has bugs relating to transitions)
		}

		self.frames.removeClass("animate-in"); //remove any instance of "animate-in", which should be used incase JS is disabled

		//functionality to run once Sequence has preloaded
		function oncePreloaded() {
			self.afterLoaded(); //callback
			if(self.settings.hideFramesUntilPreloaded && self.settings.preloader !== undefined  && self.settings.preloader !== false) {
				self.frames.show();
			}
			if(self.settings.preloader !== undefined  && self.settings.preloader !== false){
				if(self.settings.hidePreloaderUsingCSS && self.transitionsSupported) {
					self.prependPreloadingCompleteTo = (self.settings.prependPreloadingComplete === true) ? self.settings.preloader : $(self.settings.prependPreloadingComplete);
					self.prependPreloadingCompleteTo.addClass("preloading-complete");
					setTimeout(init, self.settings.hidePreloaderDelay);
				}else{
					self.settings.preloader.fadeOut(self.settings.hidePreloaderDelay, function() {
						clearInterval(self.defaultPreloader);
						init();
					});
				}
			}else{
				init();
			}
		}

		var preloadTheseFramesLength = self.settings.preloadTheseFrames.length; //how many frames to preload?
		var preloadTheseImagesLength = self.settings.preloadTheseImages.length; //how many single images to load?

		function saveImagesToArray(length, srcOnly) {
			var imagesToPreload = []; //saves the images that are to be preloaded
			if(!srcOnly){
				for(var i = length; i > 0; i--){ //for each frame to be preloaded...
					self.frames.eq(self.settings.preloadTheseFrames[i-1]-1).find("img").each(function() { //find <img>'s in specific frames, and for each found...
						imagesToPreload.push($(this)[0]); //add it to the array of images to be preloaded
					});
				}
			}else{
				for(var j = length; j > 0; j--) { //for each frame to be preloaded...
					imagesToPreload.push($("body").find('img[src="'+self.settings.preloadTheseImages[j-1]+'"]')); //find any <img> with the given source and add it to the array of images to be preloaded
				}
			}
			return imagesToPreload;
		}

		//jQuery imagesLoaded plugin v2.1.0 (http://github.com/desandro/imagesloaded)
		function imagesLoaded(imagesToPreload, callback) {
			var BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
			var $this = imagesToPreload,
			deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
			hasNotify = $.isFunction(deferred.notify),
			$images = $this.find('img').add( $this.filter('img') ),
			loaded = [],
			proper = [],
			broken = [];

			//Register deferred callbacks
			if($.isPlainObject(callback)) {
				$.each(callback, function(key, value) {
					if(key === 'callback') {
						callback = value;
					}else if(deferred) {
						deferred[key](value);
					}
				});
			}

			function doneLoading() {
				var $proper = $(proper),
				$broken = $(broken);

				if(deferred) {
					if(broken.length) {
						deferred.reject($images, $proper, $broken);
					}else{
						deferred.resolve($images);
					}
				}

				if($.isFunction(callback)) {
					callback.call($this, $images, $proper, $broken);
				}
			}

			function imgLoaded( img, isBroken ) {
				if(img.src === BLANK || $.inArray(img, loaded) !== -1) { // don't proceed if BLANK image, or image is already loaded
					return;
			}

				loaded.push(img); // store element in loaded images array

				if(isBroken) { // keep track of broken and properly loaded images
					broken.push(img);
				}else{
					proper.push(img);
				}

				$.data(img, 'imagesLoaded', {isBroken: isBroken, src: img.src }); // cache image and its state for future calls

				if(hasNotify) { // trigger deferred progress method if present
					deferred.notifyWith($(img), [isBroken, $images, $(proper), $(broken)]);
				}

				if($images.length === loaded.length) { // call doneLoading and clean listeners if all images are loaded
					setTimeout(doneLoading);
					$images.unbind('.imagesLoaded');
				}
			}

			if(!$images.length) { // if no images, trigger immediately
				doneLoading();
			}else{
				$images.bind('load.imagesLoaded error.imagesLoaded', function(event) {
					imgLoaded(event.target, event.type === 'error'); // trigger imgLoaded
				}).each(function(i, el) {
					var src = el.src;
					var cached = $.data(el, 'imagesLoaded'); // find out if this image has been already checked for status if it was, and src has not changed, call imgLoaded on it
					if(cached && cached.src === src) {
						imgLoaded(el, cached.isBroken);
						return;
					}

					if(el.complete && el.naturalWidth !== undefined) { // if complete is true and browser supports natural sizes, try to check for image status manually
						imgLoaded(el, el.naturalWidth === 0 || el.naturalHeight === 0);
						return;
					}

					// cached images don't fire load sometimes, so we reset src, but only when dealing with IE, or image is complete (loaded) and failed manual check webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
					if(el.readyState || el.complete) {
						el.src = BLANK;
						el.src = src;
					}
				});
			}
		}

		if(self.settings.preloader !== undefined && self.settings.preloader !== false && (preloadTheseFramesLength !== 0 || preloadTheseImagesLength !== 0)) { //if using the preloader and the dev has specified some images should preload...
			var frameImagesToPreload = saveImagesToArray(preloadTheseFramesLength); //get images from particular Sequence frames to be preloaded
			var individualImagesToPreload = saveImagesToArray(preloadTheseImagesLength, true); //get images with specific source values to be preloaded
			var imagesToPreload = $(frameImagesToPreload.concat(individualImagesToPreload)); //combine frame images and individual images

			imagesLoaded(imagesToPreload, oncePreloaded);
		}else{ //if not using the preloader...
			if(windowLoaded === true) { //if the window has already loaded...
				oncePreloaded(); //run the init functionality when the preloader has finished
				$(this).unbind("load.sequence"); //unbind the load event as it's no longer needed
			}else{ //if the window hasn't already loaded...
				$(window).bind("load.sequence", function() { //when the window loads...	
					oncePreloaded(); //run the init functionality when the preloader has finished
					$(this).unbind("load.sequence"); //unbind the load event as it's no longer needed
				});
			}
		}

		function init() {
			$(self.settings.preloader).remove(); //remove the preloader element

			self.nextButton = renderUiElements(self, self.settings.nextButton, ".sequence-next"); //set up the next button
			self.prevButton = renderUiElements(self, self.settings.prevButton, ".sequence-prev"); //set up the previous button
			self.pauseButton = renderUiElements(self, self.settings.pauseButton, ".sequence-pause"); //set up the pause button
			self.pagination = renderUiElements(self, self.settings.pagination, ".sequence-pagination"); //set up the pagination

			if((self.nextButton !== undefined && self.nextButton !== false) && self.settings.showNextButtonOnInit === true){self.nextButton.show();} //if using a next button, show it
			if((self.prevButton !== undefined && self.prevButton !== false) && self.settings.showPrevButtonOnInit === true){self.prevButton.show();} //if using a previous button, show it
			if((self.pauseButton !== undefined && self.pauseButton !== false) && self.settings.showPauseButtonOnInit === true){self.pauseButton.show();} //if using a pause button, show it

			if(self.settings.pauseIcon !== false) {
				self.pauseIcon = renderUiElements(self, self.settings.pauseIcon, ".sequence-pause-icon");
				if(self.pauseIcon !== undefined) {
					self.pauseIcon.hide();
				}
			}else{
				self.pauseIcon = undefined;
			}

			if(self.pagination !== undefined && self.pagination !== false) {
				self.paginationLinks = self.pagination.children(); //get each pagination link

				self.paginationLinks.on('click.sequence', function() { //when a pagination link is clicked...
					var associatedFrameNumber = $(this).index() + 1; //get the number of the frame this link is associated with
					self.goTo(associatedFrameNumber); //go to the associate frame
				});

				if(self.settings.showPaginationOnInit === true) {
					self.pagination.show();
				}
			}

			self.nextFrameID = self.settings.startingFrameID;

			if(self.settings.hashTags === true) { //if using hashtags...
				self.frames.each(function() { //for each frame...
					self.frameHashID.push($(this).prop(self.getHashTagFrom)); //add the hashtag to an array
				});

				self.currentHashTag = location.hash.replace("#", ""); //get the current hashtag
				if(self.currentHashTag === undefined || self.currentHashTag === "") { //if there is no hashtag...
					self.nextFrameID = self.settings.startingFrameID; //use the startingFrameID
				}else{
					self.frameHashIndex = $.inArray(self.currentHashTag, self.frameHashID); //get the index of the frame that matches the hashtag
					if(self.frameHashIndex !== -1){  //if the hashtag matches a Sequence frame ID...
						self.nextFrameID = self.frameHashIndex + 1; //use the frame associated to the hashtag
					}else{
						self.nextFrameID = self.settings.startingFrameID; //use the startingFrameID
					}
				}
			}

			self.nextFrame = self.frames.eq(self.nextFrameID-1); //get the next frame
			self.nextFrameChildren = self.nextFrame.children(); //get the elements within the next frame to be animated

			if(self.pagination !== undefined) { //if using pagination, make the starting frame the current one in pagination
				$(self.paginationLinks[self.settings.startingFrameID-1]).addClass('current'); //add the 'current' class to the current frame
			}

			if(self.transitionsSupported) { //initiate the full featured Sequence if transitions are supported...
				if(!self.settings.animateStartingFrameIn) { //start first frame in animated in position
					self.currentFrameID = self.nextFrameID;

					if(self.settings.moveActiveFrameToTop) {
						self.nextFrame.css('z-index', self.numberOfFrames);
					}

					resetElements(self.prefix, self.nextFrameChildren, "0s");
					self.nextFrame.addClass("animate-in");
					if(self.settings.hashTags && self.settings.hashChangesOnFirstFrame) {
						self.currentHashTag = self.nextFrame.prop(self.getHashTagFrom);
						document.location.hash = "#"+self.currentHashTag;
					}

					setTimeout(function() {
						resetElements(self.prefix, self.nextFrameChildren, "");
					}, 100);

					resetAutoPlay(self, true, self.settings.autoPlayDelay);
				}else if(self.settings.reverseAnimationsWhenNavigatingBackwards && self.settings.autoPlayDirection -1 && self.settings.animateStartingFrameIn) { //animate in backwards
					resetElements(self.prefix, self.nextFrameChildren, "0s");
					self.nextFrame.addClass("animate-out");
					self.goTo(self.nextFrameID, -1, true);
				}else{ //animate in forwards
					self.goTo(self.nextFrameID, 1, true);
				}
			}else{ //initiate a basic slider for browsers that don't support CSS3 transitions
				self.container.addClass("sequence-fallback");
				self.currentFrameID = self.nextFrameID;
				if(self.settings.hashTags && self.settings.hashChangesOnFirstFrame){
					self.currentHashTag = self.nextFrame.prop(self.getHashTagFrom);
					document.location.hash = "#"+self.currentHashTag;
				}

				self.frames.addClass("animate-in"); //move each frame into its animate-in position
				self.frames.not(':eq('+(self.nextFrameID-1)+')').css({"display": "none", "opacity": 0}); //set all frames (except the next one) to display: none, opacity: 0
				resetAutoPlay(self, true, self.settings.autoPlayDelay);
			}
			//END INIT
			//EVENTS
			if(self.nextButton !== undefined) { //if a next button is defined...
				self.nextButton.bind('click.sequence', function() { //when the next button is clicked...
					self.next(); //go to the next frame
				});
			}

			if(self.prevButton !== undefined) { //if a previous button is defined...
				self.prevButton.bind('click.sequence', function() { //when the previous button is clicked...
					self.prev(); //go to the previous frame
				});
			}

			if(self.pauseButton !== undefined) { //if a pause button is defined...
				self.pauseButton.bind('click.sequence', function() { //when the pause button is clicked...
					self.pause(true); //pause Sequence and set hardPause to true
				});
			}

			function keyEvents(keyPressed, keyDirections) {
				var keyCode;
				var keyCodes;

				for(keyCodes in keyDirections) {
					if(keyCodes === "left" || keyCodes === "right") {
						keyCode = defaultKeys[keyCodes];
					}else{
						keyCode = keyCodes;
					}

					if(keyPressed === parseFloat(keyCode)) { //if the key pressed is associated with a function...
						initCustomKeyEvent(self, keyDirections[keyCodes]); //initiate the function
					}
				}
			}

			if(self.settings.keyNavigation) {
				var defaultKeys = {
					'left'	: 37,
					'right'	: 39
				};

				$(document).bind('keydown.sequence', function(e) { //when a key is pressed...
					var keyCodeChar = String.fromCharCode(e.keyCode);
					if((keyCodeChar > 0 && keyCodeChar <= self.numberOfFrames) && (self.settings.numericKeysGoToFrames)) {
						self.nextFrameID = keyCodeChar;
						self.goTo(self.nextFrameID); //go to specified frame
					}

					keyEvents(e.keyCode, self.settings.keyEvents); //run default keyevents
					keyEvents(e.keyCode, self.settings.customKeyEvents); //run custom keyevents
				});
			}

			if(self.settings.pauseOnHover && self.settings.autoPlay && !self.hasTouch) { //if using pauseOnHover and autoPlay on non touch devices
				self.canvas.on({
					'mouseenter.sequence': function() { //when the mouse enter the Sequence element...
						self.isBeingHoveredOver = true;
						if(!self.isHardPaused) { //if Sequence is hard paused (via a pause button)...
							self.pause(); //pause autoPlay
						}
					},
					'mouseleave.sequence': function() { //when the mouse leaves the Sequence element...
						self.isBeingHoveredOver = false;
						if(!self.isHardPaused) { //if Sequence is not hard paused (via a pause button)...
							self.unpause(); //unpause autoPlay
						}
					}
				});
			}

			if(self.settings.hashTags) { //if hashchange is enabled in the settings...
				$(window).bind('hashchange.sequence', function() { //when the hashtag changes...
					var newTag = location.hash.replace("#", ""); //grab the new hashtag

					if(self.currentHashTag !== newTag) { //if the last hashtag is not the same as the current one...
						self.currentHashTag = newTag; //save the new tag
						self.frameHashIndex = $.inArray(self.currentHashTag, self.frameHashID); //get the index of the frame that matches the hashtag
						if(self.frameHashIndex !== -1) { //if the hashtag matches a Sequence frame ID...
							self.nextFrameID = self.frameHashIndex + 1; //set that frame as the next one
								self.goTo(self.nextFrameID); //go to the next frame
							}
						}
					});
			}

			function cancelTouch() {
				self.canvas.on("touchmove.sequence", onTouchMove);
				startX = null;
				isMoving = false;
			}

			function onTouchMove(e) {
				if(self.settings.swipePreventsDefault) {
					e.preventDefault();
				}
				if(isMoving) {
					var x = e.originalEvent.touches[0].pageX;
					var y = e.originalEvent.touches[0].pageY;
					var dx = startX - x;
					var dy = startY - y;
					if(Math.abs(dx) >= self.settings.swipeThreshold) {
						cancelTouch();
						if(dx > 0) {
							initCustomKeyEvent(self, self.settings.swipeEvents.left);
						}else{
							initCustomKeyEvent(self, self.settings.swipeEvents.right);
						}
					}else if(Math.abs(dy) >= self.settings.swipeThreshold) {
						cancelTouch();
						if(dy > 0) {
							initCustomKeyEvent(self, self.settings.swipeEvents.down);
						}else{
							initCustomKeyEvent(self, self.settings.swipeEvents.up);
						}
					}
				}
			}

			function onTouchStart(e) {
				if(e.originalEvent.touches.length === 1) {
					startX = e.originalEvent.touches[0].pageX;
					startY = e.originalEvent.touches[0].pageY;
					isMoving = true;
					self.canvas.on("touchmove.sequence", onTouchMove);
				}
			}

			if(self.settings.swipeNavigation && self.hasTouch) { //if using swipeNavigation and the device has touch capabilities...
				//jQuery TouchWipe v1.1.1 (http://www.netcu.de/jquery-touchwipe-iphone-ipad-library)
				var startX;
				var startY;
				var isMoving = false;

				self.canvas.on("touchstart.sequence", onTouchStart);
			}
			//END EVENTS
		}
	} //END CONSTRUCTOR

	Sequence.prototype = {

		//PUBLIC METHODS
		/*
		start autoPlay -- causing Sequence to automatically change frame every x amount of milliseconds
		
		delay: a time in ms before starting the autoPlay feature (if unspecified, the default will be used)
		*/
		startAutoPlay: function(delay) {
			var self = this;
			delay = (delay === undefined) ? self.settings.autoPlayDelay : delay; //if a delay isn't specified, use the default
			self.unpause();

			resetAutoPlay(self); //stop autoPlay before starting it again
			self.autoPlayTimer = setTimeout(function() { //start a new autoPlay timer and...
				if(self.settings.autoPlayDirection === 1) { //go to either the next or previous frame
					self.next();
				}else{
					self.prev();
				}
			}, delay); //after a specified delay
		},

		//stop causing Sequence to automatically change frame every x amount of seconds
		stopAutoPlay: function() {
			var self = this;
			self.pause(true);
			clearTimeout(self.autoPlayTimer); //stop the autoPlay timer
		},

		/*
		Toggle startAutoPlay (unpausing autoPlay) and stopAutoPlay (pausing autoPlay)

		hardPause: if true, Sequence's pauseOnHover will not execute. Useful for pause buttons.

		Note: Sequence 0.7.3 and below didn't have an .unpause() function -- .pause() would pause/unpause
		based on the current state. .unpause() is now included for clarity but the .pause() function will
		still toggle between paused and unpaused states.
		*/
		pause: function(hardPause) {
			var self = this;
			if(!self.isSoftPaused) { //if pausing Sequence...
				if(self.pauseButton !== undefined) { //if a pause button is defined...
					self.pauseButton.addClass("paused"); //add the class of "paused" to the pause button
					if(self.pauseIcon !== undefined) { //if a pause icon is defined...
						self.pauseIcon.show(); //show the pause icon
					}
				}
				self.paused(); //callback when Sequence is paused
				self.isSoftPaused = true;
				self.isHardPaused = (hardPause) ? true : false; //if hardPausing, set hardPause to true
				self.isPaused = true;
				resetAutoPlay(self); //stop autoPlay
			}else{ //if unpausing Sequence...
				self.unpause();
			}
		},

		/*
		Start the autoPlay feature, as well as deal with any changes to pauseButtons, pauseIcons and public variables etc
		
		callback: if false, the unpause callback will not be initiated (this is because unpause is used internally during the stop and start of each frame)
		*/
		unpause: function(callback) {
			var self = this;
			if(self.pauseButton !== undefined) { //if a pause button is defined...
				self.pauseButton.removeClass("paused"); //remove the class of "paused" from the pause button
				if(self.pauseIcon !== undefined) { //if a pause icon is defined...
					self.pauseIcon.hide(); //hide the pause icon
				}
			}

			self.isSoftPaused = false;
			self.isHardPaused = false;
			self.isPaused = false;

			if(!self.active) {
				if(callback !== false) {
					self.unpaused(); //callback when Sequence is unpaused
				}
				resetAutoPlay(self, true, self.settings.unpauseDelay); //start autoPlay after a delay specified via the unpauseDelay setting
			}else{
				self.delayUnpause = true; //Sequence is animating so delay the unpause event until the animation completes
			}
		},

		//Go to the frame ahead of the current one
		next: function() {
			var self = this;
			self.nextFrameID = (self.currentFrameID !== self.numberOfFrames) ? self.currentFrameID + 1 : 1; //work out the next frame
			if(self.active === false || self.active === undefined) { //if Sequence isn't currently animating...
				self.goTo(self.nextFrameID, 1); //go to the next frame
			}else{ //if Sequence is currently animating...
				self.goTo(self.nextFrameID, 1, true); //go immediately to the next frame (ignoring the transition threshold)
			}
		},

		//Go to the frame prior to the current one
		prev: function() {
			var self = this;
			self.nextFrameID = (self.currentFrameID === 1) ? self.numberOfFrames : self.currentFrameID - 1; //work out the prev frame
			if(self.active === false || self.active === undefined) { //if Sequence isn't currently animating...
				self.goTo(self.nextFrameID, -1); //go to the prev frame
			}else{ //if Sequence is currently animating...
				self.goTo(self.nextFrameID, -1, true); //go immediately to the prev frame (ignoring the transition threshold)
			}
		},

		/*
		Go to a specific frame
		
		id: number of the frame to go to
		direction: direction to get to that frame (1 = forward, -1 = reverse)
		ignoreTransitionThreshold: if true, ignore the transitionThreshold setting and immediately go to the specified frame
		*/
		goTo: function(id, direction, ignoreTransitionThreshold) {
			var self = this;
			id = parseFloat(id); //convert the id to a number just in case
			var transitionThreshold = (ignoreTransitionThreshold === true) ? 0 : self.settings.transitionThreshold; //if transitionThreshold is to be ignored, set it to zero

			if((id === self.currentFrameID) //if the id of the frame the user is trying to go to is the same as the currently active one...
			|| (self.settings.navigationSkip && self.navigationSkipThresholdActive) //or navigationSkip is enabled and the navigationSkipThreshold is active (which prevents frame from being navigated too fast)...
			|| (!self.settings.navigationSkip && self.active) //or navigationSkip is disbaled but Sequence is animating...
			|| (!self.transitionsSupported && self.active) //or Sequence is in fallback mode and Sequence is animating...
			|| (!self.settings.cycle && direction === 1 && self.currentFrameID === self.numberOfFrames) //or cycling is disabled, the user is navigating forward and this is the last frame...
			|| (!self.settings.cycle && direction === -1 && self.currentFrameID === 1) //or cycling is disabled, the user is navigating backwards and this is the first frame...
			|| (self.settings.preventReverseSkipping && self.direction !== direction && self.active)) { //or Sequence is animating and the user is trying to change the direction of navigation...
				return false; //don't go to another frame
			}else if(self.settings.navigationSkip && self.active) { //if navigationSkip is enabled and Sequence is animating (a frame is being skipped before it has finished animating)...
				self.navigationSkipThresholdActive = true; //the navigationSkipThreshold is now active
				if(self.settings.fadeFrameWhenSkipped) { //if a frame should fade when skipped...
					self.nextFrame.stop().animate({"opacity": 0}, self.settings.fadeFrameTime); //fade
				}

				clearTimeout(self.transitionThresholdTimer);

				setTimeout(function() { //start the navigationSkipThreshold timer to prevent being able to navigate too quickly
					self.navigationSkipThresholdActive = false; //once the timer is complete, navigationSkip can occur again
				}, self.settings.navigationSkipThreshold);
			}

			if(!self.active || self.settings.navigationSkip) { //if there are no animations running or navigationSkip is enabled...
				self.active = true; //Sequence is now animating
				resetAutoPlay(self); //stop any autoPlay timer that may be running

				if(direction === undefined) { //if no direction to navigate was defined...
					self.direction = (id > self.currentFrameID) ? 1 : -1; //work out which way to go based on what frame is currently active
				}else{
					self.direction = direction; //go to the developer defined frame
				}

				self.currentFrame = self.canvas.children(".animate-in"); //find which frame is active -- the frame currently being viewed (and about to be animated out)
				self.nextFrame = self.frames.eq(id-1); //grab the next frame
				self.currentFrameChildren = self.currentFrame.children();	//save the child elements of the current frame
				self.nextFrameChildren = self.nextFrame.children(); //save the child elements of the next frame

				if(self.pagination !== undefined) { //if using pagination...
					self.paginationLinks.removeClass('current'); //remove the 'current' class from all pagination links
					$(self.paginationLinks[id-1]).addClass('current'); //add the 'current' class to the current frame
				}

				if(self.transitionsSupported) { //if the browser supports CSS3 transitions...
					if(self.currentFrame.length !== undefined) { //if there is a current frame (one that is in it's animate-in position)...
						self.beforeCurrentFrameAnimatesOut(); //callback
						if(self.settings.moveActiveFrameToTop) { //if the active frame should move to the top...
							self.currentFrame.css("z-index", 1); //move this frame to the bottom as it is now inactive
						}
						resetElements(self.prefix, self.nextFrameChildren, "0s"); //give the next frame elements a transition-duration and transition-delay of 0s so they don't transition to their reset position
						if(!self.settings.reverseAnimationsWhenNavigatingBackwards || self.direction === 1) { //if user hit next button...
							self.nextFrame.removeClass("animate-out"); //reset the next frame back to its starting position
							resetElements(self.prefix, self.currentFrameChildren, "");  //remove any inline styles from the elements to be animated so styles via the "animate-out" class can take full effect
						}else if(self.settings.reverseAnimationsWhenNavigatingBackwards && self.direction === -1) { //if the user hit prev button
							self.nextFrame.addClass("animate-out"); //reset the next frame back to its animate-out position
							reverseTransitionProperties(self); //reverse the transition-duration, transition-delay and transition-timing-function
						}
					}else{
						self.isStartingFrame = false; //no longer the first frame
					}

					self.active = true; //Sequence is now animating
					self.currentFrame.unbind(self.transitionEnd); //remove the animation end event
					self.nextFrame.unbind(self.transitionEnd); //remove the animation end event

					if(self.settings.fadeFrameWhenSkipped && self.settings.navigationSkip) { //if a frame may have faded out when it was previously skipped...
						self.nextFrame.css("opacity", 1); //show it again
					}

					self.beforeNextFrameAnimatesIn(); //callback
					if(self.settings.moveActiveFrameToTop) { //if an active frame should be moved to the top...
						self.nextFrame.css('z-index', self.numberOfFrames);
					}

					//modifications to the current and next frame's elements to get them ready to animate
					if(!self.settings.reverseAnimationsWhenNavigatingBackwards || self.direction === 1) { //if user hit next button...
						setTimeout(function() { //50ms timeout to give the browser a chance to modify the DOM sequentially
							resetElements(self.prefix, self.nextFrameChildren, ""); //remove any inline styles from the elements to be animated so styles via the "animate-in" class can take full effect
							waitForAnimationsToComplete(self, self.nextFrame, self.nextFrameChildren, "in"); //wait for the next frame to animate in
							if(self.afterCurrentFrameAnimatesOut !== "function () {}" || (self.settings.transitionThreshold === true && ignoreTransitionThreshold !== true)) { //if the afterCurrentFrameAnimatesOut is being used...
								waitForAnimationsToComplete(self, self.currentFrame, self.currentFrameChildren, "out", true, 1); //wait for the current frame to animate out as well
							}
						}, 50);

						//final class changes to make animations happen
						setTimeout(function() { //50ms timeout to give the browser a chance to modify the DOM sequentially
							if(self.settings.transitionThreshold === false || self.settings.transitionThreshold === 0 || ignoreTransitionThreshold === true) { //if not using a transitionThreshold...
								self.currentFrame.toggleClass("animate-out animate-in"); //remove the "animate-in" class and add the "animate-out" class to the current frame
								self.nextFrame.addClass("animate-in"); //add the "animate-in" class
							}else { //if using a transitionThreshold...
								self.currentFrame.toggleClass("animate-out animate-in"); //remove the "animate-in" class and add the "animate-out" class to the current frame
								if(self.settings.transitionThreshold !== true) { //if there's no transitionThreshold or the dev specified a transitionThreshold in milliseconds
									self.transitionThresholdTimer = setTimeout(function() { //cause the next frame to animate in after a certain period
										self.nextFrame.addClass("animate-in"); //add the "animate-in" class
									}, transitionThreshold);
								}
							}
						}, 50);
					}else if(self.settings.reverseAnimationsWhenNavigatingBackwards && self.direction === -1) { //if the user hit prev button
						setTimeout(function() { //50ms timeout to give the browser a chance to modify the DOM sequentially
							//remove any inline styles from the elements so styles via the "animate-in" and "animate-out" class can take full effect
							resetElements(self.prefix, self.currentFrameChildren, "");
							resetElements(self.prefix, self.nextFrameChildren, "");
							reverseTransitionProperties(self); //reverse the transition-duration, transition-delay and transition-timing-function

							waitForAnimationsToComplete(self, self.nextFrame, self.nextFrameChildren, "in"); //wait for the next frame to animate in
							if(self.afterCurrentFrameAnimatesOut !== "function () {}" || (self.settings.transitionThreshold === true && ignoreTransitionThreshold !== true)) { //if the afterCurrentFrameAnimatesOut is being used...
								waitForAnimationsToComplete(self, self.currentFrame, self.currentFrameChildren, "out", true, -1); //wait for the current frame to animate out as well
							}
						}, 50);

						//final class changes to make animations happen
						setTimeout(function() { //50ms timeout to give the browser a chance to modify the DOM sequentially
							if(self.settings.transitionThreshold === false || self.settings.transitionThreshold === 0 || ignoreTransitionThreshold === true) { //if not using a transitionThreshold...
								self.currentFrame.removeClass("animate-in"); //remove the "animate-in" class from the current frame
								self.nextFrame.toggleClass("animate-out animate-in"); //add the "animate-out" class and remove the "animate-in" class from the next frame
							}else{ //if using a transitionThreshold...
								self.currentFrame.removeClass("animate-in");
								if(self.settings.transitionThreshold !== true) { //if there's no transitionThreshold or the dev specified a transitionThreshold in milliseconds
									self.transitionThresholdTimer = setTimeout(function() { //cause the next frame to animate in after a certain period
										self.nextFrame.toggleClass("animate-out animate-in"); //add the "animate-in" class and remove the "animate-out" class
									}, transitionThreshold);
								}
							}
						}, 50);
					}
				}else{ //if the browser doesn't support CSS3 transitions...
					function animationComplete() {
						setHashTag(self);
						self.active = false;
						resetAutoPlay(self, true, self.settings.autoPlayDelay);
					}

					switch(self.settings.fallback.theme) {
						case "fade": //if using the fade fallback theme...
							self.frames.css({"position": "relative"}); //this allows for fadein/out in IE
							self.beforeCurrentFrameAnimatesOut();
							self.currentFrame = self.frames.eq(self.currentFrameID-1);
							self.currentFrame.animate({"opacity": 0}, self.settings.fallback.speed, function() { //hide the current frame
								self.currentFrame.css({"display": "none", "z-index": "1"});
								self.afterCurrentFrameAnimatesOut();
								self.beforeNextFrameAnimatesIn();
								self.nextFrame.css({"display": "block", "z-index": self.numberOfFrames}).animate({"opacity": 1}, 500, function() {
									self.afterNextFrameAnimatesIn();
								}); //make the next frame the current one and show it
								animationComplete();
							});

							self.frames.css({"position": "relative"}); //this allows for fadein/out in IE
						break;

						case "slide": //if using the slide fallback theme...
						default:
							//create objects which will save the .css() and .animation() objects
							var animateOut = {};
							var animateIn = {};
							var moveIn = {};

							//construct the .css() and .animation() objects
							if(self.direction === 1) {
								animateOut.left = "-100%";
								animateIn.left = "100%";
							}else{
								animateOut.left = "100%";
								animateIn.left = "-100%";
							}

							moveIn.left = "0";
							moveIn.opacity = 1;

							self.currentFrame = self.frames.eq(self.currentFrameID-1);
							self.beforeCurrentFrameAnimatesOut();
							self.currentFrame.animate(animateOut, self.settings.fallback.speed, function() {
								self.currentFrame.css({"display": "none", "z-index": "1"});
								self.afterCurrentFrameAnimatesOut();
							}); //cause the current frame to animate out
							self.beforeNextFrameAnimatesIn(); //callback
							self.nextFrame.show().css(animateIn);
							self.nextFrame.css({"display": "block", "z-index": self.numberOfFrames}).animate(moveIn, self.settings.fallback.speed, function() { //cause the next frame to animate in
								animationComplete();
								self.afterNextFrameAnimatesIn(); //callback
							});
						break;
					}
				}
				self.currentFrameID = id; //make the currentFrameID the same as the one that is to animate in
			}
		},

		/* 
			removes Sequence from the element it's attached to

			callback: a callback to run once .destroy() has finished (or see the sequence.destroyed() callback)
		*/
		destroy: function(callback) {
			var self = this;

			self.container.addClass('sequence-destroyed'); //add a class of "destroyed" in case the developer wants to animate opacity etc

			//REMOVE EVENTS
			if(self.nextButton !== undefined) { //remove the next button click event if a next button is defined
				self.nextButton.unbind('click.sequence');
			}
			if(self.prevButton !== undefined) { //remove the previous button click event if a previous button is defined
				self.prevButton.unbind('click.sequence');
			}
			