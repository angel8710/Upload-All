$(document).ready(function() {
    $('.slider').flexslider({
        animation: 'slide',
        animationSpeed: 900,
        directionNav: false
    });

    $(".articleExpand").on('click', function() {
        if ($('.article_hidden').is(':visible')) {
            $('.article_hidden').slideUp();
        } else {
            $('.article_hidden').slideDown();
        }
    });
});