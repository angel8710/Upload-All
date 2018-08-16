$(function() {
  
  
  window.onresize = displayWindowSize;
window.onload = displayWindowSize;
function displayWindowSize() {
     var myWidth = 0, myHeight = 0;
    if( typeof( window.innerWidth ) == 'number' ) {
        myWidth = window.innerWidth; myHeight = window.innerHeight;
    } else if( document.documentElement && ( document.documentElement.clientWidth ||document.documentElement.clientHeight ) ) {
        myWidth = document.documentElement.clientWidth; myHeight = document.documentElement.clientHeight;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        myWidth = document.body.clientWidth; myHeight = document.body.clientHeight;
    }
    $('#size').html( myWidth );
};
  
});

function animationHover(element, animation){
    element = $(element);
    element.hover(
        function() {
            element.addClass('animated ' + animation);        
        },
        function(){
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);         
        });
}


function animationClick(element, animation){
    element = $(element);
    element.click(
        function() {
            element.addClass('animated ' + animation);        
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);         
  
        });
}


 
