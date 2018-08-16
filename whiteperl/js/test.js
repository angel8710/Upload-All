function person(){
	
	var table=document.getElementById('people');
	
	for(var i = 0; i<5; i++){
		var newrow=table.insertRow(-1);
		var newcell0=newrow.insertCell(0)
		var newcell1=newrow.insertCell(0);
		var newcell2=newrow.insertCell(1);
		var newcell3=newrow.insertCell(3);
		

		
		newcell0.innerHTML="$ 0.55 per/min";
			newcell1.innerHTML="444";
				newcell2.innerHTML="<input type=\"text\" class=\"form\">";
					newcell3.innerHTML="<input type=\"button\" value=\"Delete Person\" onclick=\"deleteRow(this)\"/>";
		
		
		
		
		
	}
	
	
	
}




function deleteRow(r){
	
	var c= confirm('Are you sure you want to delete this person?');
	var i = r.parentNode.parentNode.rowIndex;
	document.getElementById('people').deleteRow(i);
	
	
}