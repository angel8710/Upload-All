
(function($) {
	$.fn.SimpleAccordion = function () {
		var accordion = $(this); // Cache element
		accordion.hide().fadeIn(); // Fade in on load
		accordion.find(".active").show(); // Open active panel
		accordion.find("dt").on("click", function () { // Listen to onClick
			var current = $(this).next("dd"); // Cache current
			if (current.is(":hidden")) { // Check if not active
				current.slideDown().siblings("dd").slideUp(); // Open curren panel
			}
		});
	};
})(jQuery);