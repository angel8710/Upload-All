//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CEvent(oArguments){
	var sBrowserName = GetBrowserName();
	var oEvent;
	var sBrowser;
	if(typeof(event) != 'undefined'){
		oEvent = event;
	}else{
		oEvent = oArguments[oArguments.length-1];
		window.event = oEvent;
	}
	this.arElements = new Array();
	for (var sElement in oEvent) {
		sElementName = sElement;
		try{
			sElementValue =  oEvent[sElement];
			this[sElementName] = sElementValue;
		}catch(e){
			// It's a function
			//sElementValue = '';
			//sElementName += "()";
		}
	}

	this.GetSourceElement = function(){
		if(sBrowserName == "IE")
			return oEvent.srcElement;
		if(sBrowserName == "Mozilla")
			return oEvent.target;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function RegisterEventHandler(oObject, sEventName, sCode){
	var sBrowserName = GetBrowserName();
	if(sBrowserName == "IE"){
		if(oObject.uniqueID == document.body.uniqueID) oObject = window;
		oObject.attachEvent(sEventName, Function(sCode));
	}else if(sBrowserName == "Mozilla"){
		oObject.setAttribute(sEventName, oObject.getAttribute(sEventName) + "; "+ sCode);
	}else if(sBrowserName == "Opera"){
		oObject.attachEvent(sEventName, Function(sCode));
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AttachEvent(oObject, sEvent, oEventHandler){
	var sBrowserName = GetBrowserName();
	if(sBrowserName == "IE")
		oObject.attachEvent(sEvent, oEventHandler);
	if(sBrowserName == "Mozilla")
		oObject[sEvent] = oEventHandler;
}