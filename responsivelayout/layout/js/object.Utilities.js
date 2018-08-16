//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetCoordinates(oElement){
	var X, Y, oParent;
	X = oElement.offsetLeft;
	Y = oElement.offsetTop;
	oParent = oElement;
	while(oParent = oParent.offsetParent){
		if(oParent.style.position == 'absolute' || oParent.style.position == 'relative') break;
		X += oParent.offsetLeft;
		Y += oParent.offsetTop;
	}
	return new Array(X, Y);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Dump(oObject, bReturn){
	var sValue;
	var sResult = "<table border=0>";
	for (var i in oObject) {
		sResult += '<tr>';
		sResult += '<td width="10"></td>';
		sName = typeof(oObject) +"::"+ i;
		sObjectType = typeof(oObject[i]);
		sColor = "#800000";
		try{
			sValue = oObject[i];
		}catch(e){
			sValue = '';
			bIsFunction = true;
			sName += "()";
			sColor = "#800000; font-weight:bold";
		}
		if(typeof(oObject[i]) == 'function') sName += "()";
		sResult += '<td style="font-family:Tahoma; font-size:11px; color:#000080; padding-right:10px" align="right">'+ sObjectType +'</td>';
		sResult += '<td style="font-family:Tahoma; font-size:11px; color:'+ sColor +'; padding-right:20px"> '+ sName + '</td>';
		sResult += '<td style="font-family:Tahoma; font-size:11px; color:#000080"> '+ sValue + '</td>';
		sResult += '</tr>';
		try{
			if(i == 'attributes' || i == 'childNodes'){
				for(j = 0; j < sValue.length; j++){
					sPrefix = (j == (sValue.length - 1)) ? '<div style="font-family:Terminal;display:inline; font-size:15px">À-</div>' : '<div style="font-family:Terminal;display:inline; font-size:15px">Ã-</div>';
					sResult += '<tr>';
					sResult += '<td width="10"></td>';
					sResult += '<td style="font-family:Tahoma; font-size:11px; color:#000080; padding-right:10px" align="right"></td>';
					sResult += '<td style="font-family:Tahoma; font-size:11px; color:#000000; padding-left:10px; font-weight:normal" valign="top">'+ sPrefix +' '+ typeof(sValue.item(j)) +'.item('+ j +')</td>';
					sResult += '<td style="font-family:Tahoma; font-size:11px; color:#000080"> '+sValue.item(j) + '</td>';
					sResult += '</tr>';
				}
			}
		}catch(e){
			sResult += e;
		}
	}
	sResult += "</table>";
	if(bReturn) return sResult;
	
	if(!document.getElementById('DebugDiv')){
		oDiv = document.createElement('DIV');
		oDiv.id = 'DebugDiv';
		oDiv.style.cssText = "font-family: Tahoma; font-size: 11px; color: #000080; padding-bottom:30px";
		document.body.appendChild(oDiv);
	}
	oDiv.innerHTML += "&lt;DEBUG INFO :: "+ oObject +"&gt;<br>";
	oDiv.innerHTML += sResult;
	oDiv.innerHTML += "&lt;/DEBUG INFO :: "+ oObject +"&gt;<br>";
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetObjectVisibility(sObject, sVisibility){	
	var oObject = document.getElementById(sObject);
	if(oObject != null){
		oObject.style.visibility = sVisibility;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CheckObject(oObject){
	if(oObject != null && typeof(oObject) != "undefined"){
		return true;
	}else{
		return false;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ExtendObject(ExtensionObject, Object){
	for (var sVariableName in Object) {
		if(typeof(Object[sVariableName]) == 'string')
			eval("ExtensionObject."+ sVariableName +" = '"+ Object[sVariableName] +"';");
		else
			eval("ExtensionObject."+ sVariableName +" = "+ Object[sVariableName] +";");
	}
}

