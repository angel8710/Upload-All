/*
    #HTML/CSS/JS TEST SPECIFICATION AND REQUIREMENTS
    
    ##YOU MUST NOT USE!!!
    - scripts you didn't write yourself
    - JS libraries and frameworks
    - CSS "frameworks"
    
    ##Page overals
    - Liquid layout
    - max content wrapper width: 1280px, min widht: 800
    - content centered on the page
    - right column width: 30% of content wrapper
    - left column and right column padding 10px
    - page main title - embed font -> HelveticaInserat LT
    - Logo element should be fixed at all time at the left border of the page
    
    ##Dynamics
    - main navigation, drop down menu based on JS - don't use ready scripts
    - right column dynamic boxes:
        click to open, click to close
        two boxes must not be open in the same time 
    
    ##Cross-browser
    - 10+
    - FF
    - Chrome
    
    ##Language menu
    - hover makes flag opaque
    - selected flag is opaque
    
    ##Misc
    - font sizes and box sizes may be in %, px or em
    
    ##Your test does NOT qualifie for review if:
    - JSON content is not loaded with AJAX
    - We need to fiddle with your code to make it work
    - JS global scope is polluted
 

     ##Table Task:
     1. Your script must be able to handle number of columns dynamically (i.e. more or less columns, depending on the JSON sent)
     2. Do not use any ready scripts and libraries 
     3. Decide on the table HTML structure by yourself
     4. All your JS code MUST be into this file
     5. Bonus: Implement sorting on the column headers
     6. Get content with XMLHTTP request from here: http://cn.sbtech.com/sb-test/content.json
*/




function myFunc() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


