/*var name  = prompt  ('Type the name');
var age  = prompt  ('Type your age');

if(name == "Veronika Fasterova" ){
alert('You can continue... for your examination of your vagina & asshole');
}else if(age < 18){

alert('You cant  enter to see the doctor');
}
*/

/*
var count = 0;
document.write("Starating Loop" + " </br>");
while (count < 10)
{
document.write("Current count :" + count +"</br>");
count++;
}
document.write("Loop Stopped");
*/
/*
var m_names = ["January", "February", "March", 
"April", "May", "June", "July", "August", "September", 
"October", "November", "December"];

var d_names = ["Sunday","Monday", "Tuesday", "Wednesday", 
"Thursday", "Friday", "Saturday"];

var myDate = new Date();
myDate.setDate(myDate.getDate()+7);
var curr_date = myDate.getDate();
var curr_month = myDate.getMonth();
var curr_day  = myDate.getDay();
document.write(d_names[curr_day] + "," + m_names[curr_month] + " " +curr_date);
*/
/*
var myDate=new Date();
myDate.setDate(myDate.getDate()+7);
var n=myDate.toLocaleDateString();
document.write(n);
https://www3.ntu.edu.sg/home/ehchua/programming/webprogramming/JavaScript_Introduction.html
*/

/*
for ( var row = 1; row <= 10; ++row ) 
{
document.writeln( "<br />" );

for ( var column = 1; column <= row; ++column ) 
{ 

document.write( "* " );

}
}
*/

/*
for ( var row = 1; row <= 10; ++row )
{
document.writeln( "<br />" );

for ( var column = 1; column <= row; ++column )
{

document.write( "* " );

}
}



document.writeln("<br>(b)");

for ( var row = 1; row <= 10; ++row )
{
document.writeln( "<br />" );

for ( var column = 1; column <= 11; ++column )
{

if ( column > row )
{

document.write( "* " );
}
}
}

document.writeln("<br>(c)");
for ( var row = 1; row <= 10; ++row )
{
document.writeln( "<br />" );
for ( var column = 11-row; column < 10; ++column )
{
document.write( "&nbsp;&nbsp;&nbsp;" );
}
for ( var column = 1; column <= 11-row; ++column )
{
document.write( "* " );
}
}
"</br>"
document.writeln("<br>(d)");

for ( var row = 1; row <= 10; ++row )
{
document.writeln( "<br />" );
for ( var column = 1; column < 11-row; ++column )
{
document.write( "&nbsp;&nbsp;&nbsp;" );
}
for ( var column = 11-row; column <= 10; ++column )
{
document.write( "* " );
}
}



*/

/*
for (var a =1; a<=9; a++)
        for (var b =1; b<=9; b++)
	        for (var c =1; c<=9; c++)
		         for (var d =1; d<=9; d++)
					 
				 if(a +b  == c+d){
					 
					 console.log('{0}{1}{2}{3}', a, b, c, d);
					 
				 }
*/
/*
				 var  i1, i2, i3, i4, i5, i6;
				 for(i1 = 1; i1 <= 44; i1++)
					  for(i2 = i1+1; i2 <= 45; i2++)
						   for(i3 = i2+1; i3 <= 46; i3++)
							    for(i4 = i3+1; i4 <= 47; i4++)
									 for(i5 = i4+1; i5 <= 48; i5++)
										  for(i6 = i5+1; i6 <= 49; i6++)
											  
									document.write('{0}{1}{2}{3}{4}{5}', i1, i2, i3, i4, i5, i6);
					 
				 
*/
/*
var a= [1,2,3,4,5];
console.log(a[0]); //1
console.log(a[4]); // 5
a ["Angel"] = 123;
console.log("index");
for(var index in a){
	
	console.log(index +  " => " + a[index]);
}

*/
/*
var a = {123: 223, 2: 23, x: 123};

a.firstname = "peter";
a.lastname = "zikaro";
console.log("Indexes:");

var indexes = [ ];
for(var  index in a){
	
	 indexes.push (index);
}

indexes.sort();

for (var i =0; i < indexes.length; i++){
	
console.log(index[i] + " => " + a[indexes[i]]);
}
*/
/*
var student = {
	
	name: "Angel",
	gardes: [2,3,4,5],
	uni: {
		
		name: "SU", 
		budget: 0,
	}
}


function displayProperties(obj, level){
for (var  index in obj){
	
	console.log(new Array(level *4). join (" ")
	+ index + " =>" + obj [index]);
	displayProperties(obj [index], level + 1);
      }
  }
displayProperties(student, 0);
*/

  /*	
	var array = [1,2,3,4,5,6,7,8,9,10];
	
	for(var i = array.length-1; i>=0; i--){
		
		console.log(array[i]);
	}
  */
  
  /*
  var array = new Array(20);
  for (var index = 0; index < array.length; index++){
	  array[index] = index;
	  console.log(array);
  }
  
  //dvata scripta sazdavat piramida ot 0 do 20
    
  var array = new Array(20);
  for (var index in array){
	  console.log(index);
  }
  */
  /*
    var array = [1,2,3,4,5,6,7];
  for (var index in array){
	  console.log(index);
  }*/
  /*
var capitals = ["London", "Washington", "Paris", "Sofia", "Praga","Berlin","Toronto"];
for (var i in  capitals){
	console.log(capitals[i]);
}
*/
/*
var array = [1,2,3,4,5,435,5,7787,64,1,0];

array.sort();

console.log("Lenght" + array.lenght);
console.log(array);
//push,pop,reverse,slice,join,concat,shift,unshift, filter, foreach --------------------------
*/

/*
var array = [1,230,33,4,5,435,5,7787,64,1,0];
//anonimna funcia ako e nad promenlivata togava stava globalna i tq ne dobra za tozi primer
array.sort(function orderBy(a, b) {
			return (a == b) ? 0 : (a > b) ? 1 : -1;	 
			return a - b;
		});

console.log("Lenght" + array.lenght);
console.log(array);

*/
/*
var array = [{name: "Ivo", grades:5,
                      name: "Veronika", grades: 6,
					  name:"Sofia", grades: 3}];
					  array.sort(function (a, b) {
					  return a.grades - b.grades
					  
					  });

console.log("Lenght" + array.lenght);
console.log(array);

*/
//push,pop,reverse,slice,join,concat,shift,unshift, filter, foreach
/*
var array = [1,230,33,4,5,-435,-5,7787,64,1,0];
array.slice(1,100);
console.log(array.join ("."));
*/
/*
var array = [1,230,33,4,5,-435,-5,7787,64,1,0];
var array2 = [1,3,5,900];
array = array.concat(array2);
console.log(array.join ("."));
*/
/*
var array = [1,2,3,4,5,6,7,8,9,60];
array = array.filter  = function (element){
	return element % 3 == 0;
};
console.log(array.join ("|"));
*/
/*
var array = [1,2,3,4,5,6,7,8,9,60];
var sum = 0;
array.forEach (function (element){
	sum += element;
});
console.log(sum);
*/
/*

function a(){
	
for(var i = 0; i<=10000; i++){
	console.log(a);
	 a + "a";
     }
}
console.time("a");
a();
console.timeEnd("a")
*/
/*
function titanic(){
	var count = 2200;
	for(var i = 0 ; i < 2200; i++){
		
		var  dead = 1500;
	
	}
	console.log(dead);
}
titanic();
*/
/*
function lime(a, b,  c){
	 a = a || 5,
	 b = b || 30,
	 c = c || 77;
	
	console.log(a);
	console.log(b);
	console.log(c);
   };

     lime(5);
	 */
	 
		/*
		var daysArray = new Array(
"Monday","Tuesday","Wednesday","Thursday","Friday","Saturaday","Sunday"
);

console.log(daysArray);*/

/*
console.log("The coin has landed on: =>");

var fitRandomNumber = Math.random();

if (fitRandomNumber < 0.5)
{
	
	console.log("Heads");
}else
{
	
	console.log("Tails");
}*/

/* obiknovena funkciq s primitivni funkcii
function loki (a, b){
	a += 10//uvelichava
	b += 70;
console.log(a + " " + b);
}
 
var  a = 5,
        b = 100;
		
		loki(a,b);
		console.log(a + " " + b); 
		
		*/
		
		//funkciq s deklarirane na obekt rabotene varho tozi obekt bez zadelqne na nova paamet za nov obekt.
		/*
	function loki (obj){
	obj. a += 10//uvelichava
	obj. b += 70;
console.log(obj. a + " " +obj. b); 
}
 
var   obj  =  {
        a : 5,
        b :  100
		
		};
		
		loki(obj);
		console.log(obj. a + " " + obj. b); 
		
		*/ 
		
		
		/* obeki JSON
		var leftEye = 0;
		var rightEye = 1;
		
		var person = {
			eyes: [leftEye, rightEye],
			male:  false,
			age: 25,
			address: {
				city: 'London',
				country: 'UnitedKingdom' 
				
			},
			firstname: 'Doncho',
			lastname: 'Minkov',
			toString: function (a, b) {
				return this.firstname + " " + this.lastname;
			}
		}
		
		//person.address.city;
		//person.firstname;
		//json.parse("{a: 5}");
		person.toString(a, b);
		
		
		
		
		newRow.find('input').each(function () {
    var $inputElem = $(this);
    $inputElem.attr('id', 'newId'); //change this to something more dynamic
    $inputElem.attr('name', 'newName'); //change this to something more dynamic
}
		*/

		//http://www.paulund.co.uk/creating-different-css3-box-shadows-effects
		
	//	http://mrbool.com/functions-with-arrays-programming-in-html5-exam-70-480-training-course-part-10/32348
	
var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
    close[i].onclick = function(){
        var div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function(){ div.style.display = "none"; }, 600);
    }
}


function customers() {
   // var table = document.getElementById("customers");
// Dobavq redove ot gore na tablicata koeto v sluchaq ne e odachno ////
   /* var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(1);
    cell1.innerHTML = "NEW CELL1";
    cell2.innerHTML = "NEW CELL2";
	cell3.innerHTML = "NEW CELL2";
*/
var mytable=document.getElementById("customers")

			

for (var i=0; i<1; i++){ //add 1 new rows with content to the end of a table
var newrow=mytable.insertRow(-1); //add new row to end of table
var newcell0=newrow.insertCell(0); //insert new cell to row
var newcell1=newrow.insertCell(0);//insert new cell to row
var newcell2=newrow.insertCell(1) ;//insert new cell to row
var newcell3=newrow.insertCell(3) ;//insert new cell to row
var newcell4=newrow.insertCell(4) ;//insert new cell to row
var newcell5=newrow.insertCell(5) ;//insert new cell to row


newcell0.innerHTML="United States of America  ";
newcell1.innerHTML="Microsoft ";
newcell2.innerHTML="Scarlet";
newcell3.innerHTML="$125.99 ";
newcell4.innerHTML="<img src=\"./images/user.png\" style=\"width:70px; height:70px;\"/>";
newcell5.innerHTML= "<input type=\"button\" name=\"chkbox\" class=\"btn btn-danger\" id=\"check\" value=\"Delete Person\" onclick=\"deleteRow(this)\" >";


    var newrow = mytable.getElementsByTagName("tr");   

    for(i = 0; i < newrow.length; i++){           

  //manipulate rows 

      if(i % 2 == 0){ 

        newrow[i].className = "switch1 "; 

      }else{ 

        newrow[i].className = "switch2"; 

               }       

            } 
			
       }
  
}



function customersDelete() {
var c = confirm('Are you sure to delete tthe Entire Table of People?');
var table = document.getElementById("customers");
//or use :  var table = document.all.tableid;
for(var i = table.rows.length - 1; i > 0; i--)
{

    table.deleteRow(i);
}
    //document.getElementById("customers").deleteRow(-1);
	
}



function deleteRow(r) { 
	  
    var c = confirm('You are about to delete this Person?');
    var i = r.parentNode.parentNode.rowIndex;
	
    document.getElementById("customers").deleteRow(i);

}

<!--

function custom() {
var table=document.getElementById("customers")

			

for (var i=0; i<5; i++){	//add 1 new rows with content to the end of a table
	   
	   

var newrow=table.insertRow(-1); //add new row to end of table
var newcell0=newrow.insertCell(0); //insert new cell to row
var newcell1=newrow.insertCell(0);//insert new cell to row
var newcell2=newrow.insertCell(1) ;//insert new cell to row
var newcell3=newrow.insertCell(3) ;//insert new cell to row
var newcell4=newrow.insertCell(4) ;//insert new cell to row
var newcell5=newrow.insertCell(5) ;//insert new cell to row



	
   newcell0.innerHTML="United States of America ";
   newcell1.innerHTML="Microsoft ";
   newcell2.innerHTML="Jane";
   newcell3.innerHTML="$125.99 ";
   newcell4.innerHTML="<img src=\"./images/user.png\" style=\"width:70px; height:70px;\"/>";
   newcell5.innerHTML= "<button type=\"button\" name=\"chkbox\" class=\"btn btn-danger\" id=\"check\" value=\"Delete Person\" onclick=\"deleteRow(this)\" >Delete Person</button>";

}
 var newrow = table.getElementsByTagName("tr");   

    for(i = 0; i < newrow.length; i++){           

  //manipulate rows 

      if(i % 2 == 0){ 

        newrow[i].className = "switch1 "; 

      }else{ 

        newrow[i].className = "switch2"; 

               }       

            } 
			
}
   
       
  













		