var link = document.getElementById("hide-seek");
var text = document.getElementById("paragraph");


 function hide(event){
	console.log("fired");
	var parClasses = text.classList;
 
  // var textClass = textClass.List;
   
   if(parClasses.contains('hide')){
   
   parClasses.remove('hide');
   
    }   else
			{
	   
	   parClasses.add('hide');
	   
	}
	event.preventDefault();
    
}

link.addEventListener(
    "click",
	hide
);