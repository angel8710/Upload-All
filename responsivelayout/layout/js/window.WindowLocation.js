function CWindowLocation(LocationString){
	var sCurrentLocation;
	
	if(typeof(LocationString) == "undefined")
		sCurrentLocation = window.location.toString();
	else
		sCurrentLocation = LocationString;

	this.GetVariable = function(sVariableName){
		var reVariableValue = new RegExp(sVariableName + "=([^&]*)&");
		var arMatches = sCurrentLocation.toString().match(reVariableValue);
		if(arMatches != null && typeof(arMatches[1]) != "undefined")
			return arMatches[1];
		else
			return null;
	}
	
	this.SetVariable = function(sVariableName, sVariableValue){
		var sCurrentVariableValue = this.GetVariable(sVariableName);
		if(sVariableName.length > 0){
			if(sCurrentVariableValue != null){
				if(sVariableValue)
					sCurrentLocation = sCurrentLocation.replace(sVariableName + "=" + sCurrentVariableValue, sVariableName + "=" + sVariableValue);
				else
					sCurrentLocation = sCurrentLocation.replace(sVariableName + "=" + sCurrentVariableValue, "");
			}else{
				if(sVariableValue)
					sCurrentLocation += "&" + sVariableName + "=" + sVariableValue + "&";
			}
		}
	}
	
	this.GetLocation = function(){
		return sCurrentLocation;
	}
	
	this.Reload = function(){
		var arCurrentLocation = sCurrentLocation.split("?");
		arCurrentLocation = arCurrentLocation[0] + "?";
		while(sCurrentLocation.match("&&"))
			sCurrentLocation = sCurrentLocation.replace("&&", "&");
		if(typeof(arCurrentLocation[1]) != "undefined")
			sCurrentLocation += UrlEncode(arCurrentLocation[1]);
		var Link = document.body.appendChild(document.createElement("a"));
		Link.href = sCurrentLocation;
		Link.target = self.name;
		Link.click();
		//self.location = sCurrentLocation;
	}

}